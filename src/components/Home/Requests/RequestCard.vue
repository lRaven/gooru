<template>
	<div class="request-card">
		<div class="request-card__header">
			<span class="request-card__circle"></span>
			<span class="request-card__circle"></span>
			<span class="request-card__circle"></span>
		</div>
		<div class="request-card__main">
			<img :src="img" alt="" class="request-card__image" />
		</div>
		<div class="request-card__info">
			<h5 class="request-card__title">
				Парсинг сайта <br />
				{{ resourceName }}
			</h5>
			<div class="request-card__details">
				<div class="request-card__col">
					<p class="request-card__col-title">Найдено позиций</p>
					<p class="request-card__col-value">{{ found }}</p>
				</div>
				<div class="request-card__col">
					<p class="request-card__col-title">Время парсинга</p>
					<p class="request-card__col-value">{{ time }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RequestCard",
		props: {
			img: String,
			resourceName: {
				value: String,
				default: "'resource name'",
			},
			found: {
				value: Number,
				default: 0,
			},
			time: {
				value: String,
				default: "0мин",
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.request-card {
		max-width: 33rem;
		width: 100%;
		border-radius: 1rem;
		overflow: hidden;
		background-color: $white;
		box-shadow: $shadow;
		&__header {
			background: linear-gradient(180deg, #3d86cf 0%, #6670d3 100%);
			padding: 0.6rem 1rem;
		}
		&__circle {
			display: inline-block;
			border-radius: 50%;
			border: 0.1rem solid $white;
			width: 0.5rem;
			height: 0.5rem;
			+ .request-card__circle {
				margin-left: 0.7rem;
			}
		}

		&__main {
			max-height: 20rem;
		}
		&__image {
			object-fit: cover;
			width: 100%;
			max-height: 22rem;
		}

		&__info {
			border-top: 0.1rem solid $primary;
			padding: 2rem;
		}

		&__title {
			margin-bottom: 1.5rem;
			font-weight: 700;
			line-height: 1.3;
		}

		&__details {
			display: flex;
			justify-content: space-between;
			gap: 2rem;
		}
		&__col {
			&-title {
				font-size: 1.2rem;
				margin-bottom: 0.7rem;
			}
			&-value {
				font-size: 1.6rem;
				font-weight: 600;
			}
		}
	}

	@media (max-width: 540px) {
		.request-card {
			max-width: initial;
		}
	}
</style>
