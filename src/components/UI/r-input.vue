<template>
	<label class="r-input">
		<input
			:spellcheck="spellCheck"
			class="r-input__input"
			:name="inputName"
			:class="{
				transparent: isTransparent,
				error: error_message !== null,
			}"
			:type="input_type_changed"
			:value="modelValue"
			:placeholder="placeholder"
			:disabled="isDisabled"
			@blur="$emit('blur', $event.target.name)"
			@focus="$emit('focus', $event.target.name)"
			@input="
				this.$emit('update:modelValue', $event.target.value);
				this.$emit('update:Valid', $event.target.checkValidity());
			"
		/>
		<transition mode="out-in">
			<img
				src="@/../public/img/icon/cabinet/eye-closed.svg"
				alt="open-password"
				v-if="input_type === 'password' && isPasswordHide === true"
				class="r-input__icon"
				@click="if (isDisabled === false) showPassword();"
			/>
		</transition>

		<transition mode="out-in">
			<img
				src="/img/icon/cabinet/eye-open.svg"
				alt="hide-password"
				v-if="input_type === 'password' && isPasswordHide === false"
				class="r-input__icon"
				@click="if (isDisabled === false) hidePassword();"
			/>
		</transition>

		<transition mode="out-in">
			<img
				src="/img/icon/cabinet/search.svg"
				alt="search-tool"
				v-if="input_type === 'search'"
				class="r-input__icon"
				@click="if (isDisabled === false) hidePassword();"
			/>
		</transition>

		<p class="r-input__error" v-if="error_message !== null">
			{{ error_message }}
		</p>
	</label>
</template>

<script>
	export default {
		name: "r-input",
		emits: {
			blur: null,
			focus: null,
			"update:Valid": null,
			"update:modelValue": null,
		},
		props: {
			isDisabled: {
				value: Boolean,
				default: false,
			},
			isTransparent: {
				value: Boolean,
				default: false,
			},
			spellCheck: { type: Boolean, default: true },

			input_type: {
				value: String,
				default: "text",
			},
			placeholder: String,
			modelValue: String,
			error_message: {
				value: [null, String],
				default: null,
			},
			inputName: String,
		},
		computed: {
			isPasswordHide() {
				if (this.input_type_changed === "text") {
					return false;
				} else {
					return true;
				}
			},
		},
		data() {
			return {
				input_type_changed: this.input_type,
			};
		},
		methods: {
			showPassword() {
				this.input_type_changed = "text";
			},
			hidePassword() {
				this.input_type_changed = "password";
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-input {
		position: relative;

		&__input {
			font-size: 1.6rem;
			background-color: $white;
			padding: 1rem 4rem 1rem 1rem;
			border-radius: 0.6rem;
			border: 0.1rem solid rgba($black, 0.1);
			width: 100%;
			font-weight: 500;
			text-overflow: ellipsis;
			transition: all 0.2s ease;
			&:hover {
				border-color: rgba($primary, 1);
			}
			&:focus {
				border-color: rgba($primary, 1);
			}
			&:disabled {
				border-color: rgba($black, 0.1);
				background-color: rgba($white, 0.5);

				+ .r-input__icon {
					cursor: default;
				}
			}
			&.transparent {
				border-color: transparent;
				background-color: transparent;
			}
			&.error {
				border-color: $red;
			}
		}
		&__icon {
			cursor: pointer;
			position: absolute;
			right: 1rem;
			top: 2.1rem;
			transform: translateY(-50%);
			width: 2rem;
		}
		&__error {
			color: $red;
			font-size: 1.2rem;
			margin: 0.5rem 0;
		}
	}
</style>
