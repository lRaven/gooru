<template>
	<label class="r-checkbox">
		<input
			type="checkbox"
			:name="name"
			:value="modelValue"
			id=""
			:checked="checked"
			:disabled="disabled"
			class="r-checkbox__real"
			@change="handleChange($event)"
			ref="checkbox"
		/>
		<div class="r-checkbox__fake">
			<div class="r-checkbox__fake-btn">
				<img
					src="/img/icon/cabinet/tick.svg"
					alt="tick"
					class="r-checkbox__tick"
				/>
			</div>

			<p class="r-checkbox__description" v-if="description">
				{{ description }}
			</p>
		</div>
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
			disabled: {
				value: Boolean,
				default: false,
			},
			name: {
				type: String,
				default: "",
			},
			modelValue: {
				type: Boolean,
				default: false,
			},
		},
		watch: {
			checked() {
				if (this.checked === true && this.modelValue === true) {
					//this.$refs.checkbox.checked = true;
				} else {
					//this.$refs.checkbox.checked = false;
					this.$emit("update:modelValue", this.checked);
				}
			},
		},
		methods: {
			handleChange($event) {
				this.$emit("update:modelValue", $event.target.checked);
			},
		},
	};
</script>
<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-checkbox {
		user-select: none;
		display: flex;
		align-items: center;
		gap: 1rem;
		width: fit-content;
		&__real {
			display: none;
			&:checked {
				~ .r-checkbox {
					&__fake {
						.r-checkbox {
							&__fake {
								&-btn {
									background-color: $primary;
									border-color: $primary;
								}
							}
							&__description {
								color: $black;
							}
						}
					}
				}
			}
			&:disabled {
				+ .r-checkbox__fake {
					cursor: default;
				}
			}
		}

		&__fake {
			cursor: pointer;
			display: flex;
			align-items: center;
			gap: 1rem;
			&-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 1.6rem;
				height: 1.6rem;
				border-radius: 0.3rem;
				background-color: $white;
				border: 0.1rem solid rgba($black, $alpha: 0.5);
				transition: all 0.2s ease;
			}
		}

		&__description {
			font-size: 1.2rem;
			color: rgba($black, $alpha: 0.7);
		}
	}
</style>
