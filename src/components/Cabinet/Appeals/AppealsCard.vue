<template>
	<div
		class="appeals-card"
		@click="
			this.$router.push({
				name: 'appeal',
				query: { appeal_id: appeal.id },
			})
		"
	>
		<template v-if="document_width > 1023">
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

			<div class="appeals-card__col appeals-card__topic" :title="topic">
				{{ topic }}
			</div>

			<p
				class="appeals-card__message"
				:title="last_message.text || appeal.message"
			>
				{{ last_message.text || appeal.message }}
			</p>

			<p
				class="appeals-card__col appeals-card__date"
				:title="appeal.date || '1.1.1970'"
			>
				{{ appeal.date || "1.1.1970" }}
			</p>
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

				<p
					class="appeals-card__col appeals-card__date"
					:title="appeal.date || '1.1.1970'"
				>
					{{ appeal.date || "1.1.1970" }}
				</p>
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
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.appeals-card {
		cursor: pointer;
		display: grid;
		grid-template-columns: max-content 20rem 16rem 1fr max-content;
		align-items: center;
		justify-content: space-between;
		gap: 3rem;
		padding: 2rem 3rem;
		background-color: white;
		font-weight: 500;

		@media (max-width: 1023px) {
			grid-template-columns: 1fr;
			justify-content: flex-start;
			align-items: flex-start;
			gap: 1rem;
		}
		@media (max-width: 767px) {
			padding: 1rem;
		}

		+ .appeals-card {
			border-top: 0.1rem solid rgba($black, $alpha: 0.5);
		}

		&__col {
			display: flex;
			align-items: center;
			gap: 1rem;

			@media (max-width: 1023px) {
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
			color: rgba($black, $alpha: 0.7);
		}

		&__source {
			font-size: 1.8rem;
		}

		&__counter {
			color: rgba($black, $alpha: 0.5);
			font-weight: 300;
			font-size: 1.4rem;
		}

		&__topic {
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

		&__date {
			font-size: 1.4rem;
			font-weight: 400;
			color: rgba($black, $alpha: 0.7);
		}
	}
</style>
