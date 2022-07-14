<template>
	<label class="text-checkbox">
		<input
			type="checkbox"
			name=""
			class="text-checkbox__real"
			@change="this.$emit('update:modelValue', $event.target.checked)"
		/>
		<p class="text-checkbox__fake">{{ text }}</p>
	</label>
</template>

<script>
	export default {
		name: "TextCheckbox",
		props: {
			text: {
				value: String,
				default: "Checkbox",
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.text-checkbox {
		user-select: none;
		display: inline-block;
		&__real {
			display: none;
			&:checked {
				+ .text-checkbox__fake {
					color: $primary;
					border-color: $primary;
				}
			}
		}
		&__fake {
			cursor: pointer;
			width: fit-content;
			font-size: 1.3rem;
			color: rgba($black, $alpha: 0.7);
			border-radius: 2.2rem;
			padding: 1rem 2rem;
			border: 0.2rem solid rgba($black, $alpha: 0.5);
			font-weight: 500;
			transition: all 0.2s ease;
			&:hover {
				color: $primary;
				border-color: $primary;
			}
		}
	}
</style>
