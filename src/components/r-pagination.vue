<template>
	<div class="r-pagination">
		<button
			type="button"
			class="r-pagination__btn r-pagination__btn-prev disabled"
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

			Предыдущая
		</button>

		<ol class="r-pagination__items">
			<li class="r-pagination__item current">1</li>
			<li class="r-pagination__item">2</li>
			<li class="r-pagination__item">3</li>
			<li class="r-pagination__item">4</li>
			<li class="r-pagination__item">5</li>
			<div class="r-pagination__separator">...</div>
			<li class="r-pagination__item">18</li>
		</ol>

		<button type="button" class="r-pagination__btn r-pagination__btn-next">
			Следующая
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
	export default {
		name: "rPagination",
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
				color: $black-50;
				transition: all 0.2s ease;
				&.disabled {
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
		}
		&__item {
			cursor: pointer;
			list-style: none;
			font-size: 1.2rem;
			color: $black-50;
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
				color: $black-70;
				background-color: $primary-20;
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
			color: $black-50;
		}
	}
</style>
