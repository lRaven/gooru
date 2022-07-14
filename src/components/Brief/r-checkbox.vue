<template>
	<label class="r-checkbox">
		<input
			type="checkbox"
			:id="value"
			:value="value"
			:checked="isChecked"
			class="r-checkbox__input"
			v-model="isChecked"
			@input="this.$emit('update:modelValue', $event.target.checked)"
		/>
		<div class="r-checkbox__btn">
			<p class="r-checkbox__description" v-if="!hasInputField">
				{{ description }}
			</p>
			<input
				type="text"
				name=""
				class="r-checkbox__text"
				:placeholder="description"
				@input="
					isChecked = true;
					this.$emit('update:modelValue', isChecked);
					this.$emit('update:text', $event.target.value);
				"
				v-else
			/>
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
			hasInputField: {
				value: Boolean,
				default: false,
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
		data: () => ({
			isChecked: false,
		}),
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
		&__btn {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;
			cursor: pointer;
			padding: 1.8rem 1.5rem;
			background-color: $white;
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
		.r-checkbox {
			&__btn {
				padding: 1.2rem;
			}
		}
	}
</style>
