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
		props: { ticket_id: Number, chat_messages: Array },
		components: { rMessage },

		watch: {
			chat_messages: {
				handler: function () {
					if (this.chat_messages.length > 0) {
						this.scrollMessageList();
					}
				},
				deep: true,
			},
		},
		computed: {
			...mapState({
				user: (state) => state.cabinet.user,
			}),
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
			width: 100%;
		}

		&__empty {
			margin-top: auto;
			margin-bottom: auto;
		}
	}
</style>
