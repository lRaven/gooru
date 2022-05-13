<template>
	<div class="page-home theme-container">
		<the-header />
		<main class="main">
			<the-banner />
			<the-benefits />
		</main>
		<!-- <the-footer /> -->
	</div>
</template>

<script>
	import TheHeader from "@/components/TheHeader";

	import TheBanner from "@/components/TheBanner";
	import TheBenefits from "@/components/TheBenefits";

	export default {
		name: "PageHome",
		components: {
			TheHeader,

			TheBanner,
			TheBenefits,
		},
	};
</script>
