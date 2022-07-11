<template>
	<div class="requests-slider">
		<div class="requests-slider__top">
			<h2 class="requests-slider__title">{{ title }}</h2>
			<div class="requests-slider__nav" v-show="document_width > 540">
				<button
					class="requests-slider-button-prev swiper-button-prev"
				></button>
				<button
					class="requests-slider-button-next swiper-button-next"
				></button>
			</div>
		</div>
		<swiper
			class="requests-slider__inner"
			:space-between="30"
			:navigation="{
				nextEl: '.requests-slider-button-next',
				prevEl: '.requests-slider-button-prev',
			}"
			:breakpoints="{
				'540': {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				'541': {
					slidesPerView: 'auto',
					spaceBetween: 30,
				},
			}"
			:modules="modules"
			:speed="600"
		>
			<swiper-slide v-for="slide in slides" :key="slide.id">
				<request-card
					:img="slide.img"
					:resourceName="slide.resourceName"
					:found="slide.found"
					:time="slide.time"
				></request-card>
			</swiper-slide>
		</swiper>
		<div class="requests-slider__bottom" v-show="document_width <= 540">
			<button
				class="requests-slider-button-prev swiper-button-prev"
			></button>
			<button
				class="requests-slider-button-next swiper-button-next"
			></button>
		</div>
	</div>
</template>

<script>
	import { Swiper, SwiperSlide } from "swiper/vue";
	import { Navigation } from "swiper";

	import "swiper/css";
	import "swiper/css/navigation";

	import RequestCard from "@/components/Home/Requests/RequestCard";
	import { mapState } from "vuex";

	export default {
		name: "RequestsSlider",
		components: {
			Swiper,
			SwiperSlide,
			RequestCard,
		},
		props: {
			title: {
				value: String,
				default: "'slider title'",
			},
			slides: Array,
		},
		data: () => ({
			slidesPerView: 4,
		}),
		computed: { ...mapState(["document_width"]) },
		setup() {
			return {
				modules: [Navigation],
			};
		},
	};
</script>

<style lang="scss" scoped>
	.requests-slider {
		&__top {
			display: flex;
			justify-content: space-between;
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
		.swiper-slide {
			width: max-content;
		}
	}

	@media (max-width: 767px) {
		.requests-slider {
			&__top {
				margin-bottom: 4rem;
			}
		}
	}
	@media (max-width: 540px) {
		.requests-slider {
			&__top {
				margin-bottom: 2.4rem;
			}
		}
	}
</style>
