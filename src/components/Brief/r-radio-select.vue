<template>
	<label class="r-radio-select">
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
			<p class="r-radio-select__description" v-if="!hasInputField">
				{{ description }}
			</p>
			<input
				type="text"
				name=""
				class="r-radio-select__text"
				:placeholder="description"
				@input="
					isChecked = true;
					this.$emit('update:modelValue', value);
					this.$emit('update:text', $event.target.value);
				"
				v-else
			/>

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
			hasInputField: {
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
			selected_value: Number,
			description: {
				value: String,
				default: "input description",
			},
		},
		watch: {
			selected_value() {
				this.selected_value !== this.value
					? (this.isChecked = false)
					: (this.isChecked = true);
			},
		},
		data: () => ({ isChecked: false }),
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
		&__btn {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;
			cursor: pointer;
			background-color: $white;
			padding: 1.8rem 1.5rem;
			border-radius: 1rem;
			border: 0.2rem solid #e7f4ff;
		}
		&__description,
		&__text {
			width: 100%;
			font-weight: 600;
			color: #808080;
			font-size: 1.4rem;
			transition: all 0.2s ease;
		}
	}

	@media (max-width: 540px) {
		.r-radio-select {
			&__btn {
				padding: 1.2rem;
			}
		}
	}
</style>
