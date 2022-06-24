<template>
	<section class="the-favorites">
		<div class="the-favorites__main">
			<h2 class="the-favorites__title">Избранное</h2>

			<div class="the-favorites__sort-panel">
				<div class="the-favorites__sort-panel-header">
					<button
						class="the-favorites__sort-panel-btn"
						type="button"
						@click="
							if (isSortPanelVisible === false)
								isSortPanelVisible = true;
						"
					>
						<img
							src="img/icon/cabinet/sort.svg"
							alt=""
							class="the-favorites__sort-panel-btn-icon"
						/>
						<p class="the-favorites__sort-panel-btn-description">
							Сортировать
						</p>
					</button>

					<button
						class="the-favorites__sort-panel-btn"
						v-if="isSortPanelVisible === true"
						@click="isSortPanelVisible = false"
					>
						<p class="the-favorites__sort-panel-btn-description">
							Свернуть параметры
						</p>
						<img
							src="img/icon/cabinet/arrow-double.svg"
							alt=""
							class="the-favorites__sort-panel-btn-icon"
						/>
					</button>
				</div>

				<div
					class="the-favorites__sort-panel-body"
					v-show="isSortPanelVisible === true"
				>
					<div class="the-favorites__sort-panel-col">
						<p class="the-favorites__sort-panel-description">
							Поиск по источнику
						</p>
						<r-dropdown
							v-model="show_by_source"
							selected_item="Выберите источник"
						></r-dropdown>
					</div>

					<div class="the-favorites__sort-panel-col">
						<p class="the-favorites__sort-panel-description">
							Поиск по дате
						</p>
						<r-date-range-picker></r-date-range-picker>
					</div>

					<div class="the-favorites__sort-panel-col">
						<p class="the-favorites__sort-panel-description">
							Поиск по типу контента
						</p>
						<r-dropdown
							v-model="show_by_content"
							selected_item="Выберите тип контента"
						></r-dropdown>
					</div>

					<r-button color="bordered" text="Применить"></r-button>
				</div>
			</div>

			<transition mode="out-in">
				<r-loader v-if="!isFavoritesLoaded"></r-loader>
			</transition>

			<transition mode="out-in">
				<div
					class="the-favorites__list"
					v-if="isFavoritesLoaded && favorites.length > 0"
				>
					<favorite-card
						v-for="favorite in favorites"
						:key="favorite.id"
						:parsource="favorite"
					></favorite-card>
				</div>
			</transition>

			<transition mode="out-in">
				<p class="the-favorites__empty" v-if="favorites.length === 0">
					Список избранного пуст
				</p>
			</transition>

			<!-- <div class="the-favorites__bottom">
				<r-button color="bordered" text="Показать ещё"></r-button>
				<r-pagination></r-pagination>
			</div> -->
		</div>

		<right-panel
			icon="img/icon/cabinet/tick-bordered.svg"
			title="Выбрано"
			class="the-favorites__right-panel"
		>
			<template v-slot>
				<p class="the-favorites__right-panel-counter-wrapper">
					<span class="the-favorites__right-panel-counter">{{
						total_selected
					}}</span>
					материала
				</p>
				<r-spoiler title="Выложить в соц.сети" arrowType="gray">
					<template v-slot>
						<div class="the-favorites__right-panel__checkboxes">
							<r-checkbox description="telegram"></r-checkbox>
							<r-checkbox description="vk"></r-checkbox>
							<r-checkbox description="twitter"></r-checkbox>
							<r-checkbox
								description="одноклассники"
							></r-checkbox>
						</div>
						<r-button text="Отправить"></r-button>
					</template>
				</r-spoiler>

				<r-spoiler title="Скачать" arrowType="gray">
					<template v-slot>
						<div class="the-favorites__right-panel__checkboxes">
							<r-checkbox description="Excel"></r-checkbox>
							<r-checkbox description="CSV"></r-checkbox>
							<r-checkbox
								description="Google Sheets"
							></r-checkbox>
						</div>
						<r-button text="Скачать"></r-button>
					</template>
				</r-spoiler>

				<r-spoiler title="Удалить" arrowType="gray">
					<template v-slot>
						<div class="the-favorites__right-panel__checkboxes">
							<r-checkbox
								description="Подтверждаете удаление"
							></r-checkbox>
						</div>
						<r-button text="Скачать"></r-button>
					</template>
				</r-spoiler>
			</template>
		</right-panel>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";

	import rButton from "@/components/r-button";
	import rDropdown from "@/components/Cabinet/r-dropdown";
	import rDateRangePicker from "@/components/Cabinet/r-date-range-picker";
	import FavoriteCard from "@/components/Cabinet/Favorites/FavoriteCard";
	// import rPagination from "@/components/r-pagination";
	import rLoader from "@/components/r-loader.vue";

	import RightPanel from "@/components/Cabinet/RightPanel";
	import rSpoiler from "@/components/r-spoiler";
	import rCheckbox from "@/components/r-checkbox";

	export default {
		name: "TheFavorites",
		components: {
			rDropdown,
			rDateRangePicker,
			FavoriteCard,
			// rPagination,
			rLoader,

			RightPanel,
			rSpoiler,
			rCheckbox,
			rButton,
		},
		watch: {
			favorites() {
				this.isFavoritesLoaded = true;
			},
		},
		computed: {
			...mapState({ favorites: (state) => state.favorites.favorites }),
		},
		data: () => ({
			isFavoritesLoaded: false,
			isSortPanelVisible: false,
			show_by_source: "",
			show_by_content: "",

			total_selected: 0,
		}),
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getFavoriteParsers"]),
		},
		created() {
			this.SET_TAB("favorites");
			this.getFavoriteParsers();
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-favorites {
		display: grid;
		grid-template-columns: 1fr max-content;
		padding: 0;
		gap: 3rem;

		&__main {
			position: relative;
			padding: 4rem 0 4rem 4rem;
			width: 100%;
			height: calc(100vh - 8rem);
			overflow-y: auto;
		}
		&__title {
			margin-bottom: 1.5rem;
			font-weight: 400;
		}

		&__sort-panel {
			margin-bottom: 4rem;
			&-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 0.6rem;
			}

			&-btn {
				display: flex;
				align-items: center;
				gap: 1rem;
				background-color: transparent;
				&:nth-child(2) {
					.the-favorites__sort-panel-btn {
						&-description {
							font-weight: 400;
						}
					}
				}
				&-icon {
				}
				&-description {
					font-size: 1.2rem;
					color: $primary;
					font-weight: 600;
				}
			}

			&-close {
			}

			&-body {
				display: grid;
				grid-template-columns: repeat(3, 1fr) 18rem;
				grid-gap: 3rem;
				align-items: flex-end;
				padding: 2rem;
				background-color: rgba(255, 255, 255, 0.5);
				.r-button {
					padding: 1rem 2.8rem;
					width: max-content;
					margin-left: auto;
				}
			}
			&-col {
			}
			&-description {
				margin-bottom: 0.5rem;
				font-size: 1.2rem;
				color: $black-50;
			}
		}

		&__list {
			// max-height: calc(100vh - 35rem);
			// overflow-y: auto;
			margin-bottom: 2rem;
		}
		&__bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 5rem;
		}

		&__right-panel {
			&-counter {
				font-size: 3.6rem;
				&-wrapper {
					margin-bottom: 2rem;
					margin-top: -2rem;
				}
			}
			&__checkboxes {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				margin-bottom: 2rem;
			}
			.r-button {
				width: 100%;
				font-size: 1.4rem;
				padding-top: 1.5rem;
				padding-bottom: 1.5rem;
			}
		}
	}
</style>
