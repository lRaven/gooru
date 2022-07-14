<template>
	<textarea
		name=""
		class="r-textarea"
		:class="{ bordered: bordered }"
		:placeholder="placeholder"
		:value="value"
		@input="this.$emit('update:modelValue', $event.target.value)"
	></textarea>
</template>

<script>
	export default {
		name: "rTextarea",
		props: {
			value: String,
			placeholder: {
				value: String,
				default: "Placeholder",
			},
			bordered: {
				value: Boolean,
				default: true,
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-textarea {
		resize: none;
		width: 100%;
		height: 10rem;
		padding: 1rem;
		font-size: 1.3rem;
		font-weight: 500;
		background-color: $white;
		&.bordered {
			border: 0.1rem solid rgba(50, 50, 50, 0.1);
			border-radius: 0.6rem;
		}

		&::placeholder {
			color: rgba($black, $alpha: 0.7);
		}
	}
</style>
