<template>
	<div class="font-tool">
		<button
			class="font-tool__button font-tool__button_medium-size"
			title="Увеличить размер шрифта"
			@click="handleIncreaseFontSize"
		>
			<p class="font-tool__button-text">А</p>
			<svg
				v-if="canIncrease"
				class="font-tool__button-icon font-tool__button-icon_up"
				width="12"
				height="19"
				viewBox="0 0 12 19"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1.3335 1.33325L8.00016 7.99992L1.3335 14.6666"
					stroke="#000000"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
			</svg>
		</button>
		<button
			class="font-tool__button font-tool__button_small-size"
			title="Уменьшить размер шрифта"
			@click="handleDecreaseFontSize"
		>
			<p class="font-tool__button-text">А</p>
			<svg
				v-if="canDecrease"
				class="font-tool__button-icon font-tool__button-icon_down"
				width="12"
				height="19"
				viewBox="0 0 12 19"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1.3335 1.33325L8.00016 7.99992L1.3335 14.6666"
					stroke="#000000"
					stroke-width="1.5"
					stroke-linecap="round"
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
			padding: 0.8rem;
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
