<template>
	<label class="r-checkbox" :class="size">
		<input
			type="checkbox"
			:id="value"
			:value="value"
			class="r-checkbox__input"
			@input="this.$emit('update:modelValue', $event.target.checked)"
		/>
		<div class="r-checkbox__btn">
			<p class="r-checkbox__description">{{ description }}</p>
			<div class="r-checkbox__input-fake">
				<span class="r-checkbox__input-fake-tick"></span>
			</div>
		</div>
	</label>
</template>

<script>
	export default {
		name: "rCheckbox",
		props: {
			size: {
				value: String,
				default: "normal",
			},
			radio_name: {
				value: String,
				default: "checkbox",
			},
			value: {
				value: String,
				default: "input value",
			},
			description: {
				value: String,
				default: "input description",
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-checkbox {
		user-select: none;
		&__input {
			display: none;

			&:checked {
				+ .r-checkbox__btn {
					.r-checkbox__description {
						color: $secondary;
					}
					.r-checkbox__input-fake-tick {
						background-color: $secondary;
					}
				}
			}

			&-fake {
				width: 2.4rem;
				min-width: 2.4rem;
				height: 2.4rem;
				border: 0.2rem solid $secondary;
				border-radius: 0.5rem;
				padding: 0.2rem;
				&-tick {
					display: block;
					border-radius: 0.2rem;
					background-color: transparent;
					width: 100%;
					height: 100%;
					transition: all 0.2s ease;
				}
			}
		}
		&.normal {
			.r-checkbox__btn {
				padding: 1.8rem 1.5rem;
			}
		}
		&.small {
			.r-checkbox__btn {
				padding: 1.2rem;
			}
		}
		&__btn {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;
			cursor: pointer;
			background-color: $white;
			border-radius: 1rem;
			border: 0.2rem solid #e7f4ff;
		}
		&__description {
			font-weight: 600;
			color: #808080;
			font-size: 1.4rem;
			transition: all 0.2s ease;
		}
	}
</style>
