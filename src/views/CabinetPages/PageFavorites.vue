<template>
	<section class="page-favorites">
		<div class="page-favorites__main">
			<h2 class="page-favorites__title">Избранное</h2>

			<div class="page-favorites__sort-panel">
				<div class="page-favorites__sort-panel-header">
					<button
						class="page-favorites__sort-panel-btn"
						type="button"
						@click="
							if (isSortPanelVisible === false)
								isSortPanelVisible = true;
						"
					>
						<img
							src="/img/icon/cabinet/sort.svg"
							alt=""
							class="page-favorites__sort-panel-btn-icon"
						/>
						<p class="page-favorites__sort-panel-btn-description">
							Сортировать
						</p>
					</button>

					<button
						class="page-favorites__sort-panel-btn"
						v-if="isSortPanelVisible === true"
						@click="isSortPanelVisible = false"
					>
						<p class="page-favorites__sort-panel-btn-description">
							Свернуть параметры
						</p>
						<img
							src="/img/icon/cabinet/arrow-double.svg"
							alt=""
							class="page-favorites__sort-panel-btn-icon"
						/>
					</button>
				</div>

				<div
					class="page-favorites__sort-panel-body"
					v-show="isSortPanelVisible === true"
				>
					<div class="page-favorites__sort-panel-col">
						<p class="page-favorites__sort-panel-description">
							Поиск по источнику
						</p>
						<r-dropdown
							v-model="show_by_source"
							showedValue="description"
							selected_item="Выберите источник"
						></r-dropdown>
					</div>

					<div class="page-favorites__sort-panel-col">
						<p class="page-favorites__sort-panel-description">
							Поиск по дате
						</p>
						<r-date-range-picker></r-date-range-picker>
					</div>

					<div class="page-favorites__sort-panel-col">
						<p class="page-favorites__sort-panel-description">
							Поиск по типу контента
						</p>
						<r-dropdown
							v-model="show_by_content"
							showedValue="description"
							selected_item="Выберите тип контента"
						></r-dropdown>
					</div>

					<r-button color="bordered" text="Применить"></r-button>
				</div>
			</div>

			<transition mode="out-in">
				<r-loader v-if="!isFavoritesLoaded" />
			</transition>

			<transition mode="out-in">
				<div
					class="page-favorites__list"
					v-if="isFavoritesLoaded && favorites.length > 0"
				>
					<favorite-card
						v-for="favorite in favorites"
						:key="favorite.id"
						:parsource="favorite"
						@update-selected-parsers="updateSelectedParsers"
					></favorite-card>
				</div>
			</transition>

			<transition mode="out-in">
				<p
					class="page-favorites__empty"
					v-if="favorites.length === 0 && isFavoritesLoaded"
				>
					Список избранного пуст
				</p>
			</transition>
		</div>

		<right-panel
			icon="/img/icon/cabinet/tick-bordered.svg"
			title="Выбрано"
			class="page-favorites__right-panel"
			:isMinimized="isMinimizedRightPanel"
			@open-right-panel="isMinimizedRightPanel = false"
			@close-right-panel="isMinimizedRightPanel = true"
		>
			<the-favorite-right-panel
				:totalSelected="totalSelected"
				:selectedParsers="selectedParsers"
			></the-favorite-right-panel>
		</right-panel>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";

	import rDateRangePicker from "@/components/Cabinet/r-date-range-picker";
	import FavoriteCard from "@/components/Cabinet/Favorites/FavoriteCard";
	import TheFavoriteRightPanel from "@/components/Cabinet/Favorites/TheFavoritesRightPanel.vue";

	import RightPanel from "@/components/Cabinet/RightPanel";

	export default {
		name: "PageFavorites",
		components: {
			rDateRangePicker,
			FavoriteCard,

			RightPanel,
			TheFavoriteRightPanel,
		},
		watch: {
			favorites() {
				this.isFavoritesLoaded = true;
			},
		},
		computed: {
			...mapState({ favorites: (state) => state.favorites.favorites }),
			selectedParsers() {
				return this.selectedParsources.reduce(
					(prev, selectedParsource) => {
						return [...prev, ...selectedParsource.selectedParsers];
					},
					[]
				);
			},
		},
		data: () => ({
			isMinimizedRightPanel: false,
			isFavoritesLoaded: false,
			isSortPanelVisible: false,
			show_by_source: "",
			show_by_content: "",
			selectedParsources: [],
			totalSelected: 0,
		}),
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getFavoriteParsers"]),
			minimizeRightPanel() {
				console.log("yes");
			},
			updateSelectedParsers(favoriteCardObj) {
				const { parsourceId, selectedParsers } = favoriteCardObj;

				const matchedIndex = this.selectedParsources.findIndex(
					(selectedParsource) => {
						return selectedParsource.parsourceId === parsourceId;
					}
				);

				if (matchedIndex !== -1) {
					this.selectedParsources[matchedIndex].selectedParsers =
						selectedParsers;
				} else {
					this.selectedParsources.push(favoriteCardObj);
				}
				if (!selectedParsers.length) {
					this.selectedParsources = this.selectedParsources.filter(
						(selectedParsource) => {
							return (
								selectedParsource.parsourceId !== parsourceId
							);
						}
					);
				}

				this.updateTotalSelectedParsers();
			},

			updateTotalSelectedParsers() {
				this.totalSelected = this.selectedParsources.reduce(
					(prev, selectedParsourcesItem) => {
						return (
							prev + selectedParsourcesItem.selectedParsers.length
						);
					},
					0
				);
			},
		},
		created() {
			this.SET_TAB("favorites");
			this.getFavoriteParsers();
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-favorites {
		display: grid;
		grid-template-columns: 1fr max-content;
		padding: 0;
		gap: 3rem;

		&__main {
			position: relative;
			padding: 6.4rem 0 4rem 4rem;
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
					.page-favorites__sort-panel-btn {
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
				color: rgba($black, $alpha: 0.5);
			}
		}

		&__list {
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
