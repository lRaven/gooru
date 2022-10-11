<template>
	<div
		class="appeals-card"
		:class="{
			manager: user.role !== 'DefaultUser',
			has_notifications: unreadMessagesCounter,
		}"
		@click="handleOpenAppeal"
	>
		<template v-if="document_width > 1300">
			<div class="appeals-card__col" v-if="appeal.parser">
				<p class="appeals-card__source">
					{{
						user.role !== "DefaultUser"
							? `${appeal.user.first_name}
						${appeal.user.last_name.length > 0 ? `${appeal.user.last_name[0]}.` : ""}`
							: source
					}}
				</p>
			</div>

			<router-link
				:to="{ name: 'user', params: { id: appeal.user.id } }"
				class="appeals-card__user"
				:title="appeal.user.username"
				v-if="user.role !== 'DefaultUser'"
			>
				<img
					:src="appeal.user.avatar"
					class="appeals-card__user-avatar"
					alt="user avatar"
				/>
				<p class="appeals-card__user-name">
					{{ appeal.user.username }}
				</p>
			</router-link>

			<div class="appeals-card__topic" :title="topic">
				{{ topic }}
			</div>
			<div class="appeals-card__message-info">
				<p
					class="appeals-card__message"
					:title="lastChatMessage || appeal.message"
				>
					{{ lastChatMessage || appeal.message }}
				</p>
				<span
					class="appeals-card__last-message-time"
					:title="lastMessageTime || appeal.message"
				>
					{{ lastMessageTime }}
				</span>
				<span
					class="appeals-card__unread-messages-counter"
					v-if="unreadMessagesCounter"
					>{{ unreadMessagesCounter }}</span
				>
			</div>
		</template>

		<template v-else>
			<div class="appeals-card__row">
				<p class="appeals-card__source" v-if="appeal.parser">
					{{
						user.role !== "DefaultUser"
							? `${appeal.user.first_name}
						${appeal.user.last_name.length > 0 ? `${appeal.user.last_name[0]}.` : ""}`
							: source
					}}
				</p>
				<div class="appeals-card__col">
					<div class="appeals-card__topic" :title="topic">
						{{ topic }}
					</div>
				</div>
			</div>
			<div class="appeals-card__message-info">
				<p
					class="appeals-card__message"
					:title="lastChatMessage || appeal.message"
				>
					{{ lastChatMessage || appeal.message }}
				</p>
				<span
					class="appeals-card__last-message-time"
					:title="lastMessageTime || appeal.message"
				>
					{{ lastMessageTime }}
				</span>
				<span
					class="appeals-card__unread-messages-counter"
					v-if="unreadMessagesCounter"
					>{{ unreadMessagesCounter }}</span
				>
			</div>
		</template>
	</div>
</template>

