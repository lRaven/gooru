<template>
	<section
		class="the-appeals"
		:class="user.role === 'DefaultUser' ? 'has-right-panel' : ''"
	>
		<div class="the-appeals__main">
			<div class="the-appeals__header">
				<h2 class="the-appeals__title">Обращения</h2>
				<r-input
					class="the-appeals__search-input"
					:value="searchValue"
					input_type="search"
					placeholder="Поиск по почте"
					v-if="user.role !== 'DefaultUser'"
				/>
			</div>

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
				<r-button
					:disabled="page >= count"
					color="bordered"
					text="Показать ещё"
					@click="page_changed(page + 1)"
				></r-button>

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
			v-if="user.role === 'DefaultUser'"
		>
			<template v-slot>
				<form
					class="the-appeals__right-panel-form"
					@submit.prevent="create_ticket"
				>
					<div class="the-appeals__right-panel-row">
						<p class="the-appeals__right-panel-input-description">
							Выберите тему обращения
						</p>

						<r-dropdown
							selected_item="Тема обращения"
							showedValue="description"
							:list="topics"
							v-model="new_appeal.topic"
						></r-dropdown>
					</div>

					<div class="the-appeals__right-panel-row">
						<p class="the-appeals__right-panel-input-description">
							Выберите парсер
						</p>

						<r-dropdown
							selected_item="Парсер"
							:list="all_parsers"
							v-model="new_appeal.parser"
						></r-dropdown>
					</div>

					<div class="the-appeals__right-panel-row">
						<p class="the-appeals__right-panel-input-description">
							Напишите текст обращения
						</p>

						<r-textarea
							v-model="new_appeal.message"
							:value="new_appeal.message"
							placeholder="Текстовое описание требований для поиска"
						></r-textarea>
					</div>

					<r-button
						text="Отправить"
						type="submit"
						:disabled="!isNewAppealValid"
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
	import rDropdown from "@/components/Cabinet/r-dropdown.vue";
	import rTextarea from "@/components/Cabinet/r-textarea.vue";
	import rButton from "@/components/r-button.vue";
	import rInput from "@/components/Auth/r-input.vue";
	import rPagination from "@/components/r-pagination.vue";
	import AppealsCard from "@/components/Cabinet/Appeals/AppealsCard.vue";
	import rLoader from "@/components/r-loader.vue";
	import { useToast } from "vue-toastification";

	export default {
		name: "TheAppeals",
		components: {
			RightPanel,
			rDropdown,
			rTextarea,
			rButton,
			rInput,
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
			new_appeal: {
				handler() {
					this.validateForm();
				},
				deep: true,
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

				new_appeal: {
					topic: "",
					parser: "",
					message: "",
				},
				isNewAppealValid: false,

				searchValue: "",

				appeals_in_page: 10,
			};
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getAllParsers", "getAppeals", "getAllMessages"]),

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
						this.getAppeals({
							page_number: this.page,
							page_size: this.appeals_in_page,
						});

						console.log("Ticket created");
						this.toast.success("Обращение создано");
					}
				} catch (err) {
					this.toast.error("Ошибка создания обращения");
					throw new Error(err);
				}
			},

			page_changed(page_number) {
				this.$router.push({
					name: "appeals",
					query: { page: page_number },
				});
			},

			validateForm() {
				this.new_appeal.topic !== "" &&
				this.new_appeal.message.length > 0
					? (this.isNewAppealValid = true)
					: (this.isNewAppealValid = false);
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
			this.getAppeals({
				page_number: this.page,
				page_size: this.appeals_in_page,
			});
			this.getAllMessages();

			this.getAllParsers();
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-appeals {
		padding: 0;
		&.has-right-panel {
			display: grid;
			grid-template-columns: 1fr max-content;
			grid-gap: 2rem;
			.the-appeals__main {
				padding: 4rem 0 4rem 4rem;
			}
		}

		&__title {
			font-weight: 400;
		}

		.r-input {
			max-width: 60rem;
			width: 100%;

			&__input {
				opacity: 0.5;
				&:focus {
					opacity: 1;
				}
			}
		}

		&__main {
			padding: 4rem;
			display: flex;
			gap: 4rem;
			flex-direction: column;
			overflow-y: auto;
			height: calc(100vh - 8rem);
			position: relative;
		}

		&__header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 4rem;
		}

		&__list {
			display: flex;
			flex-direction: column;
			background-color: $white;
			border-radius: 0.6rem;
			overflow: hidden;
			box-shadow: $shadow;
		}
		&__empty {
			width: 100%;
			text-align: center;
			grid-area: appealsList;
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

<style lang="scss">
	.the-appeals {
		.r-input {
			&__input {
				opacity: 0.5;
				&:focus {
					opacity: 1;
				}
			}
		}
	}
</style>
