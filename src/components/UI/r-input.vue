<template>
	<label class="r-input">
		<input
			class="r-input__input"
			:class="{ transparent: isTransparent }"
			:type="input_type_changed"
			:value="value"
			:placeholder="placeholder"
			:disabled="isDisabled"
			@input="
				this.$emit('update:modelValue', $event.target.value);
				this.$emit('update:Valid', $event.target.checkValidity());
			"
		/>
		<transition mode="out-in">
			<img
				src="/img/icon/cabinet/eye-closed.svg"
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
	</label>
</template>

<script>
	export default {
		name: "r-input",
		props: {
			placeholder: String,
			input_type: {
				value: String,
				default: "text",
			},
			isDisabled: {
				value: Boolean,
				default: false,
			},
			isTransparent: {
				value: Boolean,
				default: false,
			},
			value: String,
			placeHolder: {
				value: String,
				default: "",
			},
		},
		computed: {
			isPasswordHide() {
				let result;

				this.input_type_changed === "text"
					? (result = false)
					: (result = true);

				return result;
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
			border: 0.1rem solid rgba($black, $alpha: 0.1);
			width: 100%;
			font-weight: 500;
			text-overflow: ellipsis;
			transition: all 0.2s ease;
			&:hover {
				border-color: rgba($gray, $alpha: 0.5);
			}
			&:focus {
				border-color: $gray;
			}
			&:disabled {
				background-color: rgba(255, 255, 255, 0.5);
				border-color: rgba($black, $alpha: 0.1);

				+ .r-input__icon {
					cursor: default;
				}
			}
			&.transparent {
				border-color: transparent;
				background-color: transparent;
			}
		}
		&__icon {
			cursor: pointer;
			position: absolute;
			right: 1rem;
			top: 50%;
			transform: translateY(-50%);
			width: 2rem;
		}
	}
</style>
