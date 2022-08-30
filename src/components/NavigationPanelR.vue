<template>
	<nav
		class="navigation-panel"
		:class="{ 'navigation-panel_minimize': isMenuMinimized }"
	>
		<button
			class="navigation-panel__roll-up"
			:class="{ 'navigation-panel__roll-up_minimize': isMenuMinimized }"
			@click="handleSwitchMenuVisibility"
		>
			<svg
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="navigation-panel__minimize-icon"
				ref="arrow"
			>
				<path
					d="M9.60142 1.53033C9.89431 1.23744 9.89431 0.762563 9.60142 0.46967C9.30853 0.176777 8.83365 0.176777 8.54076 0.46967L9.60142 1.53033ZM5.03555 5.03555L4.50522 5.56588C4.79811 5.85877 5.27298 5.85877 5.56588 5.56588L5.03555 5.03555ZM1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L1.53033 0.46967ZM8.54076 0.46967L4.50522 4.50522L5.56588 5.56588L9.60142 1.53033L8.54076 0.46967ZM5.56588 4.50522L1.53033 0.46967L0.46967 1.53033L4.50522 5.56588L5.56588 4.50522Z"
					fill="#989898"
				/>
			</svg>
		</button>
		<navigation-item-r
			class="navigation-panel__navigation-item"
			v-for="(tab) in tabs"
			:key="tab.id"
			:id="tab.id"
			:text="tab.text"
			:icon="tabIcons[tab.text]"
			:isActive="tab.id === currentTab?.id"
			:isMinimized="isMenuMinimized"
			@setTab="handleSetTab"
		/>
		<slot name="social-media"></slot>
	</nav>
</template>

<script>
	import NavigationItemR from "@/components/NavigationItemR.vue";

	export default {
		name: "NavigationPanelR",
		emits: {
			"navigate-to": null,
			"close-menu": null,
			"open-menu": null,
		},
		props: {
			tabs: { type: Array, required: true },
			tabIcons: { type: Object, required: true },
			currentTab: { type: Object, required: true },
			isMenuMinimized: { type: Boolean, required: true },
		},
		components: {
			NavigationItemR,
		},
		methods: {
			handleSetTab(tabId) {
				console.log(tabId);
				const choosenTab = this.tabs.find((tab) => tab.id === tabId);
				this.$emit("navigate-to", choosenTab);
			},
			handleSwitchMenuVisibility() {
				if (this.isMenuMinimized) {
					this.$emit("open-menu");
				} else {
					this.$emit("close-menu");
				}
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
		margin-top: 83px;
		padding: 1rem 3rem 3rem 3rem;
		background: linear-gradient(
			350.85deg,
			#542f7d -40.69%,
			#338dd0 109.26%
		);
		height: 100%;
		width: 27.5rem;
		transition: all 0.2s ease;
		&_minimize {
			width: 8rem;
			padding: 1rem;
		}

		&__navigation-item {
			margin: 0 0 1.6rem 0;
			&:last-child {
				margin: 0;
			}
		}
		&__roll-up {
			position: absolute;
			right: -1.2rem;
			top: 0;
			background-color: $white;
			display: flex;
			align-items: center;
			justify-content: center;
			align-self: flex-end;
			width: 2.4rem;
			height: 2.4rem;
			min-height: 2.4rem;
			border-radius: 50%;
			box-shadow: $shadow;
			margin-top: 2rem;
			z-index: 1;
			transition: all 0.3s ease;
			transform: rotate(90deg);
			&_minimize {
				transform: rotate(-90deg);
			}
		}
	}
</style>
