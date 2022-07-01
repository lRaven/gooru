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
		<p class="appeals-card__col appeals-card__id">#{{ appeal.id }}</p>

		<div class="appeals-card__col">
			<p class="appeals-card__source">{{ source }}</p>
			<span class="appeals-card__counter">
				{{ messages_counter === 0 ? "" : messages_counter }}
			</span>
		</div>

		<div class="appeals-card__col appeals-card__topic">{{ topic }}</div>

		<p class="appeals-card__col appeals-card__message">
			{{ last_message.text || appeal.message }}
		</p>

		<p class="appeals-card__col appeals-card__date">
			{{ appeal.date || "1.1.1970" }}
		</p>
	</div>
</template>

<script>
	export default {
		name: "AppealsCard",
		props: {
			appeal: Object,
			counter: Number,

			topics: Array,
			parsers: Array,
			messages: Array,
		},
		computed: {
			source() {
				let result = "";

				const find = this.parsers.find(
					(el) => el.id === this.appeal.id
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
		+ .appeals-card {
			border-top: 0.1rem solid rgba($black, $alpha: 0.5);
		}

		&__col {
			display: flex;
			align-items: center;
			gap: 1rem;
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
			text-overflow: ellipsis;
			display: -webkit-box;
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
