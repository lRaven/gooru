<template>
	<div class="sidebar" :class="{ 'sidebar_minimize': isSideBarMinimized }">
    <div class="sidebar__controls">
      <button class="sidebar__close-button" @click="handleMinimizeBar">Х</button>
    </div>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: "SideBar",
    emits: {
      'close-sidebar': null,
    },
		props: {
			isSideBarMinimized: { type: Boolean, required: true },
		},
    methods: {
      handleMinimizeBar() {
        this.$emit('close-sidebar');
      }
    }
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
		&::-webkit-scrollbar {
			width: 0;
			height: 0;
		}
		&_minimize {
			position: absolute;
			transform: translateX(-100vw);
		}
	}
</style>
