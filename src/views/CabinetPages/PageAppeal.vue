<template>
	<section
		class="page-appeal"
		:class="{ has_right_panel: user.role === 'DefaultUser' }"
	>
		<div class="page-appeal__main">
			<h2 class="page-appeal__title">Обращения</h2>

			<div class="page-appeal__header">
				<button
					type="button"
					class="page-appeal__back"
					@click="
						this.$router.push({
							name: 'appeals',
							query: { page: 1 },
						})
					"
				>
					<img
						src="/img/icon/cabinet/arrow-long.svg"
						alt="back"
						class="page-appeal__back-icon"
					/>
				</button>

				<p class="page-appeal__id">#{{ appeal.id }}</p>
				<p class="page-appeal__source">
					{{ appeal_source }}
				</p>
				<p class="page-appeal__topic">
					{{ appeal_topic }}
				</p>
				<p class="page-appeal__topic-message">
					{{ appeal.message }}
				</p>
			</div>

			<the-messenger :ticket_id="appeal.id"></the-messenger>
		</div>

		<right-panel
			icon="/img/icon/cabinet/appeals-add.svg"
			title="Новое обращение"
			class="page-appeal__right-panel"
			:isMinimized="isMinimizedRightPanel"
			@open-right-panel="isMinimizedRightPanel = false"
			@close-right-panel="isMinimizedRightPanel = true"
			v-if="user.role === 'DefaultUser'"
		>
			<template v-slot>
				<form
					class="page-appeal__right-panel-form"
					@submit.prevent="create_ticket"
				>
					<div class="page-appeal__right-panel-row">
						<p class="page-appeal__right-panel-input-description">
							Выберите тему обращения
						</p>

						<r-dropdown
							selected_item="Тема обращения"
							showedValue="description"
							:list="topics"
							v-model="new_appeal.topic"
						></r-dropdown>
					</div>

					<div class="page-appeal__right-panel-row">
						<p class="page-appeal__right-panel-input-description">
							Выберите парсер
						</p>

						<r-dropdown
							selected_item="Парсер"
							:list="all_parsers"
							v-model="new_appeal.parser"
						></r-dropdown>
					</div>

					<div class="page-appeal__right-panel-row">
						<p class="page-appeal__right-panel-input-description">
							Напишите текст обращения
						</p>

						<r-textarea
							v-model="new_appeal.message"
							:value="new_appeal.message"
							placeholder="Текстовое описание требований для поиска"
						></r-textarea>
					</div>

					<r-button
						type="submit"
						:disabled="isDisabledBtn"
						text="Отправить"
					></r-button>
				</form>
			</template>
		</right-panel>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import { add_ticket } from "@/api/tickets";

	import RightPanel from "@/components/Cabinet/RightPanel.vue";
	import TheMessenger from "@/components/Cabinet/Messenger/TheMessenger.vue";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageAppeal",
		components: {
			RightPanel,
			TheMessenger,
		},
		watch: {
			appeal_id() {
				if (this.$route.path === this.path) {
					this.getAppeal(this.appeal_id);
				}
			},
			new_appeal: {
				handler() {
					this.validateForm();
				},
				deep: true,
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
				isDisabledBtn: true,
				isMinimizedRightPanel: false,

				path: this.$route.path,

				new_appeal: {
					topic: "",
					parser: "",
					message: "",
				},
			};
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getAllParsers", "getAppeal"]),

			page_changed(appeal_id) {
				this.$router.push({
					name: "appeal",
					query: { appeal_id: appeal_id },
				});
			},

			async create_ticket() {
				try {
					const response = await add_ticket({
						name: this.user.first_name,
						phone_number: this.user.phone_number,
						email: this.user.email,
						message: this.new_appeal.message,
						topic_type: this.new_appeal.topic,
						parser: this.new_appeal.parser,
					});
					if (response.status === 201) {
						this.resetForm();

						console.log("Ticket created");
						this.toast.success("Обращение создано");
					}
				} catch (err) {
					this.toast.error("Ошибка создания обращения");
					throw new Error(err);
				}
			},

			validateForm() {
				if (
					this.new_appeal.topic !== "" &&
					this.new_appeal.message.length > 0
				) {
					this.isDisabledBtn = false;
				} else {
					this.isDisabledBtn = true;
				}
			},

			resetForm() {
				for (const key in this.new_appeal) {
					if (Object.hasOwnProperty.call(this.new_appeal, key)) {
						this.new_appeal[key] = "";
					}
				}
			},
		},
		created() {
			this.SET_TAB("appeals");
			this.getAllParsers();

			this.getAppeal(this.appeal_id);
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-appeal {
		padding: 0;

		&.has_right_panel {
			display: grid;
			grid-template-columns: 1fr max-content;
			grid-gap: 2rem;
			.page-appeal__main {
				padding: 4rem 0 0 4rem;
			}
		}

		&__title {
			font-weight: 400;
		}
		&__topic-message {
			width: 100%;
			text-align: center;
			transform: translate(0, 4rem);
			font-weight: 700;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			padding: 0 0 1.5rem 0;
		}
		&__header {
			display: flex;
			flex-wrap: wrap;
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
			padding: 4rem 4rem 0 4rem;
			display: flex;
			gap: 4rem;
			flex-direction: column;
			overflow-y: auto;
			height: calc(100vh - 8rem);
		}

		&__right-panel {
			&-form {
				padding: 2rem 0;
				border-top: 0.05rem solid rgba($black, $alpha: 0.5);
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
