<template>
	<div class="r-modal">
		<transition mode="out-in">
			<div class="r-modal__content" v-if="isModalContentVisible">
				<div class="r-modal__header">
					<button
						type="button"
						class="r-modal__close"
						@click.stop="this.$emit('close-modal')"
					></button>
				</div>
				<div class="r-modal__body">
					<slot></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: "r-modal",
		props: {},
		data: () => ({ isModalContentVisible: false }),
		mounted() {
			setTimeout(() => {
				this.isModalContentVisible = true;
			}, 200);
		},
	};
</script>

<style lang="scss" scoped>
	.r-modal {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 3;

		&::after {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			background-color: rgba($color: #000, $alpha: 0.5);
		}

		&__content {
			width: min-content;
			max-width: 50vw;
			max-height: 80vh;
			border-radius: 1rem;
			background-color: #fff;
			overflow: hidden;
			z-index: 1;
		}

		&__header {
			display: flex;
			padding: 2rem;
		}

		&__close {
			margin-left: auto;
			height: 2rem;
			width: 2rem;
			background: url(/public/img/icon/popupCross.svg) center / contain
				no-repeat;
		}

		&__body {
		}
	}
</style>
