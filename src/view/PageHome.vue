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
	</main>
</template>

<script>
	import TheHeader from "@/components/Home/TheHeader.vue";
  import TheFreePeriod from "@/components/Home/TheFreePeriod.vue";
	import TheUserPromlems from "@/components/Home/TheUserPromlems.vue";

	export default {
		name: "PageHome",
		components: {
			TheHeader,
      TheFreePeriod,
			TheUserPromlems,
		},
	};
</script>

<style lang="scss" scoped>
	.page-home {
		&__header {
			margin: 0 auto;
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
