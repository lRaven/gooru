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
			<!--<the-about-company />-->
		</main>
		<!-- <the-footer /> -->
	</div>
</template>

<script>
	import TheHeader from "@/components/TheHeader";

	import TheBanner from "@/components/TheBanner";
	import TheBenefits from "@/components/TheBenefits";
	import TheRequests from "@/components/TheRequests";
	import TheRates from "@/components/TheRates";
	import TheHowItWorks from "@/components/TheHowItWorks";
	import TheSampleParser from "@/components/TheSampleParser";
	// import TheAboutCompany from "@/components/TheAboutCompany";

	// import TheFooter from "@/components/TheFooter";

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
			// TheAboutCompany,

			// TheFooter,
		},
	};
</script>
