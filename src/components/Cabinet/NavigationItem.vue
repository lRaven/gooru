<template>
	<li class="navigation-item">
		<label class="navigation-item__label">
			<input
				type="radio"
				name="navigation-panel-item"
				id=""
				class="navigation-item__radio-real"
				:checked="isDefaultChecked"
				@change="this.$emit('set_tab', tabValue, pagination)"
				@click="this.$emit('set_tab', tabValue, pagination)"
			/>
			<div class="navigation-item__radio-fake" ref="content">
				<div class="navigation-item__col">
					<slot name="icon"></slot>
					<p class="navigation-item__description">
						{{ text }}
					</p>
				</div>
				<span
					class="navigation-item__col navigation-item__counter"
					v-if="counter > 0"
				>
					{{ counter }}
				</span>
			</div>
		</label>
	</li>
</template>

<script>
	export default {
		name: "NavigationItem",
		props: {
			text: {
				value: String,
				default: "Nav item",
			},
			isDefaultChecked: {
				value: Boolean,
				default: false,
			},
			tabValue: String,
			pagination: {
				value: Boolean,
				default: false,
			},
			counter: {
				value: Number,
				default: 0,
			},
		},
		beforeCreate() {
			if (this.isDefaultChecked)
				this.$emit("update:modelValue", this.tabValue);
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.navigation-item {
		user-select: none;
		width: 100%;

		&__radio {
			&-real {
				display: none;
				&:checked {
					+ .navigation-item__radio-fake {
						.navigation-item__col:first-child {
							background-color: rgba(255, 255, 255, 0.3);
						}
					}
				}
			}

			&-fake {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 0.5rem;
			}
		}

		&__col {
			display: flex;
			align-items: center;
			transition: all 0.2s ease;
			&:hover {
				background-color: rgba(255, 255, 255, 0.3);
			}
			&:first-child {
				border-radius: 5rem;
				padding: 0.4rem 0.7rem 0.4rem 2rem;
				cursor: pointer;
				gap: 1.7rem;
				width: 100%;
			}
		}

		&__description {
			font-weight: 600;
			font-size: 1.4rem;
			color: $white;
		}

		&__counter {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: $red;
			color: $white;
			min-width: 1.8rem;
			height: 1.8rem;
			border-radius: 50%;
			font-weight: 600;
		}
	}
</style>
