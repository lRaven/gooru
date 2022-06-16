<template>
	<div class="r-textarea">
		<textarea
			name=""
			id=""
			class="r-textarea__input"
			:style="`height: ${height}rem`"
			:placeholder="placeholder"
			@input="this.$emit('update:modelValue', $event.target.value)"
		></textarea>
	</div>
</template>

<script>
	export default {
		name: "rTextarea",
		props: {
			height: {
				value: Number,
				default: 10,
			},
			placeholder: {
				value: String,
				default: "Placeholder",
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-textarea {
		&__input {
			resize: none;
			width: 100%;
			padding: 1rem;
			font-size: 1.3rem;
			font-weight: 500;
			border-radius: 0.6rem;
			background-color: $white;
			border: 0.1rem solid rgba(50, 50, 50, 0.1);

			&::placeholder {
				color: $black-70;
			}
		}
	}
</style>
