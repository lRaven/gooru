<template>
	<div class="rate-card">
		<h4 class="rate-card__name">{{ name }}</h4>
		<div class="rate-card__price-wrapper">
			<p class="rate-card__price">
				{{ price }}₽ <span class="rate-card__price-month">/мес</span>
			</p>
		</div>
		<p class="rate-card__description">
			предоставляется возможность выбора тарифного плана
		</p>
		<ul class="rate-card__checklist">
			<li
				class="rate-card__checklist-item"
				v-for="item in checklist"
				:key="item.id"
			>
				<img
					src="img/icon/tick.svg"
					alt="tick"
					class="rate-card__tick"
				/>
				<p class="rate-card__checklist-item-text">{{ item.text }}</p>
			</li>
		</ul>
		<r-button text="Выбрать"></r-button>
	</div>
</template>

<script>
	import rButton from "@/components/r-button";

	export default {
		name: "RateCard",
		props: {
			name: {
				value: String,
				default: "'rate name'",
			},
			price: {
				value: Number,
				default: 0,
			},
			checklist: {
				value: Array,
				default: [
					{ id: 1, text: "item1" },
					{ id: 2, text: "item2" },
					{ id: 3, text: "item3" },
					{ id: 4, text: "item4" },
				],
			},
		},
		components: {
			rButton,
		},
	};
</script>

<style lang="scss" scoped>
	.rate-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #197eca0d;
		padding: 2rem 1.4rem 2rem 1rem;
		box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
		border-radius: 1rem;
		min-height: 47rem;
		max-width: 33rem;
		transition: all 0.2s ease;
		&:hover {
			background-color: rgba(25, 126, 202, 0.3);
			transition: all 0.3s ease;
		}

		&__name {
			text-align: center;
			margin-bottom: 2.5rem;
		}

		&__price {
			font-size: 4rem;
			font-weight: 600;
			&-wrapper {
				margin-bottom: 2rem;
			}
			&-month {
				font-size: 1.6rem;
				font-weight: 300;
			}
		}

		&__description {
			font-weight: 300;
			font-size: 1.6rem;
			text-align: center;
			margin-bottom: 3rem;
			line-height: 1.3;
		}

		&__checklist {
			margin-bottom: 2rem;
			&-item {
				display: flex;
				align-items: center;
				gap: 2rem;
				+ .rate-card__checklist-item {
					margin-top: 1.5rem;
				}
				&-text {
					font-size: 1.6rem;
				}
			}
		}
		&__tick {
			user-select: none;
			max-width: 2.7rem;
			max-height: 2.3rem;
		}
		.r-button {
			margin-top: auto;
			padding: 1.2rem 3rem;
		}
	}

	@media (max-width: 1023px) {
		.rate-card {
			&__description,
			&__checklist-item-text {
				font-size: 1.4rem;
			}
		}
	}
	@media (max-width: 540px) {
		.rate-card {
			padding: 2rem 1rem;
			max-width: 26rem;
		}
	}
</style>
