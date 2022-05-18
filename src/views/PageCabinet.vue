<template>
	<div class="page-cabinet theme-container">
		<the-header />
		<main class="main"><p>content</p></main>
	</div>
</template>

<script>
	import TheHeader from "@/components/Cabinet/TheHeader";

	export default {
		name: "PageCabinet",
		components: {
			TheHeader,
		},
	};
</script>

<style lang="scss" scoped>
	.main {
		padding-top: 13rem;
		background-color: #f1f7ff;
	}
</style>
