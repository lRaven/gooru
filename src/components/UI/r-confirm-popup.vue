<template>
	<div class="r-confirm-popup">
		<transition mode="out-in">
			<div class="r-confirm-popup__body" v-if="isPopupBodyVisible">
				<h4 class="r-confirm-popup__text">{{ text }}</h4>

				<r-button
					text="Подтвердить"
					@click="this.$emit('action_confirm')"
				></r-button>
				<r-button
					color="white"
					text="Отмена"
					@click.stop="this.$emit('close_popup')"
				></r-button>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: "rConfirmPopup",
		props: {
			text: {
				value: String,
				default: "Action confirmation",
			},
		},
		data: () => ({ isPopupBodyVisible: false }),
		mounted() {
			setTimeout(() => {
				this.isPopupBodyVisible = true;
			}, 200);
		},
	};
</script>

<style lang="scss" scoped>
	.r-confirm-popup {
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

		&__body {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 5rem 2rem;
			width: 500px;
			padding: 2rem;
			background-color: #fff;
			z-index: 1;
			border-radius: 1rem;
		}

		&__text {
			grid-column: 1/3;
			text-align: center;
		}
	}
</style>
