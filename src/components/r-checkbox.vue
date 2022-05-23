<template>
	<label class="r-checkbox">
		<input
			type="checkbox"
			name=""
			id=""
			class="r-checkbox__real"
			@change="this.$emit('update:modelValue', $event.target.checked)"
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
		props: { description: String },
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
				+ .r-checkbox__fake {
					background-color: $primary;
					border-color: $primary;
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
		}
	}
</style>
