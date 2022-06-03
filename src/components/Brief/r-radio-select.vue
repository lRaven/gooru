<template>
	<label class="r-radio-select" :class="size">
		<input
			type="radio"
			:name="radio_name"
			id=""
			:value="value"
			:checked="isChecked"
			class="r-radio-select__input"
			@input="this.$emit('update:modelValue', value)"
		/>
		<div class="r-radio-select__btn">
			<p class="r-radio-select__description">{{ description }}</p>
			<div class="r-radio-select__input-fake">
				<span class="r-radio-select__input-fake-tick"></span>
			</div>
		</div>
	</label>
</template>

<script>
	export default {
		name: "rRadioSelect",
		props: {
			size: {
				value: String,
				default: "normal",
			},
			isChecked: {
				value: Boolean,
				default: false,
			},
			radio_name: {
				value: String,
				default: "radio",
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

	.r-radio-select {
		user-select: none;
		&__input {
			display: none;

			&:checked {
				+ .r-radio-select__btn {
					.r-radio-select__description {
						color: $secondary;
					}
					.r-radio-select__input-fake-tick {
						background-color: $secondary;
					}
				}
			}

			&-fake {
				width: 2.4rem;
				height: 2.4rem;
				min-width: 2.4rem;
				border: 0.2rem solid $secondary;
				border-radius: 50%;
				padding: 0.2rem;
				&-tick {
					display: block;
					border-radius: 50%;
					background-color: transparent;
					width: 100%;
					height: 100%;
					transition: all 0.2s ease;
				}
			}
		}
		&.normal {
			.r-radio-select__btn {
				padding: 1.8rem 1.5rem;
			}
		}
		&.small {
			.r-radio-select__btn {
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
