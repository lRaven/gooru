<template>
	<div class="r-notification">
		<slot name="icon">
			<img src="img/icon/notifications/info.svg" alt="icon" />
		</slot>

		<div class="r-notification__col">
			<h4 class="r-notification__status">{{ title }}</h4>
			<p class="r-notification__description">{{ description }}</p>
		</div>

		<button
			type="button"
			class="r-notification__close"
			@click="this.$emit('closeNotification')"
		>
			<img src="img/icon/notifications/close.svg" alt="close" />
		</button>
	</div>
</template>

<script>
	export default {
		name: "rNotification",
		props: {
			isNotificationVisible: {
				value: Boolean,
				default: false,
			},
			title: {
				value: String,
				default: "Info",
			},
			description: {
				value: String,
				default: "This is a simple notification",
			},
		},
		mounted() {
			setTimeout(() => {
				this.$emit("closeNotification");
			}, 3000);
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-notification {
		position: fixed;
		top: 10rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 2rem;
		align-items: center;
		justify-content: space-between;
		box-shadow: $shadow;
		background-color: $white;
		border-radius: 0.6rem;
		padding: 2rem;
		width: fit-content;

		img {
			width: 3rem;
		}

		&__col {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			min-width: 20rem;
		}

		&__status {
			font-weight: 500;
		}
		&__description {
			font-size: 1.4rem;
		}

		&__close {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: transparent;
			width: 3rem;
			min-width: 3rem;
			height: 3rem;
		}
	}
</style>
