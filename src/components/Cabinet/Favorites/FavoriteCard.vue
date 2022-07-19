<template>
	<div class="favorite-card" v-click-away="closeContent">
		<div class="favorite-card__header">
			<div class="favorite-card__header-col">
				<r-checkbox
					v-model="isAllSelected"
					@update:modelValue="handleChangeAllParsers"
				></r-checkbox>
				<h4
					class="favorite-card__source"
					:title="source"
				>
					{{ source }}
				</h4>
				<p class="favorite-card__favorite">
					{{ parsource.parsers.length || 0 }}/{{ parsource.find }} в
					избранном
				</p>
				<p class="favorite-card__date">
					{{ parsource.date ? prettyDate(parsource.date) : "" }}
				</p>
			</div>
			<div class="favorite-card__header-col">
				<r-button
					color="bordered"
					text="Подробнее"
					@click="
						this.$router.push({
							path: `/cabinet/parsource/${parsource.id}`,
							query: { page: 1 },
						})
					"
				></r-button>

				<button
					class="favorite-card__hide"
					@click="
						isContentVisible === true
							? closeContent()
							: openContent()
					"
				>
					<p class="favorite-card__hide-description">свернуть</p>
					<svg
						width="10"
						height="6"
						viewBox="0 0 10 6"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="favorite-card__hide-icon"
						ref="arrow"
					>
						<path
							d="M9.60142 1.53033C9.89431 1.23744 9.89431 0.762563 9.60142 0.46967C9.30853 0.176777 8.83365 0.176777 8.54076 0.46967L9.60142 1.53033ZM5.03555 5.03555L4.50522 5.56588C4.79811 5.85877 5.27298 5.85877 5.56588 5.56588L5.03555 5.03555ZM1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L1.53033 0.46967ZM8.54076 0.46967L4.50522 4.50522L5.56588 5.56588L9.60142 1.53033L8.54076 0.46967ZM5.56588 4.50522L1.53033 0.46967L0.46967 1.53033L4.50522 5.56588L5.56588 4.50522Z"
							fill="#5960C7"
						/>
					</svg>
				</button>
			</div>
		</div>

		<div class="favorite-card__list" v-show="isContentVisible">
			<favorite-content-item
				v-for="parser in parsource.parsers"
				:key="parser.id"
				:parser="parser"
				@change-selected="handleChangeSelectedParsers"
				:checked="isAllSelected"
			></favorite-content-item>
		</div>
	</div>
</template>

<script>
	import FavoriteContentItem from "@/components/Cabinet/Favorites/FavoriteContentItem";

	import { prettyDate } from "@/js/processStrings";

	import { directive } from "vue3-click-away";

	export default {
		name: "FavoriteCard",
		components: { FavoriteContentItem },
		props: { parsource: Object },
		emits: ["update-selected-parsers"],
		data() {
			return {
				isAllSelected: false,
				isContentVisible: false,
				selectedParsers: [],
			};
		},
		computed: {
			source() {
				return this.parsource.data_source.split('/')[2] ? this.parsource.data_source.split('/')[2] : this.parsource.data_source;
			},
		},
		methods: {
			openContent() {
				this.isContentVisible = true;
				this.$refs.arrow.classList.add("open");
			},
			closeContent() {
				this.isContentVisible = false;
				this.$refs.arrow.classList.remove("open");
			},
			handleChangeSelectedParsers(state) {
				if (state.isSelect) {
					this.selectedParsers.push(state.id);
				} else {
					this.selectedParsers = this.selectedParsers.filter(
						(selectedParser) => {
							return selectedParser !== state.id;
						}
					);
				}
				this.$emit("update-selected-parsers", {
					parsourceId: this.parsource.id,
					selectedParsers: this.selectedParsers,
				});
			},
			handleChangeAllParsers(isChecked) {
				if (isChecked) {
					console.log(isChecked);
				}
			},
			prettyDate,
		},
		directives: { ClickAway: directive },
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.favorite-card {
		border-radius: 0.8rem;
		overflow: hidden;
		box-shadow: $shadow;
		+ .favorite-card {
			margin-top: 2rem;
		}
		&__header {
			display: flex;
			justify-content: space-between;
			background-color: $white;
			padding: 2rem 1rem;
			&-col {
				display: flex;
				align-items: center;
				gap: 3rem;
				.r-button {
					padding: 1rem 2.8rem;
					font-weight: 500;
					font-size: 1.4rem;
					@media (max-width: 150rem) {
					padding: 0.8rem 2.4rem;
				}
				}
				@media (max-width: 150rem) {
					gap: 2rem;
				}
			}
		}
		&__favorite,
		&__date {
			color: #868686;
		}
		&__hide {
			padding: 1rem;
			display: flex;
			align-items: center;
			gap: 1rem;
			background-color: transparent;
			&-description {
				color: $primary;
				font-size: 1rem;
			}
			&-icon {
				width: 1rem;
				transition: all 0.2s ease;
				&.open {
					transform: rotate(180deg);
				}
			}
		}
		&__source {
			max-width: 40rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			
		}
	}
</style>
