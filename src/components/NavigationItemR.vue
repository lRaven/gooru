<template>
	<div
		class="navigation-item"
		:class="{
			'navigation-item_active': isActive,
			'navigation-item_minimize': isMinimized,
		}"
		@click="handleClick"
	>
		<component
			:is="icon"
			class="navigation-item__icon"
			:class="{
				'navigation-item__icon_active': isActive,
				'navigation-item__icon_minimize': isMinimized,
			}"
		/>
		<p v-if="!isMinimized" class="navigation-item__text">{{ text }}</p>
		<span
			v-if="notificationCount"
			class="navigation-item__notification-counter"
			>{{ notificationCount }}</span
		>
	</div>
</template>

<script>
	export default {
		name: "NavigationItemR",
		emits: {
			setTab: null,
		},
		props: {
			id: { type: Number, required: true },
			name: { type: String, required: true, },
			text: { type: String, required: true },
			icon: { type: Object, required: true },
			notificationCount: { type: Number, default: 0 },
			isMinimized: { type: Boolean, required: true },
			isActive: { type: Boolean, required: true },
		},
		inject: ['handleClick'],
		/* methods: {
			handleClick() {
				this.$emit("setTab", this.id);
			},
		}, */
	created() {
		console.log(this.name)
	}
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";
	.navigation-item {
		display: flex;
		align-items: center;
		width: 100%;
		position: relative;
		user-select: none;
		border-radius: 5rem;
		padding: 0.8rem 1.4rem 0.8rem 4rem;
		transition: all 0.2s ease;

		@media (max-width: 450px) {
			padding: 0.8rem 1rem 0.8rem 1rem;
		}

		&_active {
			background-color: rgba(255, 255, 255, 0.3);
		}
		&_minimize {
			width: fit-content;
			padding: 1rem;
			border-radius: 50%;
		}
		&:hover {
			cursor: pointer;
			background-color: rgba(255, 255, 255, 0.3);
			path {
				fill-opacity: 1;
			}
		}

		&__text {
			font-weight: 600;
			color: $white;
		}
		:deep(.icon.navigation-item__icon) {
			margin: 0 1.5rem 0 0;
			path {
				fill-opacity: 0.5;
			}
		}
		:deep(.icon.navigation-item__icon_active) {
			path {
				fill-opacity: 1;
			}
		}
		:deep(.icon.navigation-item__icon_minimize) {
			margin: 0;
		}
		
		&__notification-counter {
			font-size: 1.4rem;
			font-weight: 600;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: -30px;
			top: 50%;
			transform: translateY(-50%);
			background-color: $red;
			color: $white;
			padding: 1.1rem;
			border-radius: 50%;
		}
	}
</style>
