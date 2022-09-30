<template>
	<div class="sidebar" :class="{ sidebar_minimize: isSideBarMinimized }">
		<div class="sidebar__controls">
			<button class="sidebar__close-button" @click="handleMinimizeBar">
				<close-icon class="sidebar__close-icon" />
			</button>
		</div>
		<slot></slot>
	</div>
</template>

<script>
	import CloseIcon from "@/assets/icons/CloseIcon.vue";
	export default {
		name: "SideBar",
		emits: {
			"close-sidebar": null,
		},
		props: {
			isSideBarMinimized: { type: Boolean, required: true },
		},
		components: {
			CloseIcon,
		},
		methods: {
			handleMinimizeBar() {
				this.$emit("close-sidebar");
			},
		},
	};
</script>

<style lang="scss" scoped>
	.sidebar {
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		left: 0;
		margin-top: 0;
		padding: 1.5rem 0;
		width: 100vw;
		height: 100vh;
		overflow-y: auto;
		z-index: 3;
		background-color: $black;
		transition: all 0.3s ease;
		&::-webkit-scrollbar {
			width: 0;
			height: 0;
		}
		&_minimize {
			position: absolute;
			visibility: hidden;
			transform: translateX(201vw);
		}
		&__controls {
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
		&__close-button {
			background-color: transparent;
		}
		:deep(.icon.sidebar__close-icon) {
			path {
				fill: $white;
				opacity: 0.8;
			}
			&:hover {
				path {
					fill: $white;
					opacity: 1;
				}
			}
		}
	}
</style>
