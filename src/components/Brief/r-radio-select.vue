<template>
	<label class="r-radio-select">
		<input
			type="radio"
			:name="radio_name"
			id=""
			:value="value"
			class="r-radio-select__input"
		/>
		<div class="r-radio-select__btn">
			<p class="r-radio-select__description">{{ description }}</p>
			<div class="r-radio-select__input-fake">
				<span class="r-radio-select__input-fake-tick"></span>
			</div>
		</div>
	</label>
</template>

<script>
	export default {
		name: "rRadioSelect",
		props: {
			radio_name: {
				value: String,
				default: "radio",
			},
			value: {
				value: String,
				default: "input value",
			},
			description: {
				value: String,
				default: "input description",
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-radio-select {
		user-select: none;
		&__input {
			display: none;

			&:checked {
				+ .r-radio-select__btn {
					.r-radio-select__description {
						color: $secondary;
					}
					.r-radio-select__input-fake-tick {
						background-color: $secondary;
					}
				}
			}

			&-fake {
				width: 2.4rem;
				height: 2.4rem;
				border: 0.2rem solid $secondary;
				border-radius: 0.5rem;
				padding: 0.2rem;
				&-tick {
					display: block;
					border-radius: 0.2rem;
					background-color: transparent;
					width: 100%;
					height: 100%;
					transition: all 0.2s ease;
				}
			}
		}
		&__btn {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;
			cursor: pointer;
			background-color: $white;
			padding: 1.8rem 1.5rem;
			border-radius: 1rem;
			border: 0.2rem solid #e7f4ff;
		}
		&__description {
			color: #808080;
			font-size: 1.4rem;
			transition: all 0.2s ease;
		}
	}
</style>
