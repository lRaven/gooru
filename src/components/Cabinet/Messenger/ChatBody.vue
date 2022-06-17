<template>
	<div class="chat-body">
		<ul class="chat-body__messages" v-if="chat_messages.length > 0">
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
	import { mapState, mapActions } from "vuex";
	import rMessage from "@/components/Cabinet/Messenger/r-message.vue";

	export default {
		name: "ChatBody",
		props: { ticket_id: Number },
		components: { rMessage },
		watch: {
			ticket_id() {
				this.getChatMessages(this.ticket_id);
			},
		},
		computed: {
			...mapState({
				chat_messages: (state) => state.messenger.chat_messages,
				user: (state) => state.cabinet.user,
			}),
		},
		methods: {
			...mapActions(["getChatMessages", "getManager"]),
		},
	};
</script>

<style lang="scss" scoped>
	.chat-body {
		padding: 4rem;
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
		}

		&__empty {
			margin-top: auto;
			margin-bottom: auto;
		}
	}
</style>
