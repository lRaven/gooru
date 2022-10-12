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
				<send-message-icon class="chat-send-message__send-icon" />
			</button>
		</div>
	</form>
</template>

<script>
	import SendMessageIcon from "@/assets/icons/Cabinet/Messenger/SendMessageIcon.vue";
	export default {
		name: "ChatSendMessage",
		components: {
			SendMessageIcon,
		},
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
			align-self: flex-start;

		}
		:deep(.icon.chat-send-message__send-icon) {
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
