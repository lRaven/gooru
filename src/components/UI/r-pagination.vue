<template>
	<div class="r-pagination">
		<button
			type="button"
			class="r-pagination__btn r-pagination__btn-prev"
			:class="{ disabled: current_page <= 1 }"
			@click="changePage(current_page - 1)"
		>
			<svg
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="r-pagination__btn-arrow"
			>
				<path
					d="M9.60142 1.53033C9.89431 1.23744 9.89431 0.762563 9.60142 0.46967C9.30853 0.176777 8.83365 0.176777 8.54076 0.46967L9.60142 1.53033ZM5.03555 5.03555L4.50522 5.56588C4.79811 5.85877 5.27298 5.85877 5.56588 5.56588L5.03555 5.03555ZM1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L1.53033 0.46967ZM8.54076 0.46967L4.50522 4.50522L5.56588 5.56588L9.60142 1.53033L8.54076 0.46967ZM5.56588 4.50522L1.53033 0.46967L0.46967 1.53033L4.50522 5.56588L5.56588 4.50522Z"
					fill="#989898"
				/>
			</svg>

			{{ document_width > 767 ? "Предыдущая" : "" }}
		</button>

		<ol class="r-pagination__items" v-if="totalPages <= 7">
			<li
				class="r-pagination__item"
				v-for="pagination_item in totalPages"
				:key="pagination_item"
			>
				<button
					@click="changePage(pagination_item)"
					class="r-pagination__item-btn"
					:class="{
						current: current_page === pagination_item,
					}"
				>
					{{ pagination_item }}
				</button>
			</li>
		</ol>

		<ol
			class="r-pagination__items"
			v-else-if="totalPages > 7 && current_page < totalPages - 6"
		>
			<li
				class="r-pagination__item"
				v-for="pagination_item in range"
				:key="pagination_item"
			>
				<button
					@click="changePage(pagination_item)"
					class="r-pagination__item-btn"
					:class="{
						current: current_page === pagination_item,
						wide: pagination_item > 99,
					}"
				>
					{{ pagination_item }}
				</button>
			</li>

			<div class="r-pagination__separator">...</div>

			<li class="r-pagination__item">
				<button
					@click="changePage(totalPages)"
					class="r-pagination__item-btn"
					:class="{
						current: current_page === totalPages,
						wide: totalPages > 99,
					}"
				>
					{{ totalPages }}
				</button>
			</li>
		</ol>

		<ol class="r-pagination__items" v-else>
			<li
				class="r-pagination__item"
				v-for="pagination_item in remaining_range"
				:key="pagination_item"
			>
				<button
					@click="changePage(pagination_item)"
					class="r-pagination__item-btn"
					:class="{
						current: current_page === pagination_item,
						wide: pagination_item > 99,
					}"
				>
					{{ pagination_item }}
				</button>
			</li>
		</ol>

		<button
			type="button"
			class="r-pagination__btn r-pagination__btn-next"
			:class="{ disabled: current_page >= totalPages }"
			@click="changePage(current_page + 1)"
		>
			{{ document_width > 767 ? "Следующая" : "" }}
			<svg
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="r-pagination__btn-arrow"
			>
				<path
					d="M9.60142 1.53033C9.89431 1.23744 9.89431 0.762563 9.60142 0.46967C9.30853 0.176777 8.83365 0.176777 8.54076 0.46967L9.60142 1.53033ZM5.03555 5.03555L4.50522 5.56588C4.79811 5.85877 5.27298 5.85877 5.56588 5.56588L5.03555 5.03555ZM1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L1.53033 0.46967ZM8.54076 0.46967L4.50522 4.50522L5.56588 5.56588L9.60142 1.53033L8.54076 0.46967ZM5.56588 4.50522L1.53033 0.46967L0.46967 1.53033L4.50522 5.56588L5.56588 4.50522Z"
					fill="#989898"
				/>
			</svg>
		</button>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "rPagination",
		props: {
			start_page: {
				value: Number,
				default: 1,
			},
			count: {
				value: Number,
				default: 70,
			},
			items_on_page: {
				value: Number,
				default: 10,
			},
		},
		computed: {
			...mapState(["document_width"]),

			totalPages() {
				return Math.ceil(this.count / this.items_on_page);
			},

			//* range before separator
			range() {
				let range = [];
				for (
					let index = this.current_page;
					index < this.current_page + 5;
					index++
				) {
					range.push(index);
				}
				return range;
			},

			//* remaining range
			remaining_range() {
				let range = [];
				for (
					let index = this.totalPages - 6;
					index <= this.totalPages;
					index++
				) {
					range.push(index);
				}
				return range;
			},
		},
		watch: {
			start_page() {
				this.current_page = this.start_page;
			},
		},
		data() {
			return { current_page: this.start_page };
		},
		methods: {
			changePage(page_number) {
				this.current_page = page_number;
				this.$emit("page_changed", page_number);
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-pagination {
		user-select: none;
		display: flex;
		align-items: center;
		gap: 3rem;

		&__btn {
			&-prev,
			&-next {
				display: flex;
				align-items: center;
				gap: 0.8rem;
				background-color: transparent;
				font-size: 1rem;
				color: rgba($black, $alpha: 0.5);
				transition: all 0.2s ease;
				&.disabled {
					pointer-events: none;
					cursor: default;
					opacity: 0.5;
				}
			}
			&-prev {
				.r-pagination__btn-arrow {
					transform: rotate(90deg);
				}
			}
			&-next {
				.r-pagination__btn-arrow {
					transform: rotate(-90deg);
				}
			}
		}

		&__items {
			display: flex;
			align-items: center;
			gap: 0.9rem;
			@media (max-width: 425px) {
				flex-wrap: wrap;
			}
		}
		&__item {
			list-style: none;
			&-btn {
				cursor: pointer;
				background-color: transparent;
				font-size: 1.2rem;
				color: rgba($black, $alpha: 0.5);
				width: 2.4rem;
				height: 2.4rem;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.2s ease;
				&.current {
					cursor: default;
					font-weight: 700;
					color: rgba($black, $alpha: 0.7);
					background-color: rgba($primary, $alpha: 0.2);
				}
				&.wide {
					width: max-content;
					border-radius: 2.4rem;
					padding: 0 1rem;
				}
			}
		}
		&__separator {
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: default;
			font-size: 1.2rem;
			width: 2.4rem;
			height: 2.4rem;
			color: rgba($black, $alpha: 0.5);
		}
	}
</style>
