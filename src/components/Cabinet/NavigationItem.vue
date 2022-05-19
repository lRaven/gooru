<template>
	<li class="navigation-item">
		<label class="navigation-item__label">
			<input
				type="radio"
				name="navigation-panel-item"
				id=""
				class="navigation-item__radio-real"
				:checked="isDefaultChecked"
				@change="this.$emit('set_tab', value)"
			/>
			<div class="navigation-item__radio-fake" ref="content">
				<div class="navigation-item__col">
					<slot name="icon"></slot>
					<p class="navigation-item__description">
						{{ description }}
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
			description: {
				value: String,
				default: "Nav item",
			},
			isDefaultChecked: {
				value: Boolean,
				default: false,
			},
			value: String,
			counter: {
				value: Number,
				default: 0,
			},
		},
		beforeCreate() {
			if (this.isDefaultChecked)
				this.$emit("update:modelValue", this.value);
		},
	};
</script>

<style lang="scss" scoped>
	.navigation-item {
		width: 100%;

		&__radio {
			&-real {
				display: none;
				&:checked {
					+ .navigation-item__radio-fake {
						background-color: rgba(255, 255, 255, 0.3);
					}
				}
			}

			&-fake {
				cursor: pointer;
				padding: 0.4rem 0.7rem 0.4rem 2rem;
				border-radius: 5rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 1rem;
				transition: all 0.2s ease;
				&:hover {
					background-color: rgba(255, 255, 255, 0.3);
				}
			}
		}

		&__col {
			display: flex;
			align-items: center;
			&:first-child {
				gap: 1.7rem;
			}
		}

		&__description {
			font-weight: 600;
			font-size: 1.4rem;
			color: var(--white);
		}

		&__counter {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: var(--red);
			color: var(--white);
			min-width: 1.8rem;
			height: 1.8rem;
			border-radius: 50%;
			font-weight: 600;
		}
	}
</style>
