<template>
	<input
		type="url"
		name=""
		id=""
		placeholder="http://"
		class="r-input-url"
		@input="
			this.$emit('update:modelValue', $event.target.value);
			this.$emit('update:valid', $event.target.checkValidity());
		"
		ref="da"
	/>
</template>

<script>
	export default {
		name: "rInputUrl",
		mounted() {
			// setTimeout(() => {
			// 	console.log(this.$refs.da.checkValidity());
			// }, 2000);
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-input-url {
		background-color: $white;
		padding: 1.5rem 2rem;
		border-radius: 1rem;
		font-size: 1.2rem;
		width: 100%;
		border: 0.1rem solid #006ee9;
		outline: 0.1rem solid transparent;
		transition: all 0.2s ease;
		&:focus {
			outline-color: #006ee9;
		}
		&:invalid {
			border-color: $red;
			outline-color: $red;
		}
	}
</style>
