<template>
	<div class="chat-body">
		<transition mode="out-in">
			<r-loader v-if="!isMessagesLoaded" />
		</transition>

		<transition mode="out-in">
			<ul
				class="chat-body__messages"
				ref="message_list"
				v-if="chat_messages.length > 0 && isMessagesLoaded"
			>
				<r-message
					v-for="message in chat_messages"
					:key="message.id"
					:message="message"
				></r-message>
			</ul>
		</transition>

		<transition mode="out-in">
			<p
				class="chat-body__empty"
				v-if="chat_messages.length === 0 && isMessagesLoaded"
			>
				*chat is empty*
			</p>
		</transition>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import rMessage from "@/components/Cabinet/Messenger/r-message.vue";

	export default {
		name: "ChatBody",
		props: {
			ticket_id: Number,
			chat_messages: Array,
			send_message: Boolean,
		},
		components: { rMessage },
		watch: {
			send_message() {
				if (this.send_message) {
					setTimeout(() => {
						this.scrollMessageList();
						console.log("Message send");
					}, 100);
				}
			},
			chat_messages() {
				this.isMessagesLoaded = true;
				if (this.chat_messages.length > 0) {
					this.scrollMessageList();
				}
			},
		},
		computed: {
			...mapState({ user: (state) => state.cabinet.user }),
		},
		data: () => ({
			isMessagesLoaded: false,
		}),
		methods: {
			scrollMessageList() {
				this.$nextTick(() => {
					this.$refs.message_list.scrollTop =
						this.$refs.message_list.scrollHeight;

					this.addSmoothScroll();
				});
			},

			addSmoothScroll() {
				if (!this.$refs.message_list.classList.contains("smooth")) {
					this.$refs.message_list.classList.add("smooth");
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.chat-body {
		position: relative;
		padding: 4rem 4rem 1rem 4rem;
		display: flex;
		justify-content: center;
		height: 100%;
		overflow: hidden;

		&__messages {
			display: flex;
			flex-direction: column;
			gap: 6rem;
			overflow-y: auto;
			overflow-x: hidden;
			padding: 1rem;
			width: 100%;
			scroll-behavior: initial;
			&.smooth {
				scroll-behavior: smooth;
			}
		}

		&__empty {
			margin-top: auto;
			margin-bottom: auto;
		}
	}
</style>
