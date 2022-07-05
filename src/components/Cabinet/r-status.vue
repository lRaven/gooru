<template>
	<p class="r-status r-status__works" v-if="status !== null && status < 100">
		Выполнено {{ status }}%
	</p>
	<p class="r-status r-status__completed" v-if="status === 100">Готово</p>
	<p class="r-status r-status__postpone" v-if="status === null">Отложено</p>
</template>

<script>
	export default {
		name: "rStatus",
		props: { status: Number },
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-status {
		user-select: none;
		display: inline-block;
		width: fit-content;
		padding: 0.8rem 2.4rem;
		border-radius: 5rem;
		font-weight: 600;
		font-size: 1.4rem;
		&__works {
			color: $secondary;
			background-color: rgba($secondary, $alpha: 0.1);
		}
		&__completed {
			color: $primary;
			background-color: rgba($primary, $alpha: 0.15);
		}
		&__postpone {
			color: rgba($black, $alpha: 0.5);
			background-color: #f0f0f0;
		}
	}
</style>
