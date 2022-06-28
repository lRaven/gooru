<template>
	<section class="the-appeal">
		<div class="the-appeal__main">
			<h2 class="the-appeal__title">Обращения</h2>

			<div class="the-appeal__header">
				<button
					type="button"
					class="the-appeal__back"
					@click="
						this.$router.push({
							name: 'appeals',
							query: { page: 1 },
						})
					"
				>
					<img
						src="img/icon/cabinet/arrow-long.svg"
						alt="back"
						class="the-appeal__back-icon"
					/>
				</button>

				<p class="the-appeal__id">#{{ appeal.id }}</p>
				<p class="the-appeal__source">{{ appeal_source }}</p>
				<p class="the-appeal__topic">{{ appeal_topic }}</p>
			</div>

			<the-messenger :ticket_id="appeal.id"></the-messenger>
		</div>

		<right-panel
			icon="img/icon/cabinet/appeals-add.svg"
			title="Новое обращение"
			class="the-appeal__right-panel"
		>
			<template v-slot>
				<form
					class="the-appeal__right-panel-form"
					@submit.prevent="
						add_ticket({
							name: user.first_name,
							phone_number: user.phone_number,
							email: user.email,
							message: message,
							topic_type: topic,
							parser: parser,
						})
					"
				>
					<div class="the-appeal__right-panel-row">
						<p class="the-appeal__right-panel-input-description">
							Выберите тему обращения
						</p>

						<r-dropdown
							selected_item="Тема обращения"
							:list="topics"
							v-model="topic"
						></r-dropdown>
					</div>

					<div class="the-appeal__right-panel-row">
						<p class="the-appeal__right-panel-input-description">
							Выберите парсер
						</p>

						<r-dropdown
							selected_item="Парсер"
							:list="all_parsers"
							v-model="parser"
						></r-dropdown>
					</div>

					<div class="the-appeal__right-panel-row">
						<p class="the-appeal__right-panel-input-description">
							Напишите текст обращения
						</p>

						<r-textarea
							v-model="message"
							:value="message"
							placeholder="Текстовое описание требований для поиска"
						></r-textarea>
					</div>

					<r-button text="Отправить"></r-button>
				</form>
			</template>
		</right-panel>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import { add_ticket } from "@/api/tickets";

	import RightPanel from "@/components/Cabinet/RightPanel.vue";
	import rDropdown from "@/components/Cabinet/r-dropdown.vue";
	import rTextarea from "@/components/Cabinet/r-textarea.vue";
	import rButton from "@/components/r-button.vue";
	import TheMessenger from "@/components/Cabinet/Messenger/TheMessenger.vue";

	export default {
		name: "TheAppeal",
		components: {
			RightPanel,
			rDropdown,
			rTextarea,
			rButton,
			TheMessenger,
		},
		watch: {
			appeal_id() {
				if (this.$route.path === this.path) {
					this.getAppeal(this.appeal_id);
				}
			},
		},
		computed: {
			...mapState({
				appeal: (state) => state.appeals.appeal,
				all_parsers: (state) => state.parsers.all_parsers,
				topics: (state) => state.appeals.topics,
				user: (state) => state.cabinet.user,
			}),

			appeal_id() {
				return +this.$route.query.appeal_id;
			},

			appeal_source() {
				let result = "";

				const find = this.all_parsers.find(
					(el) => el.id === this.appeal.id
				);
				if (find !== undefined) {
					result = find.title;
				}

				return result;
			},
			appeal_topic() {
				let result = "";

				const find = this.topics.find(
					(el) => el.id === this.appeal.topic_type
				);
				if (find !== undefined) {
					result = find.description;
				}

				return result;
			},
		},
		data() {
			return {
				path: this.$route.path,

				topic: "",
				parser: "",
				message: "",
			};
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getAllParsers", "getAppeal"]),
			add_ticket,
			page_changed(appeal_id) {
				this.$router.push({
					name: "appeal",
					query: { appeal_id: appeal_id },
				});
			},
		},
		created() {
			this.SET_TAB("appeals");
			this.getAllParsers();

			this.getAppeal(this.appeal_id);
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-appeal {
		display: grid;
		grid-template-columns: 1fr max-content;
		grid-gap: 2rem;
		padding: 0;

		&__title {
			font-weight: 400;
		}
		&__header {
			display: flex;
			gap: 1rem;
			align-items: center;
			font-weight: 500;
			p {
				font-size: 3.2rem;
			}
		}

		&__back {
			background-color: transparent;
			width: 3rem;
			margin-right: 2rem;
			&-icon {
			}
		}

		&__main {
			padding: 4rem 0 0 4rem;
			display: flex;
			gap: 4rem;
			flex-direction: column;
			overflow-y: auto;
			height: calc(100vh - 8rem);
		}

		&__right-panel {
			&-form {
				padding: 2rem 0;
				border-top: 0.05rem solid $black-50;
				display: flex;
				flex-direction: column;
				gap: 4rem;
			}

			&-input-description {
				font-size: 1.2rem;
				margin-bottom: 2rem;
			}
		}
	}
</style>
