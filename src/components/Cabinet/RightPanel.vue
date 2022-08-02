<template>
	<div class="right-panel" :class="{ minimized: isMinimized }" ref="filters">
		<button
			type="button"
			class="right-panel__minimize"
			:class="closeIcon === 'arrow' ? 'arrow' : 'cross'"
			@click="handleMinimize"
		>
			<svg
				v-if="closeIcon === 'arrow'"
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="right-panel__minimize-icon"
				:class="{ minimized: isMinimized }"
				ref="arrow"
			>
				<path
					d="M9.60142 1.53033C9.89431 1.23744 9.89431 0.762563 9.60142 0.46967C9.30853 0.176777 8.83365 0.176777 8.54076 0.46967L9.60142 1.53033ZM5.03555 5.03555L4.50522 5.56588C4.79811 5.85877 5.27298 5.85877 5.56588 5.56588L5.03555 5.03555ZM1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L1.53033 0.46967ZM8.54076 0.46967L4.50522 4.50522L5.56588 5.56588L9.60142 1.53033L8.54076 0.46967ZM5.56588 4.50522L1.53033 0.46967L0.46967 1.53033L4.50522 5.56588L5.56588 4.50522Z"
					fill="#989898"
				/>
			</svg>
			<svg
				v-else-if="closeIcon === 'cross'"
				width="25"
				height="25"
				viewBox="0 0 25 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					opacity="0.4"
					d="M23.5431 24.7086L0.233102 1.3986L1.3986 0.233101L24.7086 23.5431L23.5431 24.7086ZM1.10723 25L0 23.8928L23.8928 0L25 1.10723L1.10723 25Z"
					fill="#323232"
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
	import { mapState } from "vuex";
	export default {
		name: "RightPanel",
		props: {
			icon: {
				value: String,
				default: "/img/icon/cabinet/arrow-double.svg",
			},
			closeIcon: {
				value: String,
				default: "arrow",
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
		computed: {
			...mapState({ documentWidth: (state) => state.document_width }),
		},
		methods: {
			handleMinimize() {
				if (this.isMinimized) {
					this.$emit("open-right-panel");
					this.resetMinimizePanel();
				} else {
					this.$emit("close-right-panel");
					this.minimizePanel();
				}
			},
			minimizePanel() {
				this.$refs.filters.classList.add("minimized");
				if (this.$refs.arrow) {
					this.$refs.arrow.classList.add("minimized");
				}
			},
			resetMinimizePanel() {
				this.$refs.filters.classList.remove("minimized");
				if (this.$refs.arrow) {
					this.$refs.arrow.classList.remove("minimized");
				}
				
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
		&.mobile {
			.right-panel__minimize {
				left: -2.7rem;
				&.cross {
					left: 0;
					box-shadow: none;
				}
			}
		}
		@media (max-width: 425px) {
			width: 18rem;
		}
		&.minimized {
			width: 6.2rem;
			@media (max-width: 76.7rem) {
				width: 3.2rem;
				padding: 2rem 0 0 0;
			}
		}
		&.brokedocumentflow {
			z-index: 3;
			position: absolute;
			top: 0;
			right: 0;
			background-color: rgba(255, 255, 255, 1);
			transition: all 0.4s ease;
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
			@media (max-width: 76.7rem) {
				left: -1rem;
				.brokedocumentflow & {
					left: -2.7rem;
				}
			}
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
			@media (max-width: 425px) {
				font-size: 1.8rem;
			}
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
