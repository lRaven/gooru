<template>
	<section
		class="page-appeal"
		:class="{ has_right_panel: user.role === 'DefaultUser' }"
	>
		<div class="page-appeal__header">
			<button
				type="button"
				class="page-appeal__back"
				@click="
					this.$router.push({
						name: 'appeals',
						query: { page: 1 },
					})
				"
			>
				<img
					src="/img/icon/cabinet/arrow-long.svg"
					alt="back"
					class="page-appeal__back-icon"
				/>
			</button>
			<h2 class="page-appeal__title">
				<span v-if="documentWidth > 540">Обращение</span>
				<span>#{{ appeal.id }}</span>
				<span v-if="appeal_source">{{ appeal_source }}</span>
				<span>{{ appeal_topic }}</span>
			</h2>
		</div>

		<the-messenger
			:ticket_id="appeal.id"
			:title="appeal.message"
		></the-messenger>
	</section>
</template>

<script>
	import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
	import TheMessenger from "@/components/Cabinet/Messenger/TheMessenger.vue";
	import { read_notification } from "@/api/notifications";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageAppeal",
		components: { TheMessenger },
		watch: {
			appeal_id() {
				if (this.$route.path === this.path) {
					this.getAppeal(this.appeal_id);
				}
			},
			isHasNotifications() {
				//* TODO: пока нет функционала прочитать несколько уведомлений за раз это будет через цикл, исправить как появится возможность обращения к нескольким уведомлениям
				this.appealNotifications.forEach((notification) => {
					this.clear_notifications(notification);
				});
			},
		},
		computed: {
			...mapState({
				appeal: (state) => state.appeals.appeal,
				all_parsers: (state) => state.parsers.all_parsers,
				topics: (state) => state.appeals.topics,
				user: (state) => state.cabinet.user,
				documentWidth: (state) => state.document_width,
			}),
			...mapGetters(["appeals_notifications"]),

			appeal_id() {
				return +this.$route.query.appeal_id;
			},

			appeal_source() {
				let result = "";

				const find = this.all_parsers.find(
					(el) => el.id === this.appeal.id
				);
				if (find !== undefined) {
					result = find.title;
				}

				return result;
			},
			appeal_topic() {
				let result = "";

				const find = this.topics.find(
					(el) => el.id === this.appeal.topic_type
				);
				if (find !== undefined) {
					result = find.description;
				}

				return result;
			},

			appealNotifications() {
				const result = this.appeals_notifications.reduce(
					(acc, current) => {
						if (+current.url.split("=")[1] === this.appeal_id) {
							acc.push(current.id);
						}

						return acc;
					},
					[]
				);

				return result;
			},
			isHasNotifications() {
				const find = this.appeals_notifications.find((el) => {
					const id = +el.url.split("=")[1];
					return id === this.appeal_id;
				});

				return find !== undefined;
			},
		},
		data() {
			return {
				path: this.$route.path,
			};
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getAllParsers", "getAppeal", "getNotifications"]),

			async clear_notifications(notification_id) {
				try {
					const response = await read_notification({
						notification_id: notification_id,
						read: true,
						user_id: this.user.id,
					});
					if (response.status === 200) {
						this.getNotifications();
					}
				} catch (err) {
					throw new Error();
				}
			},
		},
		created() {
			this.SET_TAB("appeals");
			this.getAppeal(this.appeal_id);

			if (this.isHasNotifications) {
				//* TODO: пока нет функционала прочитать несколько уведомлений за раз это будет через цикл, исправить как появится возможность обращения к нескольким уведомлениям
				this.appealNotifications.forEach((notification) => {
					this.clear_notifications(notification);
				});
			}
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-appeal {
		padding: 2rem 4rem 0 4rem;
		display: grid;
		grid-template-rows: max-content 1fr;
		gap: 1.5rem;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		height: calc(100vh - 6.4rem);
		@media (max-width: 767px) {
			padding: 2rem 1.5rem 0 1.5rem;
		}

		&__title {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			gap: 1rem;
			font-weight: 400;
			@media (max-width: 570px) {
				font-size: 2.5rem;
			}
		}
		&__header {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			align-items: center;
			font-weight: 500;
			@media (max-width: 540px) {
				padding: 0 1.5rem;
			}
			@media (max-width: 380px) {
				gap: 0.5rem;
			}
		}

		&__back {
			background-color: transparent;
			width: 3rem;
			&-icon {
				width: 2.5rem;
				height: 1.5rem;
			}
		}
	}
</style>
