<template>
	<the-header class="page-home__header" />
	<main class="page-home__main">
		<section class="acquaintance">
			<h1 class="acquaintance__title">
				Compas gooru- парсер для фрилансеров
			</h1>
		</section>
    <the-free-period />
		<the-user-promlems />
		<the-user-solutions />
		<img class="page-home__laptop-img" src="@/../public/LapTopPic.svg" alt="картинка ноутбука"/>
		<the-subscribe-invite class="page-home__subscribe-invite"/>
	</main>
</template>

<script>
	import TheHeader from "@/components/Home/TheHeader.vue";
  import TheFreePeriod from "@/components/Home/TheFreePeriod.vue";
	import TheUserPromlems from "@/components/Home/TheUserPromlems.vue";
	import TheUserSolutions from "@/components/Home/TheUserSolutions.vue";
	import TheSubscribeInvite from "@/components/Home/TheSubscribeInvite.vue";

	export default {
		name: "PageHome",
		components: {
			TheHeader,
      TheFreePeriod,
			TheUserPromlems,
			TheUserSolutions,
			TheSubscribeInvite,
		},
	};
</script>

<style lang="scss" scoped>
	.page-home {
		&__header {
			margin: 0 auto;
		}
		&__main {
			position: relative;
		}
		&__laptop-img {
			max-width: 1920px;
			width: 100%;
			background: linear-gradient(to bottom, $white 89%, $black 11%);
		}
	}
	.acquaintance {
    display: flex;
    padding: 0 10rem;
    background:  no-repeat 90% 10%/59% url("@/../public/background-gif.svg");
    height: 81.7rem;
		&__title {
			font-size: 12.8rem;
      font-weight: 900;
			line-height: 14.1rem;
      text-transform: uppercase;
      margin: 17.8rem 0 0 0;
      width: 65%;
		}
	}
</style>
