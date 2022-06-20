<template>
	<div class="the-messenger">
		<chat-body :ticket_id="ticket_id" :chat_messages="messages"></chat-body>
		<chat-send-message @send_message="send_message"></chat-send-message>
	</div>
</template>

<script>
	import ChatBody from "@/components/Cabinet/Messenger/ChatBody.vue";
	import ChatSendMessage from "@/components/Cabinet/Messenger/ChatSendMessage.vue";
	import { mapState, mapActions } from "vuex";

	export default {
		name: "TheMessenger",
		props: { ticket_id: Number },
		components: {
			ChatBody,
			ChatSendMessage,
		},
		watch: {
			chat_messages() {
				this.messages = this.chat_messages;
			},
		},
		computed: {
			...mapState(["baseURL"]),
			...mapState({
				user: (state) => state.cabinet.user,
				chat_messages: (state) => state.messenger.chat_messages,
			}),
		},
		data() {
			return {
				chatSocket: new WebSocket(
					`ws://localhost:8003/ws/chat/${+this.$route.query
						.appeal_id}/?Authorization=token ${this.$cookies.get(
						"auth_token"
					)}`
				),
				messages: [],
			};
		},
		methods: {
			...mapActions(["getChatMessages"]),

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
		},
		created() {
			this.getChatMessages(+this.$route.query.appeal_id);

			this.chatSocket.addEventListener("message", (m) => {
				// console.log(JSON.parse(m.data));
				this.messages.push(JSON.parse(m.data));
			});
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
