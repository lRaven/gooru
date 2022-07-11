<template>
	<div class="parsource-notification">
		<p class="parsource-notification__description">
			Ваш парсер уже в работе, на его создание уйдет некоторое время, в
			случае необходимости уточнения информации рекомендуем
			воспользоваться интерфейсом “обращения”
		</p>
		<r-button
			color="white"
			text="Ок"
			@click="$emit('close-toast')"
		></r-button>
	</div>
</template>

<script>
	import rButton from "@/components/UI/r-button.vue";

	export default {
		name: "yoo_test",
		components: {
			rButton,
		},
	};
</script>

<style lang="scss" scoped>
	.parsource-notification {
		max-width: 40rem;

		&__description {
			margin-bottom: 1rem;
			line-height: 1.1;
		}

		.r-button {
			padding: 1rem 5rem;
		}
	}
</style>
