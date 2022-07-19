<template>
	<div class="the-messenger">
		<chat-body
			:ticket_id="ticket_id"
			:chat_messages="messages"
			:send_message="isSendMessage"
		></chat-body>
		<chat-send-message @send_message="send_message"></chat-send-message>
	</div>
</template>

<script>
	import ChatBody from "@/components/Cabinet/Messenger/ChatBody.vue";
	import ChatSendMessage from "@/components/Cabinet/Messenger/ChatSendMessage.vue";
	import { mapState, mapGetters, mapActions } from "vuex";

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
			isSendMessage() {
				if (this.isSendMessage === true) {
					setTimeout(() => {
						this.isSendMessage = false;
					}, 100);
				}
			},
			"$route.query.appeal_id"() {
				if (this.$route.path === this.path) {
					this.remove_get_message();
					this.chatSocket.close();

					this.createWebSocket(
						this.BASEURL_WITHOUT_PROTOCOL,
						this.$route.query.appeal_id,
						this.$cookies.get("auth_token")
					);
					this.getChatMessages(this.$route.query.appeal_id);
					this.get_message();
				}
			},
		},
		computed: {
			...mapGetters(["BASEURL_WITHOUT_PROTOCOL"]),
			...mapState({
				user: (state) => state.cabinet.user,
				chat_messages: (state) => state.messenger.chat_messages,
			}),
		},
		data() {
			return {
				chatSocket: null,
				path: this.$route.path,

				messages: [],
				isSendMessage: false,
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

			createWebSocket(base_url, chat_id, token) {
				this.chatSocket = new WebSocket(
					`ws://${base_url}/ws/chat/${chat_id}/?Authorization=token ${token}`
				);
			},

			get_message() {
				this.chatSocket.addEventListener("message", (m) => {
					const message = JSON.parse(m.data);

					if (message.sender.id === this.user.id) {
						this.isSendMessage = true;
					}

					this.messages.push(JSON.parse(m.data));
				});
			},

			remove_get_message() {
				this.chatSocket.removeEventListener(
					"message",
					this.get_message
				);
			},
		},
		created() {
			this.createWebSocket(
				this.BASEURL_WITHOUT_PROTOCOL,
				this.$route.query.appeal_id,
				this.$cookies.get("auth_token")
			);
			this.getChatMessages(this.$route.query.appeal_id);

			this.get_message();
		},
		beforeUnmount() {
			this.remove_get_message();
			this.chatSocket.close();
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
