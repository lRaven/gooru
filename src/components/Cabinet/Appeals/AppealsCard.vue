<template>
	<div
		class="appeals-card"
		:class="{
			manager: user.role !== 'DefaultUser',
			has_notifications: isHasNotifications,
		}"
	>
		<template v-if="document_width > 1300">
			<p class="appeals-card__col appeals-card__id">#{{ appeal.id }}</p>

			<div class="appeals-card__col">
				<p class="appeals-card__source">
					{{
						user.role !== "DefaultUser"
							? `${appeal.user.first_name}
						${appeal.user.last_name.length > 0 ? `${appeal.user.last_name[0]}.` : ""}`
							: source
					}}
				</p>
				<span class="appeals-card__counter">
					{{ messages_counter > 0 ? messages_counter : "" }}
				</span>
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

			<div class="appeals-card__col appeals-card__topic" :title="topic">
				{{ topic }}
			</div>

			<p
				class="appeals-card__message"
				:title="last_message.text || appeal.message"
			>
				{{ last_message.text || appeal.message }}
			</p>

			<r-button
				color="bordered"
				text="Развернуть"
				@click="
					this.$router.push({
						name: 'appeal',
						query: { appeal_id: appeal.id },
					})
				"
			></r-button>
		</template>

		<template v-else>
			<div class="appeals-card__row">
				<div class="appeals-card__col">
					<p class="appeals-card__col appeals-card__id">
						#{{ appeal.id }}
					</p>

					<div
						class="appeals-card__col appeals-card__topic"
						:title="topic"
						v-if="document_width > 425"
					>
						{{ topic }}
					</div>
				</div>

				<r-button
					color="bordered"
					text="Развернуть"
					@click="
						this.$router.push({
							name: 'appeal',
							query: { appeal_id: appeal.id },
						})
					"
				></r-button>
			</div>

			<div class="appeals-card__row">
				<p class="appeals-card__source">
					{{
						user.role !== "DefaultUser"
							? `${appeal.user.first_name}
						${appeal.user.last_name.length > 0 ? `${appeal.user.last_name[0]}.` : ""}`
							: source
					}}
				</p>
				<span class="appeals-card__counter">
					{{ messages_counter > 0 ? messages_counter : "" }}
				</span>
			</div>

			<p
				class="appeals-card__message"
				:title="last_message.text || appeal.message"
			>
				{{ last_message.text || appeal.message }}
			</p>
		</template>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "AppealsCard",
		props: {
			appeal: Object,

			topics: Array,
			parsers: Array,
			messages: Array,
			appealsHasNotifications: {
				value: Array,
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

				return result;
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

			last_message() {
				let result;

				const find = this.messages.filter(
					(el) => el.ticket === this.appeal.id
				);
				result = find.slice(-1)[0];

				return result || {};
			},

			messages_counter() {
				const result = this.messages.filter(
					(el) => el.ticket === this.appeal.id
				);

				return result.length || 0;
			},

			isHasNotifications() {
				const find = this.appealsHasNotifications.find((el) => {
					return el === this.appeal.id;
				});

				return find !== undefined;
			},
		},
		mounted() {},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.appeals-card {
		display: grid;
		grid-template-columns: max-content 1fr 20rem 2fr max-content;
		align-items: center;
		justify-content: space-between;
		gap: 3rem;
		padding: 2rem 3rem;
		background-color: $white;
		transition: all 0.2s ease;

		&:first-child {
			border-radius: 0.6rem 0.6rem 0 0;
		}
		&:last-child {
			border-radius: 0 0 0.6rem 0.6rem;
		}

		&.has_notifications {
			border: 0.1rem solid $red;
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
				grid-template-columns: max-content repeat(2, 1fr) 20rem 2fr max-content;
			}
		}

		@media (max-width: 1300px) {
			grid-template-columns: 1fr;
			justify-content: flex-start;
			align-items: flex-start;
			gap: 1rem;
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
			&:first-child {
				justify-content: space-between;
			}
		}

		&__id {
			font-size: 1.4rem;
			color: rgba($black, 0.7);
		}

		&__source {
			font-size: 1.8rem;
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
		}

		.r-button {
			padding: 1rem 2rem !important;
			font-size: 1.4rem;
		}
	}
</style>
