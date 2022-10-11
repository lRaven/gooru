<template>
	<form class="chat-send-message" @submit.prevent="send_message">
		<div
			class="chat-send-message__content"
			:class="{ 'chat-send-message__content_focus': isTextFieldInFocus }"
		>
			<r-textarea
				placeholder="Написать сообщение..."
				v-model="message"
				:bordered="false"
				@focus="handleFocus"
				@blur="handleBlur"
				@keydown.enter.prevent.exact="send_message"
				@keydown.ctrl.enter.prevent.exact="new_line"
			></r-textarea>
			<!-- <r-button text="Отправить" color="bordered"></r-button> -->
			<button class="chat-send-message__send-button">
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 0C10.3788 0 10.725 0.214002 10.8944 0.552786L19.8944 18.5528C20.067 18.8978 20.0256 19.3113 19.7882 19.6154C19.5508 19.9195 19.1597 20.0599 18.7831 19.9762L10 18.0244L1.21694 19.9762C0.840351 20.0599 0.449212 19.9195 0.211802 19.6154C-0.0256073 19.3113 -0.0669427 18.8978 0.10558 18.5528L9.10558 0.552786C9.27497 0.214002 9.62124 0 10 0ZM11 16.1978L17.166 17.568L11 5.23607V16.1978ZM9.00001 5.23607L2.83402 17.568L9.00001 16.1978V5.23607Z"
						fill="#0D0D0D"
					/>
				</svg>
			</button>
		</div>
	</form>
</template>

<script>
	export default {
		name: "ChatSendMessage",
		data: () => ({ message: "", isTextFieldInFocus: false }),
		methods: {
			//* отправить сообщение
			send_message() {
				this.message = this.message.trim();

				if (this.message.length > 0) {
					this.$emit("send_message", this.message);
					this.message = "";
				}
			},

			//* перенос строки
			new_line(event) {
				const caret = event.target.selectionStart;
				event.target.setRangeText("\n", caret, caret, "end");
				this.message = event.target.value;
			},
			handleFocus() {
				this.isTextFieldInFocus = true;
			},
			handleBlur() {
				this.isTextFieldInFocus = false;
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.chat-send-message {
		padding: 0 4rem 4rem;
		@media (max-width: 767px) {
			padding: 0 1.5rem 1.5rem 1.5rem;
		}
		&__content {
			display: flex;
			padding: 1rem;
			border: 0.1rem solid rgba(50, 50, 50, 0.1);
			border-radius: 0.6rem;
			gap: 1rem;
			@media (max-width: 450px) {
				padding: 0.5rem;
			}
			&_focus {
				border: 0.1rem solid rgba($primary, 1);
			}
		}
		&__send-button {
			width: fit-content;
			height: fit-content;
			background-color: transparent;
			border: none;
			transform: rotate(90deg);
			align-self: flex-end;
			path {
				fill: $light-gray;
				fill-opacity: 1;
			}
		}
		.r-textarea {
			padding: 0;
			width: 100%;
			@media (max-width: 767px) {
				max-height: 8rem;
			}
			@media (max-width: 450px) {
				max-height: 5rem;
			}
			&::-webkit-scrollbar {
				width: 0;
				height: 0;
			}
			&:focus {
				border: none;
			}
			&:hover {
				border: none;
			}
		}
		.r-button {
			padding: 1.2rem 2.8rem;
			font-size: 1.4rem;
			height: max-content;
			margin-top: auto;
			margin-right: 1rem;
			margin-bottom: 1rem;
			@media (max-width: 450px) {
				width: 100%;
			}
		}
	}
</style>
