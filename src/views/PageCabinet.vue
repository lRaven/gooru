<template>
	<div class="page-cabinet theme-container">
		<the-header />
		<navigation-panel />

		<main class="page-cabinet__main main">
			<transition name="fade-left" mode="out-in">
				<the-parsers v-if="tab === 'parsers'"></the-parsers>
			</transition>
		</main>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	import TheHeader from "@/components/Cabinet/TheHeader";

	import NavigationPanel from "@/components/Cabinet/NavigationPanel";
	import TheParsers from "@/components/Cabinet/TheParsers";

	export default {
		name: "PageCabinet",
		components: {
			TheHeader,

			NavigationPanel,
			TheParsers,
		},
		computed: {
			...mapState({
				tab: (state) => state.navigation_panel.tab,
			}),
		},
	};
</script>

<style lang="scss" scoped>
	.page-cabinet {
		display: grid;
		grid-template-columns: 27.5rem 1fr;
		&__main {
			padding: 12rem 4rem 4rem 4rem;
		}
	}
</style>
