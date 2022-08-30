<template>
	<div class="font-tool">
		<button
			class="font-tool__button font-tool__button_medium-size"
			title="Увеличить размер шрифта"
			@click="handleIncreaseFontSize"
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M15.3431 15.2426C17.6863 12.8995 17.6863 9.1005 15.3431 6.75736C13 4.41421 9.20101 4.41421 6.85786 6.75736C4.51472 9.1005 4.51472 12.8995 6.85786 15.2426C9.20101 17.5858 13 17.5858 15.3431 15.2426ZM16.7574 5.34315C19.6425 8.22833 19.8633 12.769 17.4195 15.9075C17.4348 15.921 17.4498 15.9351 17.4645 15.9497L21.7071 20.1924C22.0976 20.5829 22.0976 21.2161 21.7071 21.6066C21.3166 21.9971 20.6834 21.9971 20.2929 21.6066L16.0503 17.364C16.0356 17.3493 16.0215 17.3343 16.008 17.319C12.8695 19.7628 8.32883 19.542 5.44365 16.6569C2.31946 13.5327 2.31946 8.46734 5.44365 5.34315C8.56785 2.21895 13.6332 2.21895 16.7574 5.34315ZM10.1005 7H12.1005V10H15.1005V12H12.1005V15H10.1005V12H7.10052V10H10.1005V7Z"
					fill="currentColor"
				/>
			</svg>
		</button>
		<button
			class="font-tool__button font-tool__button_small-size"
			title="Уменьшить размер шрифта"
			@click="handleDecreaseFontSize"
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M15.3431 15.2426C17.6863 12.8995 17.6863 9.1005 15.3431 6.75736C13 4.41421 9.20101 4.41421 6.85786 6.75736C4.51472 9.1005 4.51472 12.8995 6.85786 15.2426C9.20101 17.5858 13 17.5858 15.3431 15.2426ZM16.7574 5.34315C19.6425 8.22833 19.8633 12.769 17.4195 15.9075C17.4348 15.921 17.4498 15.9351 17.4645 15.9497L21.7071 20.1924C22.0976 20.5829 22.0976 21.2161 21.7071 21.6066C21.3166 21.9971 20.6834 21.9971 20.2929 21.6066L16.0503 17.364C16.0356 17.3493 16.0215 17.3343 16.008 17.319C12.8695 19.7628 8.32883 19.542 5.44365 16.6569C2.31946 13.5327 2.31946 8.46734 5.44365 5.34315C8.56785 2.21895 13.6332 2.21895 16.7574 5.34315ZM7.10052 10V12H15.1005V10L7.10052 10Z"
					fill="currentColor"
				/>
			</svg>
		</button>
	</div>
</template>

<script>
	export default {
		name: "FontTool",
		emits: {
			"change-font-size": null,
		},
		data() {
			return {
				currentSize: 0,
				sizes: new Map([
					[0, "smallSize"],
					[1, "mediumSize"],
					[2, "bigSize"],
				]),
			};
		},
		methods: {
			handleIncreaseFontSize() {
				let isAvalibleChange = this.sizes.get(this.currentSize + 1);
				if (isAvalibleChange) {
					this.currentSize += 1;
					this.$emit(
						"change-font-size",
						this.sizes.get(this.currentSize)
					);
				}
			},
			handleDecreaseFontSize() {
				let isAvalibleChange = this.sizes.get(this.currentSize - 1);
				if (isAvalibleChange) {
					this.currentSize -= 1;
					this.$emit(
						"change-font-size",
						this.sizes.get(this.currentSize)
					);
				}
			},
		},
		computed: {
			canIncrease() {
				if (this.currentSize < 2) {
					return true;
				} else {
					return false;
				}
			},
			canDecrease() {
				if (this.currentSize > 0) {
					return true;
				} else {
					return false;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";
	.font-tool {
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		padding: 0.8rem;
		border: 1px solid rgba($color: $black, $alpha: 0.7);
		border-radius: 0.5rem;

		&__button {
			position: relative;
			border: none;
			background-color: $white;
			/* padding: 0.8rem; */
			width: max-content;
			height: max-content;
			text-align: center;
			margin: 0 1rem 0 0;
			&:last-child {
				margin: 0;
			}
			&-text {
				font-size: 2.4rem;
				font-weight: 500;
				line-height: 1;
				&_limit {
					font-size: 2rem;
				}
			}
			&-icon {
				width: 20px;
				&_up {
					transform: rotate(270deg);
					position: absolute;
					top: -6px;
					right: -5px;
				}
				&_down {
					transform: rotate(90deg);
					position: absolute;
					top: -3px;
					right: -5px;
				}
			}
		}
	}
</style>
