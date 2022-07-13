<template>
	<section class="the-requests">
		<div class="the-requests__container center">
			<requests-slider
				title="Популярные запросы"
				:slides="requests_list"
			></requests-slider>
		</div>
	</section>
</template>

<script>
	import RequestsSlider from "@/components/Home/Requests/RequestsSlider";

	export default {
		name: "TheRequests",
		components: {
			RequestsSlider,
		},
		data: () => ({
			requests_list: [
				{
					id: 1,
					img: "/img/requests/request-img1.jpg",
					resourceName: "mvideo.ru",
					found: 15800,
					time: "15ч 45мин",
				},
				{
					id: 2,
					img: "/img/requests/request-img2.jpg",
					resourceName: "1tv.ru",
					found: 600,
					time: "1ч 45мин",
				},
				{
					id: 3,
					img: "/img/requests/request-img3.jpg",
					resourceName: "drive2.ru",
					found: 15800,
					time: "15ч 45мин",
				},
				{
					id: 4,
					img: "/img/requests/request-img4.jpg",
					resourceName: "avito.ru",
					found: 600,
					time: "1ч 45мин",
				},
				{
					id: 5,
					img: "/img/requests/request-img1.jpg",
					resourceName: "mvideo.ru",
					found: 15800,
					time: "15ч 45мин",
				},
			],
		}),
	};
</script>

<style lang="scss" scoped>
	.the-requests {
		background-color: rgba(25, 126, 202, 0.05);
		background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 1) 8rem,
			rgba(25, 126, 202, 0.05) 8rem
		);
		padding-top: 8.2rem;
		margin-bottom: 2rem;
		&__title {
			margin-bottom: 6rem;
		}
	}

	@media (max-width: 1023px) {
		.the-requests {
			padding-top: 4rem;
		}
	}
	@media (max-width: 540px) {
		.the-requests {
			background: linear-gradient(
				0deg,
				rgb(255, 255, 255) 30%,
				rgba(25, 126, 202, 0.05) 30%
			);
		}
	}
</style>
