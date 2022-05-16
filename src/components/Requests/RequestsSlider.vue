<template>
	<div class="requests-slider">
		<div class="requests-slider__top">
			<h2 class="requests-slider__title">{{ title }}</h2>
			<div class="requests-slider__nav">
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
			slidesPerView="4"
			:space-between="30"
			:navigation="{
				nextEl: '.requests-slider-button-next',
				prevEl: '.requests-slider-button-prev',
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
	</div>
</template>

<script>
	import { Swiper, SwiperSlide } from "swiper/vue";
	import { Navigation } from "swiper";

	import "swiper/css";
	import "swiper/css/navigation";

	import RequestCard from "@/components/Requests/RequestCard";

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
		&__title {
		}
		&__nav {
			display: flex;
			align-items: center;
			gap: 3rem;
		}

		.swiper {
			overflow: visible;
			&-button {
				&-disabled {
					opacity: 1;
					&::after {
						opacity: 0.5;
					}
				}
				&-prev,
				&-next {
					position: static;
					margin: 0;
					width: 4.6rem;
					height: 4.6rem;
					border: 0.1rem solid #e3e3e3;
					border-radius: 1rem;
					background-color: var(--white);
					z-index: 1;
					&::after {
						font-size: 1.6rem;
						color: var(--primary);
						font-weight: 600;
					}
				}
			}
			&-slide {
				padding: 1rem 0;
			}
		}
	}
</style>
