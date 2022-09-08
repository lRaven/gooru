<template>
	<nav
		class="navigation-panel"
		:class="{ 'navigation-panel_minimize': isMenuMinimized }"
	>
		<navigation-item-r
			class="navigation-panel__navigation-item"
			v-for="tab in tabs"
			:key="tab.id"
			:id="tab.id"
			:text="tab.text"
			:icon="tabIcons[tab.text]"
			:isActive="tab.id === currentTab?.id"
			:isMinimized="isMenuMinimized"
			@setTab="handleSetTab"
		/>
	</nav>
</template>

<script>
	import NavigationItemR from "@/components/NavigationItemR.vue";

	export default {
		name: "NavigationPanelR",
		emits: {
			"navigate-to": null,
		},
		props: {
			tabs: { type: Array, required: true },
			tabIcons: { type: [Object], required: true },
			currentTab: { type: Object, required: true },
			isMenuMinimized: { type: Boolean, required: true },
		},
		components: {
			NavigationItemR,
		},
		methods: {
			handleSetTab(tabId) {
				const choosenTab = this.tabs.find((tab) => tab.id === tabId);
				this.$emit("navigate-to", choosenTab);
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";
	.navigation-panel {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		padding: 1rem 0;
		width: 100%;
		transition: all 0.2s ease;
		&_minimize {
			width: 8rem;
			padding: 1rem;
			@media (max-width: 1023px) {
				position: absolute;
				transform: translateX(-20rem);
			}
		}
		&__navigation-item {
			margin: 0 0 1.6rem 0;
			&:last-child {
				margin: 0;
			}
		}
	}
</style>
