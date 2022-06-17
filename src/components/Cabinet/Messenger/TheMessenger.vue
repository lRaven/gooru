<template>
	<div class="the-messenger">
		<chat-body :ticket_id="ticket_id"></chat-body>
		<chat-send-message @send_message="send_message"></chat-send-message>
	</div>
</template>

<script>
	import ChatBody from "@/components/Cabinet/Messenger/ChatBody.vue";
	import ChatSendMessage from "@/components/Cabinet/Messenger/ChatSendMessage.vue";
	import { mapState } from "vuex";

	export default {
		name: "TheMessenger",
		props: { ticket_id: Number },
		components: {
			ChatBody,
			ChatSendMessage,
		},
		watch: {
			ticket_id() {
				this.chatSocket = new WebSocket(
					`ws://localhost:8003/ws/chat/${
						this.ticket_id
					}/?Authorization=token ${this.$cookies.get("auth_token")}`
				);
			},
		},
		computed: {
			...mapState(["baseURL"]),
			...mapState({
				user: (state) => state.cabinet.user,
			}),
		},
		data: () => ({
			chatSocket: null,
			messages: [],
		}),
		methods: {
			send_message(message) {
				this.chatSocket.send(
					JSON.stringify({
						message: message,
						sender: this.user.id,
						receiver: null,
					})
				);
				this.message = "";
			},

			recieve_message(message) {
				this.messages.push(message);
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-messenger {
		background-color: $white;
		height: 100%;
		box-shadow: $shadow;
		border-radius: 0.8rem 0.8rem 0 0;
		overflow: hidden;
		display: grid;
		grid-template-rows: 1fr max-content;
	}
</style>
