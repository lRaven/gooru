<template>
	<textarea
		name=""
		:spellcheck="spellCheck"
		class="r-textarea"
		:class="{ bordered: bordered }"
		:placeholder="placeholder"
		:value="modelValue"
		@input="this.$emit('update:modelValue', $event.target.value)"
		@focus="handleSetFocusedStyle"
		@blur="handleUnsetFocusedStyle"
		ref="textarea"
	></textarea>
</template>

<script>
	export default {
		name: "rTextarea",
		emits: {
			focus: null,
			blur: null,
			'update:modelValue': null,
		},
		props: {
			modelValue: String,
			placeholder: {
				value: String,
				default: "Placeholder",
			},
			spellCheck: { type: Boolean, default: true },
			bordered: {
				value: Boolean,
				default: true,
			},
		},
		methods: {
			handleSetFocusedStyle() {
				this.$emit('focus');
				this.$refs.textarea.classList.add('r-textarea_focused');
			},
			handleUnsetFocusedStyle() {
				this.$emit('blur');
				this.$refs.textarea.classList.remove('r-textarea_focused');
			}
		}
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
			border: 0.1rem solid rgba(50, 50, 50, 0.2);
			border-radius: 0.6rem;
		}
		&_focused{
			border: 0.1rem solid rgba($primary, 1) !important;
		}

		&::placeholder {
			color: rgba($black, 0.7);
		}
	}
</style>
