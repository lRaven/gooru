<template>
	<section class="the-favorites">
		<div class="the-favorites__main">
			<h2 class="the-favorites__title">Избранное</h2>
			<div class="the-favorites__sort-panel">
				<div class="the-favorites__sort-panel-header">
					<button class="the-favorites__sort-panel-btn" type="button">
						<img
							src="img/icon/cabinet/sort.svg"
							alt=""
							class="the-favorites__sort-panel-btn-icon"
						/>
						<p class="the-favorites__sort-panel-btn-description">
							Сортировать
						</p>
					</button>

					<button class="the-favorites__sort-panel-btn">
						<p class="the-favorites__sort-panel-btn-description">
							Сортировать
						</p>
						<img
							src="img/icon/cabinet/arrow-double.svg"
							alt=""
							class="the-favorites__sort-panel-btn-icon"
						/>
					</button>
				</div>

				<div class="the-favorites__sort-panel-body"></div>
			</div>
		</div>

		<parser-filters />
	</section>
</template>

<script>
	import { mapMutations } from "vuex";
	import ParserFilters from "@/components/Cabinet/Parser/ParserFilters";

	export default {
		name: "TheFavorites",
		components: {
			ParserFilters,
		},
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
		display: flex;
		justify-content: space-between;
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
			}

			&-btn {
				display: flex;
				align-items: center;
				gap: 1rem;
				background-color: transparent;
			}
			&-btn {
				&:last-child {
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
			}
		}
	}
</style>
