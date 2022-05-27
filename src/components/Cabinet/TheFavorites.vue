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
					<r-dropdown v-model="show_by_source"></r-dropdown>
				</div>
			</div>
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
	import { mapMutations } from "vuex";

	import RightPanel from "@/components/Cabinet/RightPanel";
	import rSpoiler from "@/components/r-spoiler";
	import rCheckbox from "@/components/r-checkbox";
	import rButton from "@/components/r-button";
	import rDropdown from "@/components/Cabinet/r-dropdown";

	export default {
		name: "TheFavorites",
		components: {
			RightPanel,
			rSpoiler,
			rCheckbox,
			rButton,
			rDropdown,
		},
		data: () => ({
			isSortPanelVisible: true,
			show_by_source: "",

			total_selected: 0,
		}),
		methods: {
			...mapMutations(["SET_TAB"]),
		},
		created() {
			this.SET_TAB("favorites");
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-favorites {
		display: grid;
		grid-template-columns: 1fr max-content;
		padding-right: 0;
		gap: 3rem;

		&__main {
			padding-top: 4rem;
			width: 100%;
		}
		&__title {
			margin-bottom: 1.5rem;
		}

		&__sort-panel {
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
				padding: 2rem;
				background-color: rgba(255, 255, 255, 0.5);
			}
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
