<template>
	<section class="brief-end">
		<h1 class="brief-end__title">СПАРСИБО!</h1>
	</section>
</template>

<script>
	export default {
		name: "BriefEnd",
		mounted() {
			setTimeout(() => {
				this.$router.push("/");
			}, 5000);
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.brief-end {
		&__title {
			width: fit-content;
			position: relative;
			font-size: 4.8rem;
			line-height: 1.3;
			padding-top: 2rem;
			text-transform: uppercase;
			font-weight: 700;
			margin-bottom: 5rem;
			&::before {
				content: "";
				position: absolute;
				left: 0;
				top: 0;
				width: 70%;
				height: 0.6rem;
				background-color: $white;
			}
		}
	}
</style>
