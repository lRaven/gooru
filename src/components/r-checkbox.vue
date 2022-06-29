<template>
	<label class="r-checkbox">
		<input
			type="checkbox"
			name=""
			id=""
			:checked="checked"
			class="r-checkbox__real"
			@change="handleChange($event)"
			ref="checkbox"
		/>
		<span class="r-checkbox__fake">
			<img src="img/icon/cabinet/tick.svg" alt="tick" />
		</span>
		<p class="r-checkbox__description" v-if="description">
			{{ description }}
		</p>
	</label>
</template>

<script>
	export default {
		name: "rCheckbox",
		props: {
			description: String,
			checked: {
				value: Boolean,
				default: false,
			},
		},
		data() {
			return{
				modelValue: this.checked,
			}
		},
		watch: {
			checked() {
				if (this.checked === true) {
					this.$refs.checkbox.checked = true;
				} else {
					this.$refs.checkbox.checked = false;
				}
				this.updateChecked(this.checked);
			},
		},
		methods: {
			handleChange($event) {
				this.$emit('update:modelValue', $event.target.checked);
			},
			updateChecked(value){
				this.$emit('update:modelValue', value);
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-checkbox {
		user-select: none;
		display: flex;
		align-items: center;
		gap: 1rem;
		cursor: pointer;
		width: fit-content;
		&__real {
			display: none;
			&:checked {
				~ .r-checkbox {
					&__fake {
						background-color: $primary;
						border-color: $primary;
					}
					&__description {
						color: $black;
					}
				}
			}
		}
		&__fake {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 1.6rem;
			height: 1.6rem;
			border-radius: 0.3rem;
			background-color: $white;
			border: 0.1rem solid $black-50;
			transition: all 0.2s ease;
		}
		&__description {
			font-size: 1.2rem;
			color: $black-70;
			font-weight: 500;
		}
	}
</style>
