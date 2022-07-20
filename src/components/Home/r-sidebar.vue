<template>
	<div class="sidebar" :class="{ minimized: isMinimized }">
		<button @click="handleMinimized">X</button>
    <slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			isMinimized: {
				type: Boolean,
				default: false,
			},
		},
		methods: {
			handleMinimized() {
				this.isMinimized
					? this.$emit("open-sidebar")
					: this.$emit("close-sidebar");
			},
		},
	};
</script>

<style scoped lang="scss">
	.sidebar {
    position: relative;
    display: flex;
    flex-direction: column;
	}
</style>
