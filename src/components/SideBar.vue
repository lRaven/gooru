<template>
	<div class="side-bar" :class="{ 'side-bar_minimize': isSideBarMinimized }">
		<div class="side-bar__controls">
			<button
				class="side-bar__roll-up"
				:class="{
					'side-bar__roll-up_minimize': isSideBarMinimized,
				}"
				@click="handleSwitchBarVisibility"
			>
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="side-bar__arrow-icon"
				>
					<path
						d="M9.60142 1.53033C9.89431 1.23744 9.89431 0.762563 9.60142 0.46967C9.30853 0.176777 8.83365 0.176777 8.54076 0.46967L9.60142 1.53033ZM5.03555 5.03555L4.50522 5.56588C4.79811 5.85877 5.27298 5.85877 5.56588 5.56588L5.03555 5.03555ZM1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L1.53033 0.46967ZM8.54076 0.46967L4.50522 4.50522L5.56588 5.56588L9.60142 1.53033L8.54076 0.46967ZM5.56588 4.50522L1.53033 0.46967L0.46967 1.53033L4.50522 5.56588L5.56588 4.50522Z"
						fill="#989898"
					/>
				</svg>
				<svg
					width="25"
					height="25"
					viewBox="0 0 25 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="side-bar__cross-icon"
				>
					<path
						opacity="0.4"
						d="M23.5431 24.7086L0.233102 1.3986L1.3986 0.233101L24.7086 23.5431L23.5431 24.7086ZM1.10723 25L0 23.8928L23.8928 0L25 1.10723L1.10723 25Z"
						fill="#323232"
					/>
				</svg>
			</button>
			<a class="side-bar__logo" href="/"
				><strong>COMPAS</strong> PARSING</a
			>
		</div>
		<slot></slot>
		<img
			class="side-bar__gooru-image"
			:class="{
				'side-bar__gooru-image_minimize': isSideBarMinimized,
			}"
			src="/img/icon/cabinet/goo.svg"
		/>
	</div>
</template>

<script>
	export default {
		name: "SideBar",
		emits: {
			"close-bar": null,
			"open-bar": null,
		},
		props: {
			isSideBarMinimized: { type: Boolean, required: true },
		},
		methods: {
			handleSwitchBarVisibility() {
				if (this.isSideBarMinimized) {
					this.$emit("open-bar");
				} else {
					this.$emit("close-bar");
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";
	.side-bar {
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
		z-index: 3;

		@media (max-width: 1023px) {
			position: fixed;
			top: 0;
			height: 0;
			right: 0;
			left: 0;
			margin-top: 0;
			padding: 1.5rem;
			width: 100vw;
			height: 100vh;
			overflow-y: auto;
			&::-webkit-scrollbar {
				width: 0;
				height: 0;
			}
		}
		&_minimize {
			width: 8rem;
			padding: 1rem;
			@media (max-width: 1023px) {
				position: absolute;
				transform: translateX(-100vw);
			}
		}
		&__controls {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			margin: 0 0 4rem 0;
			padding: 0 4rem;
			@media (max-width: 768px) {
				padding: 0 3rem;
			}
			@media (max-width: 660px) {
				padding: 0 1.5rem;
			}
			@media (max-width: 560px) {
				padding: 0;
			}
		}
		&__logo {
			visibility: hidden;
			display: inline;
			color: #fff;
			font-size: 1.6rem;
			@media (max-width: 1023px) {
				visibility: visible;
			}
		}
		&__cross-icon {
			display: none;
			path {
				fill: $white;
				opacity: 1;
			}
			@media (max-width: 1023px) {
				display: block;
			}
		}
		&__arrow-icon {
			display: block;
			@media (max-width: 1023px) {
				display: none;
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
			@media (max-width: 1023px) {
				position: static;
				background-color: transparent;
				margin: 0;
			}
		}
		&__gooru-image {
			margin: auto 0 2rem 0;
			transition: all 0.2s ease;
			overflow: hidden;
			&_minimize {
				width: 8rem;
				margin: auto 0 8rem 0;
			}
			@media (max-width: 1023px) {
				display: none;
			}
		}
	}
</style>
