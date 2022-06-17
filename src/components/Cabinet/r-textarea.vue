<template>
	<div class="r-textarea">
		<textarea
			name=""
			id=""
			class="r-textarea__input"
			:class="bordered === true ? 'bordered' : null"
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
		&__input {
			resize: none;
			width: 100%;
			padding: 1rem;
			font-size: 1.3rem;
			font-weight: 500;
			background-color: $white;
			&.bordered {
				border: 0.1rem solid rgba(50, 50, 50, 0.1);
				border-radius: 0.6rem;
			}

			&::placeholder {
				color: $black-70;
			}
		}
	}
</style>
