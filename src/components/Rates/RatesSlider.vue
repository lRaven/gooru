<template>
	<div class="rates-slider">
		<div class="rates-slider__top">
			<h2 class="rates-slider__title">{{ title }}</h2>
			<div class="rates-slider__nav" v-if="document_width > 540">
				<button
					class="rates-slider-button-prev swiper-button-prev"
				></button>
				<button
					class="rates-slider-button-next swiper-button-next"
				></button>
			</div>
		</div>
		<swiper
			class="rates-slider__inner"
			:space-between="30"
			:navigation="{
				nextEl: '.rates-slider-button-next',
				prevEl: '.rates-slider-button-prev',
			}"
			:breakpoints="{
				'0': {
					slidesPerView: 'auto',
					spaceBetween: 20,
				},
				'1340': {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			}"
			:modules="modules"
			:speed="600"
		>
			<swiper-slide v-for="slide in slides" :key="slide.id">
				<rate-card
					:name="slide.name"
					:price="slide.price"
					:checklist="slide.checklist"
				></rate-card>
			</swiper-slide>
		</swiper>
		<div class="rates-slider__bottom" v-if="document_width <= 540">
			<button
				class="rates-slider-button-prev swiper-button-prev"
			></button>
			<button
				class="rates-slider-button-next swiper-button-next"
			></button>
		</div>
	</div>
</template>

<script>
	import { Swiper, SwiperSlide } from "swiper/vue";
	import { Navigation } from "swiper";

	import "swiper/css";
	import "swiper/css/navigation";

	import RateCard from "@/components/Rates/RateCard";
	import { mapState } from "vuex";

	export default {
		name: "RatesSlider",
		components: {
			Swiper,
			SwiperSlide,
			RateCard,
		},
		props: {
			title: {
				value: String,
				default: "'slider title'",
			},
			slides: Array,
		},
		computed: { ...mapState(["document_width"]) },
		setup() {
			return {
				modules: [Navigation],
			};
		},
	};
</script>

<style lang="scss" scoped>
	.rates-slider {
		&__top {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 6rem;
		}
		&__nav {
			display: flex;
			align-items: center;
			gap: 3rem;
		}
		&__bottom {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 3.8rem;
			margin-top: 3rem;
		}
	}

	@media (max-width: 1340px) {
		.rates-slider {
			&__top {
				justify-content: space-between;
			}
			.swiper-slide {
				width: max-content;
			}
		}
	}

	@media (max-width: 767px) {
		.rates-slider {
			&__top {
				margin-bottom: 4rem;
			}
		}
	}
	@media (max-width: 540px) {
		.rates-slider {
			&__top {
				margin-bottom: 2.4rem;
			}
		}
	}
</style>
