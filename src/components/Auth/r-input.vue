<template>
	<label class="r-input">
		<input
			:type="input_type_changed"
			@input="this.$emit('update:modelValue', $event.target.value)"
			:value="value"
			class="r-input__input"
			:placeholder="placeholder"
			:disabled="isDisabled"
		/>
		<transition mode="out-in">
			<img
				src="img/icon/cabinet/eye-closed.svg"
				alt="open-password"
				v-if="input_type === 'password' && isPasswordHide === true"
				class="r-input__icon"
				@click="if (isDisabled === false) showPassword();"
			/>
		</transition>

		<transition mode="out-in">
			<img
				src="img/icon/cabinet/eye-open.svg"
				alt="hide-password"
				v-if="input_type === 'password' && isPasswordHide === false"
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
			value: String,
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
			border: 0.1rem solid #3232321a;
			width: 100%;
			font-weight: 500;
			transition: all 0.2s ease;
			&:disabled {
				background-color: rgba(255, 255, 255, 0.5);
				+ .r-input__icon {
					cursor: default;
				}
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
