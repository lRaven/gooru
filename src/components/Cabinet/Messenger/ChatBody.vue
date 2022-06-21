<template>
	<div class="chat-body">
		<ul
			class="chat-body__messages"
			ref="message_list"
			v-if="chat_messages.length > 0"
		>
			<r-message
				v-for="message in chat_messages"
				:key="message.id"
				:message="message"
			></r-message>
		</ul>
		<p class="chat-body__empty" v-else>*chat is empty*</p>
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
		},
		computed: {
			...mapState({ user: (state) => state.cabinet.user }),
		},
		methods: {
			scrollMessageList() {
				this.$nextTick(() => {
					this.$refs.message_list.scrollTop =
						this.$refs.message_list.scrollHeight;
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.chat-body {
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
			padding: 1rem;
			width: 100%;
		}

		&__empty {
			margin-top: auto;
			margin-bottom: auto;
		}
	}
</style>
