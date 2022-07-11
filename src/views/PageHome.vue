<template>
	<div class="page-home theme-container">
		<the-header />
		<main class="main">
			<the-banner />
			<the-benefits />
			<the-requests />
			<the-rates />
			<the-how-it-works />
			<the-sample-parser />
			<the-about-company />
		</main>
		<the-footer />
	</div>
</template>

<script>
	import TheHeader from "@/components/TheHeader";

	import TheBanner from "@/components/Home/TheBanner";
	import TheBenefits from "@/components/Home/TheBenefits";
	import TheRequests from "@/components/Home/TheRequests";
	import TheRates from "@/components/Home/TheRates";
	import TheHowItWorks from "@/components/Home/TheHowItWorks";
	import TheSampleParser from "@/components/Home/TheSampleParser";
	import TheAboutCompany from "@/components/Home/TheAboutCompany";

	import TheFooter from "@/components/TheFooter";

	export default {
		name: "PageHome",
		components: {
			TheHeader,

			TheBanner,
			TheBenefits,
			TheRequests,
			TheRates,
			TheHowItWorks,
			TheSampleParser,
			TheAboutCompany,

			TheFooter,
		},
	};
</script>
