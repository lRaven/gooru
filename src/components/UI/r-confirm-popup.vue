<template>
	<div class="r-confirm-popup">
		<transition mode="out-in">
			<div class="r-confirm-popup__body" v-if="isPopupBodyVisible">
				<h4 class="r-confirm-popup__text">{{ text }}</h4>
				<slot :handleClosePopup="close" :handleConfirm="confirm"></slot>
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
		methods: {
			close() {
				this.$emit('close_popup')
			},
			confirm() {
				this.$emit('action_confirm');
			}
		},
		mounted() {
			setTimeout(() => {
				this.isPopupBodyVisible = true;
			}, 200);
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

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
			background-color: rgba(#000, 0.8);
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
			@media (max-width: 450px) {
				width: 90%;
			}
		}

		&__text {
			grid-column: 1/3;
			text-align: center;
			@media (max-width: 450px) {
				font-size: 1.8rem;
			}
		}
	}
</style>
