<template>
	<li class="r-message" :class="isMyMessage ? 'my' : 'interlocutor'">
		<div class="r-message__body">
			<p class="r-message__text">{{ message.text }}</p>
		</div>
		<div class="r-message__user">
			<img
				:src="message.sender.avatar"
				alt="avatar"
				class="r-message__avatar"
			/>

			<p class="r-message__username">
				{{
					isMyMessage
						? "Вы"
						: isMessageFromManager
						? `Менеджер ${message.sender.first_name}`
						: isMessageFromAdmin
						? `Администратор ${message.sender.first_name}`
						: `${message.sender.first_name} ${message.sender.last_name}`
				}}
			</p>

			<p class="r-message__date">{{ message_date }}</p>
		</div>
	</li>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "rMessage",
		props: { message: Object },
		computed: {
			...mapState({ user: (state) => state.cabinet.user }),

			//* громоздкий кусок кода для преобразования даты в читабельный формат типа: 01.01.1970 00:00
			message_date() {
				let result;

				const date = new Date(this.message.created_at);
				const day = date.getDate();
				const month = date.getMonth() + 1;
				const year = date.getFullYear();
				const hours = date.getHours();
				const minutes = date.getMinutes();

				result = `
				${day < 10 ? "0" + day : "" + day}.${month < 10 ? "0" + month : "" + month}.${
					year < 10 ? "0" + year : "" + year
				} ${hours < 10 ? "0" + hours : "" + hours}:${
					minutes < 10 ? "0" + minutes : "" + minutes
				}
				`;

				return result;
			},

			isMyMessage() {
				return this.message.sender.id === this.user.id;
			},

			isMessageFromManager() {
				return this.message.sender.role === "Manager";
			},
			isMessageFromAdmin() {
				return this.message.sender.role === "AdminCRM";
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-message {
		display: flex;
		flex-direction: column;
		max-width: 90%;
		width: fit-content;

		//* styles for my messages
		&.my {
			margin-left: auto;
			.r-message {
				&__body {
					background-color: $light-blue;
					border-radius: 2rem 2rem 0 2rem;
					margin-left: auto;
					&::before {
						right: 0;
						box-shadow: $light-blue 0 -5rem 0 0;
						border-top-right-radius: 5rem;
					}
				}
				&__user {
					margin-left: auto;
					margin-right: 2rem;
				}
			}
		}

		//* styles for interlocutor messages
		&.interlocutor {
			.r-message {
				&__body {
					border-radius: 2rem 2rem 2rem 0;
					background-color: #f6f6f6;
					&::before {
						left: 0;
						box-shadow: #f6f6f6 0 -5rem 0 0;
						border-top-left-radius: 5rem;
					}
				}
				&__user {
					margin-left: 2rem;
				}
			}
		}

		&__body {
			position: relative;
			padding: 2rem;
			margin-bottom: 2rem;
			width: fit-content;
			min-width: 8rem;

			&::before {
				content: "";

				//* corner size: 5rem

				/* Absolute position */
				bottom: -10rem;
				position: absolute;

				/* Size */
				height: 10rem;
				width: 5rem;

				/* Border */
				background-color: transparent;
			}
		}
		&__text {
			font-size: 1.6rem;
			position: relative;
			white-space: pre-wrap;
			word-break: break-all;
		}

		&__user {
			display: grid;
			grid-template-columns: max-content 1fr;
			grid-template-rows: repeat(2, max-content);
			align-items: center;
			grid-gap: 0.6rem 1.6rem;
		}

		&__avatar {
			width: 5rem;
			height: 5rem;
			border-radius: 50%;
			object-fit: cover;
			grid-row: 1/3;
		}

		&__username {
			font-size: 1.6rem;
			color: rgba($black, $alpha: 0.7);
			font-weight: 700;
			align-self: flex-end;
		}
		&__date {
			font-size: 1.1rem;
			color: rgba($black, $alpha: 0.7);
			align-self: flex-start;
		}
	}
</style>
