<template>
	<div class="the-messenger">
		<h4 class="the-messenger__title" v-if="title">{{ title }}</h4>
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
	import { mapState, mapGetters, mapMutations } from "vuex";

	export default {
		name: "TheMessenger",
		props: { ticket_id: Number, title: String, messages: Array },
		components: {
			ChatBody,
			ChatSendMessage,
		},
		watch: {
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
					this.get_message();
				}
			},
		},
		computed: {
			...mapGetters(["BASEURL_WITHOUT_PROTOCOL"]),
			...mapState({
				user: (state) => state.cabinet.user,
			}),
		},
		data() {
			return {
				chatSocket: null,
				path: this.$route.path,
		
				isSendMessage: false,
			};
		},
		methods: {
			...mapMutations(["SET_APPEALS_MESSAGES"]),
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
					`${process.env.VUE_APP_BACK_WS_PROTOCOL}://${base_url}/ws/chat/${chat_id}/?Authorization=token ${token}`
				);

			},

			get_message() {
				this.chatSocket.addEventListener("message", (m) => {
					const message = JSON.parse(m.data);

					if (message.sender.id === this.user.id) {
						this.isSendMessage = true;
					}
					console.log('get', message)
					this.SET_APPEALS_MESSAGES({ currentAppeal: +this.$route.query.appeal_id, messages: [...this.messages, message] }); 
				});
			},

			remove_get_message() {
				console.log('chat remove')
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

			this.get_message();
		},
		beforeUnmount() {
			console.log('unmount')
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
		grid-template-rows: max-content 1fr max-content;
		&__title {
			text-align: center;
			padding: 1rem 0;
			border-bottom: 0.1rem solid $light-gray;
		}
	}
</style>
