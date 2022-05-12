<template>
	<div class="page-home theme-container">
		<the-header />
		<main class="main">
			<the-banner />
		</main>
		<!-- <the-footer /> -->
	</div>
</template>

<script>
	import TheHeader from "@/components/TheHeader";
	import TheBanner from "@/components/TheBanner";

	export default {
		name: "PageHome",
		components: {
			TheHeader,

			TheBanner,
		},
	};
</script>
