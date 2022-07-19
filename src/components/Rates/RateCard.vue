<template>
	<div class="rate-card" :class="color">
		<h4 class="rate-card__name">{{ rate.name }}</h4>
		<div class="rate-card__price-wrapper">
			<p class="rate-card__price" v-if="rate.price !== null">
				{{ rate.price }}₽
				<span class="rate-card__price-month">/мес</span>
			</p>
			<p v-else class="rate-card__price-individually">Индивидуально</p>
		</div>
		<p class="rate-card__description">
			предоставляется возможность выбора тарифного плана
		</p>
		<ul class="rate-card__checklist">
			<li
				class="rate-card__checklist-item"
				v-for="item in rate.checkList"
				:key="item.id"
			>
				<img
					src="/img/icon/tick.svg"
					alt="tick"
					class="rate-card__tick"
				/>
				<p class="rate-card__checklist-item-text">{{ item.text }}</p>
			</li>
		</ul>
		<r-button
			:text="ButtonText"
			v-if="isHasButton"
			@click="this.$emit('select-rate', this.rate.id)"
		></r-button>
	</div>
</template>

<script>
	export default {
		name: "RateCard",
		props: {
			isHasButton: {
				value: Boolean,
				default: true,
			},
			ButtonText: {
				value: String,
				default: "button",
			},
			color: {
				value: String,
				default: "blue",
			},
			rate: Object,
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.rate-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem 1.4rem 2rem 1rem;
		box-shadow: $shadow;
		border-radius: 1rem;
		min-height: 47rem;
		max-width: 33rem;
		transition: all 0.2s ease;

		&.blue {
			background-color: #197eca0d;
			&:hover {
				background-color: rgba(25, 126, 202, 0.3);
				transition: all 0.3s ease;
			}
		}
		&.white {
			background-color: $white;
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
			&-individually {
				//*костылирование
				font-size: 3rem;
				font-weight: 600;
				margin-bottom: 0.7rem;
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
			max-width: 28rem;
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
			&__price-individually {
				//*костылирование
				font-size: 2.4rem;
				margin-bottom: 1.7rem;
			}
		}
	}
</style>
