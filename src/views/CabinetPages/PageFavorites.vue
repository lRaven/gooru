<template>
	<section class="page-favorites">
		<div class="page-favorites__main">
			<h2 class="page-favorites__title">Избранное</h2>

			<div class="page-favorites__sort-panel" ref="sortPanel">
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
					<template
						v-if="documentWidth <= 540 && !isSortPanelVisible"
					>
						<button
							class="page-favorites__favorite-panel-btn"
							@click="isMinimizedRightPanel = false"
						>
							<svg
								width="32"
								height="32"
								viewBox="0 0 32 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g opacity="0.5">
									<path
										d="M19.9681 28.8252H11.3921C9.05018 28.8235 6.80471 27.8924 5.14876 26.2364C3.49281 24.5805 2.56175 22.335 2.56006 19.9932V11.3916C2.56175 9.04969 3.49281 6.80424 5.14876 5.14828C6.80471 3.49233 9.05018 2.56127 11.3921 2.55957H22.3553C22.6603 2.56125 22.9523 2.68315 23.168 2.89883C23.3837 3.11451 23.5056 3.40655 23.5073 3.71156C23.5073 4.01709 23.3859 4.31009 23.1698 4.52613C22.9538 4.74217 22.6608 4.86355 22.3553 4.86355H11.3921C9.66176 4.86694 8.0033 5.55579 6.7798 6.7793C5.55629 8.0028 4.86744 9.66127 4.86406 11.3916V19.9932C4.86744 21.7235 5.55629 23.3819 6.7798 24.6054C8.0033 25.8289 9.66176 26.5178 11.3921 26.5212H19.9681C21.6984 26.5178 23.3568 25.8289 24.5803 24.6054C25.8038 23.3819 26.4927 21.7235 26.4961 19.9932V14.7516C26.4961 14.6006 26.5259 14.4511 26.5839 14.3117C26.6418 14.1723 26.7268 14.0457 26.8339 13.9392C26.9409 13.8328 27.068 13.7485 27.2077 13.6913C27.3474 13.6341 27.4971 13.6051 27.6481 13.606C27.9525 13.606 28.2445 13.7264 28.4604 13.9411C28.6762 14.1558 28.7984 14.4471 28.8001 14.7516V19.9932C28.7984 22.335 27.8673 24.5805 26.2114 26.2364C24.5554 27.8924 22.3099 28.8235 19.9681 28.8252Z"
										fill="#1D1D1B"
									/>
									<path
										d="M17.0623 21.1005C16.7572 21.0996 16.4649 20.9776 16.2495 20.7613L9.04314 13.5485C8.93517 13.4425 8.8494 13.316 8.79085 13.1765C8.73231 13.0369 8.70215 12.8871 8.70215 12.7357C8.70215 12.5844 8.73231 12.4346 8.79085 12.295C8.8494 12.1555 8.93517 12.029 9.04314 11.9229C9.25904 11.708 9.55129 11.5873 9.85594 11.5873C10.1606 11.5873 10.4529 11.708 10.6687 11.9229L16.9471 18.1949L27.0911 4.83174C27.2754 4.5883 27.5488 4.42796 27.8512 4.38595C28.1536 4.34395 28.4603 4.42375 28.7039 4.60775C28.9478 4.79318 29.1083 5.06762 29.1503 5.37107C29.1922 5.67453 29.1123 5.98227 28.9279 6.22693L17.9839 20.6397C17.8843 20.772 17.7572 20.8812 17.6114 20.9596C17.4656 21.0381 17.3044 21.0839 17.1391 21.0941L17.0623 21.1005Z"
										fill="#1D1D1B"
									/>
								</g>
							</svg>
							<p
								class="page-favorites__favorite-panel-btn-description"
							>
								Выбрать
							</p>
						</button>
					</template>

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
					:class="
						sortPanelSize <= 880
							? 'page-favorites__sort-panel-body_tiny'
							: ''
					"
					v-show="isSortPanelVisible === true"
				>
					<div class="page-favorites__sort-panel-col">
						<p class="page-favorites__sort-panel-description">
							Поиск по источнику
						</p>
						<r-dropdown
							v-model="show_by_source"
							showedValue="description"
							:list="favoriteParsourcesName"
							selected_item="Выберите источник"
						></r-dropdown>
					</div>

					<div class="page-favorites__sort-panel-col">
						<p class="page-favorites__sort-panel-description">
							Поиск по дате
						</p>
						<r-date-range-picker></r-date-range-picker>
					</div>

					<!-- <div class="page-favorites__sort-panel-col">
						<p class="page-favorites__sort-panel-description">
							Поиск по типу контента
						</p>
						<r-dropdown
							v-model="show_by_content"
							showedValue="description"
							selected_item="Выберите тип контента"
						></r-dropdown>
					</div> -->

					<r-button
						class="page-favorites__sort-panel-submit-button"
						color="bordered"
						text="Применить"
					></r-button>
					<r-button
						@click="resetFilter"
						class="page-favorites__sort-panel-reset-button"
						color="bordered"
						text="Сбросить"
					></r-button>
				</div>
			</div>

			<transition mode="out-in">
				<r-loader v-if="!isFavoritesLoaded" />
			</transition>

			<transition mode="out-in">
				<div
					class="page-favorites__list"
					v-if="isFavoritesLoaded && favoriteParsources.length > 0"
				>
					<favorite-card
						v-for="favorite in favoriteParsources"
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
			documentWidth() {
				if (this.documentWidth <= 1100) {
					this.isMinimizedRightPanel = true;
				}
				this.sortPanelSize = this.$refs.sortPanel.offsetWidth;
			},
		},
		computed: {
			...mapState({
				favorites: (state) => state.favorites.favorites,
				documentWidth: (state) => state.document_width,
			}),
			favoriteParsourcesName() {
				return this.favorites.reduce((prev, current) => {
					return [
						...prev,
						{ id: current.id, description: current.name },
					];
				}, []);
			},
			favoriteParsources() {
				if (this.show_by_source) {
					return [
						this.favorites.find(
							(parsource) => parsource.id === this.show_by_source
						),
					];
				} else {
					return this.favorites;
				}
			},
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

			sortPanelSize: 0,

			show_by_source: null,
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
			resetFilter() {
				this.show_by_source = null;
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
			this.isMinimizedRightPanel = this.documentWidth <= 1100;
			this.SET_TAB("favorites");
			this.getFavoriteParsers();
		},
		mounted() {
			this.sortPanelSize = this.$refs.sortPanel.offsetWidth;
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-favorites {
		position: relative;
		display: grid;
		grid-template-columns: 1fr max-content;
		padding: 0;
		gap: 3rem;

		@media (max-width: 540px) {
			gap: 0;
			grid-template-columns: 1fr;
		}

		&__main {
			position: relative;
			padding: 2rem 1rem 4rem 4rem;
			width: 100%;
			height: calc(100vh - 8rem);
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			@media (max-width: 1440px) {
				padding-right: 6rem;
			}
			@media (max-width: 1023px) {
				padding: 4rem 6rem 4rem 4rem;
			}
			@media (max-width: 767px) {
				padding: 2rem 5rem 2rem 1.5rem;
			}
			@media (max-width: 540px) {
				padding: 2rem 1.5rem;
			}
		}
		&__title {
			margin-bottom: 1.5rem;
			font-weight: 400;
		}

		&__sort-panel {
			margin-bottom: 4rem;
			@media (max-width: 540px) {
				margin-bottom: 2rem;
			}
			&-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 0.6rem;
			}
			&-submit-button {
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
				.page-favorites__sort-panel-submit-button {
					padding: 1rem 2.8rem;
					width: max-content;
					margin-left: auto;
				}
				.page-favorites__sort-panel-reset-button {
					padding: 1rem 2.8rem;
					width: max-content;
					margin-left: auto;
				}
				&_tiny {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					grid-gap: 2rem;
					.page-favorites__sort-panel-submit-button {
						width: 100%;
						padding: 1rem 2.8rem;
					}
					.page-favorites__sort-panel-reset-button {
						padding: 1rem 2.8rem;
						width: 100%;
					}
					@media (max-width: 550px) {
						grid-template-columns: 1fr;
					}
				}
				@media (max-width: 1740px) {
					grid-gap: 2rem;
					padding: 1.7rem;
				}
			}
			&-col {
			}
			&-description {
				margin-bottom: 0.5rem;
				font-size: 1.2rem;
				color: rgba($black, 0.5);
			}
		}
		&__favorite-panel-btn {
			display: flex;
			align-items: center;
			gap: 1rem;
			background-color: $light-blue;
		}
		&__favorite-panel-btn-description {
			font-size: 1.2rem;
			color: $primary;
			font-weight: 600;
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
