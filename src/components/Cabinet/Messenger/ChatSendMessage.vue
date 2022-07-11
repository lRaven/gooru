<template>
	<form class="chat-send-message" @submit.prevent="send_message">
		<div class="chat-send-message__content">
			<r-textarea
				placeholder="Написать сообщение..."
				v-model="message"
				:value="message"
				:bordered="false"
				@keydown.enter.prevent.exact="send_message"
				@keydown.ctrl.enter.prevent.exact="new_line"
			></r-textarea>
			<r-button text="Отправить" color="bordered"></r-button>
		</div>
	</form>
</template>

<script>
	export default {
		name: "ChatSendMessage",
		data: () => ({ message: "" }),
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
		},
	};
</script>

<style lang="scss" scoped>
	.chat-send-message {
		padding: 0 4rem 4rem;
		&__content {
			display: flex;
			border: 0.1rem solid rgba(50, 50, 50, 0.1);
			border-radius: 0.6rem;
			gap: 2rem;
		}
		.r-textarea {
			width: 100%;
		}
		.r-button {
			padding: 1.2rem 2.8rem;
			font-size: 1.4rem;
			height: max-content;
			margin-top: auto;
			margin-right: 1rem;
			margin-bottom: 1rem;
		}
	}
</style>
