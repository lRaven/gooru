<template>
	<form class="chat-send-message" @submit.prevent="send_message">
		<div class="chat-send-message__content">
			<r-textarea
				:height="10"
				placeholder="Написать сообщение..."
				v-model="message"
				:bordered="false"
			></r-textarea>
			<r-button text="Отправить" color="bordered"></r-button>
		</div>
	</form>
</template>

<script>
	import rTextarea from "@/components/Cabinet/r-textarea.vue";
	import rButton from "@/components/r-button.vue";

	export default {
		name: "ChatSendMessage",
		data: () => ({ message: "" }),
		components: { rTextarea, rButton },
		methods: {
			send_message() {
				if (this.message.length > 0)
					this.$emit("send_message", this.message);
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
