<template>
	<div class="right-panel" ref="filters">
		<button
			type="button"
			class="right-panel__minimize"
			@click="handleMinimize"
		>
			<svg
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="right-panel__minimize-icon"
				ref="arrow"
			>
				<path
					d="M9.60142 1.53033C9.89431 1.23744 9.89431 0.762563 9.60142 0.46967C9.30853 0.176777 8.83365 0.176777 8.54076 0.46967L9.60142 1.53033ZM5.03555 5.03555L4.50522 5.56588C4.79811 5.85877 5.27298 5.85877 5.56588 5.56588L5.03555 5.03555ZM1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L1.53033 0.46967ZM8.54076 0.46967L4.50522 4.50522L5.56588 5.56588L9.60142 1.53033L8.54076 0.46967ZM5.56588 4.50522L1.53033 0.46967L0.46967 1.53033L4.50522 5.56588L5.56588 4.50522Z"
					fill="#989898"
				/>
			</svg>
		</button>

		<div class="right-panel__header">
			<img :src="icon" alt="" class="right-panel__icon" />
			<h5 class="right-panel__title" v-if="isMinimized === false">
				{{ title }}
			</h5>
		</div>

		<div class="right-panel__body" v-show="isMinimized === false">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RightPanel",
		props: {
			icon: {
				value: String,
				default: "/img/icon/cabinet/arrow-double.svg",
			},
			title: {
				value: String,
				default: "Title",
			},
			isMinimized: {
				type: Boolean,
				default: false,
			},
		},
		data: () => ({
			texts: false,
			images: false,
			videos: false,
			products: false,
			description: "",
			file: "",
		}),
		methods: {
			handleMinimize() {
				if (this.isMinimized) {
					this.$emit('open-right-panel');
					this.resetMinimizePanel();
				} else {
					this.$emit('close-right-panel');
					this.minimizePanel();
				}
			},
			minimizePanel() {
				this.$refs.filters.classList.add("minimized");
				this.$refs.arrow.classList.add("minimized");
			},
			resetMinimizePanel() {
				this.$refs.filters.classList.remove("minimized");
				this.$refs.arrow.classList.remove("minimized");
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.right-panel {
		display: flex;
		flex-direction: column;
		background-color: rgba(255, 255, 255, 0.5);
		width: 29rem;
		height: calc(100vh - 8rem);
		padding: 2rem 1.5rem 1.5rem 1.5rem;
		transition: all 0.2s ease;
		&.minimized {
			width: 6.2rem;
		}

		&__minimize {
			position: relative;
			left: -2.7rem;
			background-color: $white;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 2.4rem;
			height: 2.4rem;
			min-height: 2.4rem;
			border-radius: 50%;
			box-shadow: $shadow;
			margin-bottom: 1rem;
			&-icon {
				transition: all 0.2s ease;
				transform: rotate(-90deg);
				&.minimized {
					transform: rotate(90deg);
				}
			}
		}

		&__header {
			display: flex;
			align-items: center;
			gap: 1.2rem;
			margin-bottom: 2.6rem;
		}
		&__icon {
			width: 3.2rem;
		}
		&__title {
			font-weight: 600;
			color: $gray;
		}

		&__body {
			overflow-y: auto;
			overflow-x: hidden;
			height: 100%;

			//*chrome/safari
			&::-webkit-scrollbar {
				width: 0; /* ширина scrollbar */
			}
			//*firefox
			scrollbar-width: 0; /* "auto" или "thin"  */
		}
	}
</style>
