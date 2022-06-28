<template>
	<section class="the-appeals">
		<div class="the-appeals__main">
			<h2 class="the-appeals__title">Обращения</h2>

			<transition mode="out-in">
				<r-loader v-if="!isAppealsLoaded"></r-loader>
			</transition>

			<transition mode="out-in">
				<div
					class="the-appeals__list shadow"
					v-if="isAppealsLoaded && appeals.length > 0"
				>
					<appeals-card
						v-for="appeal in appeals"
						:key="appeal.id"
						:appeal="appeal"
						:counter="1"
						:parsers="all_parsers"
						:topics="topics"
						:messages="all_messages"
					></appeals-card>
				</div>
			</transition>

			<transition mode="out-in">
				<p class="the-appeals__empty" v-if="appeals.length === 0">
					Обращений нет
				</p>
			</transition>

			<div class="the-appeals__bottom" v-if="number_of_pages > 1">
				<r-button text="Показать ещё" color="bordered"></r-button>

				<r-pagination
					:start_page="page"
					:count="count"
					:items_on_page="appeals_in_page"
					@page_changed="page_changed"
				></r-pagination>
			</div>
		</div>

		<right-panel
			icon="img/icon/cabinet/appeals-add.svg"
			title="Новое обращение"
			class="the-appeals__right-panel"
		>
			<template v-slot>
				<form
					class="the-appeals__right-panel-form"
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
					<div class="the-appeals__right-panel-row">
						<p class="the-appeals__right-panel-input-description">
							Выберите тему обращения
						</p>

						<r-dropdown
							selected_item="Тема обращения"
							:list="topics"
							v-model="topic"
						></r-dropdown>
					</div>

					<div class="the-appeals__right-panel-row">
						<p class="the-appeals__right-panel-input-description">
							Выберите парсер
						</p>

						<r-dropdown
							selected_item="Парсер"
							:list="all_parsers"
							v-model="parser"
						></r-dropdown>
					</div>

					<div class="the-appeals__right-panel-row">
						<p class="the-appeals__right-panel-input-description">
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
	import { multiaction_delete } from "@/api/multiaction_delete";

	import RightPanel from "@/components/Cabinet/RightPanel.vue";
	import rDropdown from "@/components/Cabinet/r-dropdown.vue";
	import rTextarea from "@/components/Cabinet/r-textarea.vue";
	import rButton from "@/components/r-button.vue";
	import rPagination from "@/components/r-pagination.vue";
	import AppealsCard from "@/components/Cabinet/Appeals/AppealsCard.vue";
	import rLoader from "@/components/r-loader.vue";

	export default {
		name: "TheAppeals",
		components: {
			RightPanel,
			rDropdown,
			rTextarea,
			rButton,
			rPagination,
			AppealsCard,
			rLoader,
		},
		watch: {
			page() {
				if (this.$route.path === this.path) {
					this.getAppeals({
						page_number: this.page,
						page_size: this.appeals_in_page,
					});
				}
			},
			appeals() {
				this.isAppealsLoaded = true;
			},
		},
		computed: {
			...mapState({
				all_parsers: (state) => state.parsers.all_parsers,
				topics: (state) => state.appeals.topics,
				user: (state) => state.cabinet.user,
				appeals: (state) => state.appeals.appeals,
				appeals_pagination: (state) => state.appeals.appeals_pagination,

				all_messages: (state) => state.messenger.all_messages,
			}),

			page() {
				return +this.$route.query.page;
			},

			count() {
				return this.appeals_pagination.count;
			},

			number_of_pages() {
				return Math.ceil(this.count / this.appeals_in_page);
			},
		},
		data() {
			return {
				isAppealsLoaded: false,
				path: this.$route.path,

				topic: "",
				parser: "",
				message: "",

				appeals_in_page: 10,
			};
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getAllParsers", "getAppeals", "getAllMessages"]),
			add_ticket,
			multiaction_delete,

			page_changed(page_number) {
				this.$router.push({
					name: "appeals",
					query: { page: page_number },
				});
			},
		},
		created() {
			this.SET_TAB("appeals");
			this.getAppeals({
				page_number: this.page,
				page_size: this.appeals_in_page,
			});
			this.getAllMessages();

			this.getAllParsers();
		},
		mounted() {
			// multiaction_delete({ model: "notify", ids: [90, 91, 93] });
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-appeals {
		display: grid;
		grid-template-columns: 1fr max-content;
		grid-gap: 2rem;
		padding: 0;

		&__title {
			font-weight: 400;
		}

		&__main {
			padding: 4rem 0 4rem 4rem;
			display: flex;
			gap: 4rem;
			flex-direction: column;
			overflow-y: auto;
			height: calc(100vh - 8rem);
			position: relative;
		}

		&__list {
			background-color: $white;
			border-radius: 0.6rem;
			overflow: hidden;
			margin-right: 1rem;
			box-shadow: $shadow;
		}

		&__bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 5rem;
			margin-top: auto;
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
