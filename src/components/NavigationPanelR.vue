<template>
	<nav class="navigation-panel">
		<navigation-item-r
      class="navigation-panel__navigation-item"
			v-for="(tab, currentTabIndex) in tabs"
			:key="tab.id"
      :id="tab.id"
      :text="tab.text"
			:icon="tabIcons[currentTabIndex]"
      :notificationCount="3"
			:isActive="tab.id === currentTab?.id"
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
			tabIcons: { type: Array, required: true },
			currentTab: { type: Object, required: true, },
		},
		components: {
			NavigationItemR,
		},
		/* data() {
			return {
				currentTab: this.initialTab,
			};
		}, */
		methods: {
			handleSetTab(tabId) {
				console.log(tabId);
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
		margin-top: 83px;
		padding: 1rem 4rem 3rem 4rem;
		background: linear-gradient(
			350.85deg,
			#542f7d -40.69%,
			#338dd0 109.26%
		);
		height: 100vh;
		width: 27.5rem;
		transition: all 0.2s ease;
		
    &__navigation-item {
      margin: 0 0 1.6rem 0;
      &:last-child {
        margin: 0;
      }
    }
	}
</style>