<script>
	import { prettyDate } from "@/js/processStrings";
	import { mapState } from "vuex";

	export default {
		name: "AppealsCard",
		props: {
			appeal: Object,

			topics: Array,
			parsers: Array,
			messages: Array,
			notifications: {
				default: [],
			},
		},
		computed: {
			...mapState({
				user: (state) => state.cabinet.user,
				document_width: (state) => state.document_width,
			}),

			source() {
				let result = "";
				const find = this.parsers.find(
					(el) => el.id === this.appeal.parser
				);
				if (find !== undefined) {
					result = find.title;
				}

				return result ? result : `Парсер ${this.appeal.parser}`;
			},
			topic() {
				let result = "";

				const find = this.topics.find(
					(el) => el.id === this.appeal.topic_type
				);
				if (find !== undefined) {
					result = find.description;
				}

				return result;
			},
			lastChatMessage() {
				const messagesCount = this.appeal.messages.length;
				if (messagesCount) {
					return this.appeal.messages[messagesCount - 1].text;
				}
				return "";
			},

			lastMessageTime() {
				const messagesCount = this.appeal.messages.length;
				if (messagesCount) {
					const [date, timeStringUTC] =
						this.appeal.messages[
							messagesCount - 1
						].created_at.split("T");
					const [, , messageDay] = date.split("-");
					const [hour, minutes] = timeStringUTC.split(":");
					const today = new Date().getDate();
					if (today > Number(messageDay)) {
						return `${prettyDate(date)} ${hour}:${minutes}`;
					}
					return `${hour}:${minutes}`;
				}
				return "";
			},
			unreadMessagesCounter() {
				const messagesCount = this.appeal.messages.length;
				if (messagesCount) {
					const newMessageCount = this.notifications.reduce(
						(previosCount, currentNotification) => {
							const isItNewMessageNotification =
								currentNotification.message
									.toLowerCase()
									.includes("вам пришло новое сообщение");
							return isItNewMessageNotification
								? previosCount + 1
								: previosCount;
						},
						0
					);
					return newMessageCount;
				} else {
					return "!";
				}
			},
		},
		methods: {
			handleOpenAppeal() {
				this.$router.push({
					name: "appeal",
					query: { appeal_id: this.appeal.id },
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.appeals-card {
		display: grid;
		grid-template-columns: repeat(2, minmax(auto, max-content)) 1fr;
		align-items: center;
		justify-content: space-between;
		gap: 3rem;
		padding: 2rem 3rem;
		background-color: $white;
		transition: all 0.2s ease;
		border-radius: 0 0 0.6rem 0.6rem;
		cursor: pointer;

		&:first-child {
			border-radius: 0.6rem 0.6rem 0 0;
		}
		&:last-child {
			border-radius: 0 0 0.6rem 0.6rem;
		}

		&.has_notifications {
			box-shadow: $shadow;
			.appeals-card {
				&__id,
				&__source,
				&__user-name,
				&__message,
				&__date {
					font-weight: 600;
				}
			}
		}

		&.manager {
			@media (min-width: 1300px) {
				grid-template-columns:
					max-content repeat(2, minmax(auto, max-content))
					1fr;
			}
			@media (max-width: 450px) {
				.appeals-card__row {
					display: grid;
				}
			}
		}

		@media (max-width: 1300px) {
			grid-template-columns: 1fr;
			justify-content: flex-start;
			align-items: flex-start;
			gap: 2rem;
		}
		@media (max-width: 767px) {
			padding: 1rem;
		}

		+ .appeals-card:not(.has_notifications) {
			border-top: 0.1rem solid rgba($black, 0.5);
		}

		&__col {
			display: flex;
			align-items: center;
			gap: 1rem;
			overflow: hidden;

			@media (max-width: 1300px) {
				&:first-child {
					display: grid;
					grid-template-columns: max-content 1fr;
				}
			}
		}

		&__row {
			width: 100%;
			display: flex;
			align-items: center;
			gap: 2rem;
			justify-content: space-between;
			overflow: hidden;

			@media (max-width: 400px) {
				display: grid;
				gap: 1rem;
			}
		}

		&__id {
			font-size: 1.4rem;
			color: rgba($black, 0.7);
		}

		&__source {
			font-size: 1.8rem;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		&__counter {
			color: rgba($black, 0.5);
			font-weight: 300;
			font-size: 1.4rem;
		}

		&__user {
			display: flex;
			align-items: center;
			gap: 2rem;
			&-avatar {
				width: 4rem;
				height: 4rem;
				border-radius: 50%;
				object-fit: contain;
			}
			&-name {
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				font-size: 1.4rem;
				color: $black;
			}
		}

		&__topic {
			text-align: center;
			padding: 0.6rem 2.4rem;
			background-color: rgba(152, 152, 152, 0.15);
			border-radius: 4rem;
			font-size: 1.4rem;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			display: block;
			font-weight: 600;
			@media (max-width: 400px) {
				font-size: 1.2rem;
				padding: 0.6rem 1.5rem;
			}
		}
		&__message-info {
			display: grid;
			grid-template-columns: 1fr minmax(auto, max-content) minmax(
					3rem,
					max-content
				);
			align-items: center;
			grid-gap: 0 2rem;

			@media (max-width: 768px) {
				grid-template-columns: 1fr minmax(3rem, max-content);
				grid-gap: 1rem 0;
			}
		}

		&__message {
			display: -webkit-box;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			font-size: 1.4rem;
			font-weight: 400;
			line-height: 1.2;
			max-width: 100%;
			@media (max-width: 1300px) {
				grid-row: 1/3;
				align-self: center;
				max-width: 80%;
			}
		}
		&__last-message-time {
			font-size: 1.5rem;
			font-weight: 300;
			line-height: 1.2;
			@media (max-width: 768px) {
				justify-self: end;
				font-size: 1.4rem;
			}
		}
		&__unread-messages-counter {
			font-size: 1.6rem;
			font-weight: 600;
			min-width: 3rem;
			justify-self: end;
			text-align: center;
			padding: 0.8rem 0.5rem;
			color: $white;
			background-color: $primary;
			border-radius: 50%;
		}

		.r-button {
			width: fit-content;
			justify-self: end;
			padding: 1rem 2rem !important;
			font-size: 1.4rem;
			@media (max-width: 768px) {
				display: none;
			}
		}
	}
</style>
