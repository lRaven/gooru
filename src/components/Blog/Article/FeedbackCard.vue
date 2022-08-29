<template>
	<div class="feedback-card">
		<div class="like">
			<button class="like__button" @click="changeLike">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="19"
					fill="none"
				>
					<path
						fill-rule="evenodd"
						d="M19.175 2.793a4.26 4.26 0 0 0-5.965-.005l-2.218 2.238L8.75 2.81c-1.65-1.648-4.317-1.639-5.937-.022l-.006.006c-.793.784-1.218 1.823-1.218 2.952 0 1.112.437 2.16 1.225 2.958l8.166 8.074 8.195-8.103c1.65-1.632 1.642-4.273.006-5.875l-.006-.006zM10.98 19L1.684 9.808A5.75 5.75 0 0 1 0 5.745C0 4.213.584 2.77 1.684 1.682 3.922-.553 7.586-.561 9.856 1.68l.024.024 1.1 1.088 1.1-1.11c2.282-2.242 5.955-2.238 8.218 0 2.268 2.22 2.268 5.862 0 8.104L10.98 19z"
						fill="#5960c7"
					/>
				</svg>
			</button>
			<p class="like__counter">{{ likes || 128 }}</p>
		</div>
		<r-button @click="handleClickNewAppeal" class="ask-button" text="Задать вопрос"></r-button>
		<r-button @click="handleClickNewOrder" class="order-button" text="Заказать"></r-button>
	</div>
</template>

<script>
	export default {
		name: "FeedbackCard",
		emits: {
			'open-appeal-popup': null,
			'new-order': null,
		},
		props: { likes: { type: Number, required: true } },
		methods: {
			handleClickNewAppeal() {
				console.log('open')
				this.$emit('open-appeal-popup');
			},
			handleClickNewOrder() {
				this.$emit('new-order');
			},
		}
	};
</script>

<style lang="scss" scoped>
	.feedback-card {
		display: grid;
		grid-auto-flow: column;
		justify-content: flex-start;
		grid-gap: 0 3rem;
		.r-button {
			font-size: 2rem;
			font-weight: 600;
			width: 30%;
			padding: 1rem;
		}
	}
	.like {
		display: flex;
		align-items: center;
		&__button {
			margin: 0 1rem 0 0;
      background-color: transparent;
      
		}
		&__counter {
			font-size: 2rem;
		}
	}
</style>
