<template>
	<label class="r-input">
		<input
			:type="input_type"
			@input="this.$emit('update:modelValue', $event.target.value)"
			class="r-input__input"
		/>
	</label>
</template>

<script>
	export default {
		name: "r-input",
		props: {
			input_type: {
				value: String,
				default: "text",
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-input {
		&__input {
			font-size: 1.6rem;
			background-color: $white;
			padding: 1rem;
			border-radius: 0.6rem;
			border: 0.1rem solid #3232321a;
			width: 100%;
			font-weight: 500;
		}
	}
</style>
