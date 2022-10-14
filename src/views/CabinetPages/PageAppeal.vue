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
					src="/img/icons/cabinet/arrow-long.svg"
					alt="back"
					class="page-appeal__back-icon"
				/>
			</button>
			<button
				class="page-appeal__appeal-info-button"
				@click="handleOpenRigthPanel"
			>
				<more-icon />
			</button>
		</div>

		<the-messenger
			:ticket_id="appeal?.id"
			:title="appeal?.message"
			:messages="appeal?.messages ? appeal.messages : []"
		></the-messenger>
		<right-panel
			:isMinimized="isRigthPanelMinimized"
			title="Информация о обращении"
			@open-right-panel="handleOpenRigthPanel"
			@close-right-panel="handleCloseRigthPanel"
			class="page-appeal__rigth-panel"
		>
			<template #icon>
				<more-icon class="right-panel__icon" />
			</template>
			<h3 class="appeal-info__title">Тема обращения</h3>
			<p class="appeal-info__content">#{{ appeal?.id }} {{ appeal_topic }}</p>
			<template v-if="appeal_source">
				<h3 class="appeal-info__title">Название парсера</h3>
				<p :title="appeal_source" class="appeal-info__content">
					{{ appeal_source }}
				</p>
			</template>
			<h3 class="appeal-info__title">Проблема обращения</h3>
			<p class="appeal-info__problem">{{ appeal?.message }}</p>
		</right-panel>
	</section>
</template>

<script>
	import TheMessenger from '@/components/Cabinet/Messenger/TheMessenger.vue';
	import RightPanel from '@/components/Cabinet/RightPanel.vue';

	import MoreIcon from '@/assets/icons/Cabinet/MoreIcon.vue';

	import { read_notification } from '@/api/notifications';
	import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
	import { useToast } from 'vue-toastification';

	export default {
		name: 'PageAppeal',
		components: { TheMessenger, RightPanel, MoreIcon },
		data() {
			return {
				path: this.$route.path,
				isRigthPanelMinimized: true,
			};
		},
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
			documentWidth() {
				if (this.documentWidth <= 767) {
					this.isRigthPanelMinimized = true;
				}
			},
		},
		computed: {
			...mapState({
				all_parsers: (state) => state.parsers.all_parsers,
				topics: (state) => state.appeals.topics,
				user: (state) => state.cabinet.user,
				documentWidth: (state) => state.document_width,
			}),
			...mapGetters(['appeals_notifications', 'appealById']),

			appeal() {
				return this.appealById(this.appeal_id);
			},

			appeal_id() {
				return +this.$route.query.appeal_id;
			},

			appeal_source() {
				let result = '';

				const find = this.all_parsers.find(
					(el) => el.id === this.appeal.parser
				);
				if (find !== undefined) {
					result = find.title;
				}

				return result;
			},
			appeal_topic() {
				let result = '';

				const find = this.topics.find(
					(el) => el.id === this.appeal?.topic_type
				);
				if (find !== undefined) {
					result = find.description;
				}

				return result;
			},

			appealNotifications() {
				const result = this.appeals_notifications.reduce((acc, current) => {
					console.log(current.url.split('appeal_id=')[1]);
					if (+current.url.split('appeal_id=')[1] === this.appeal_id) {
						acc.push(current.id);
					}
					return acc;
				}, []);

				return result;
			},
			isHasNotifications() {
				const find = this.appeals_notifications.find((el) => {
					const id = +el.url.split('appeal_id=')[1];
					console.log(id, 'id');
					console.log(this.appeal_id, 'appeal_id');
					return id === this.appeal_id;
				});
				/* console.log(find) */
				return find !== undefined;
			},
		},
		methods: {
			...mapMutations(['SET_TAB']),
			...mapActions(['getAllParsers', 'getAppeal', 'getNotifications']),

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
					console.log(err);
				}
			},
			handleOpenRigthPanel() {
				this.isRigthPanelMinimized = false;
			},
			handleCloseRigthPanel() {
				this.isRigthPanelMinimized = true;
			},
		},

		created() {
			this.SET_TAB('appeals');
			this.getAppeal(this.appeal_id);

			/* if (this.isHasNotifications) {
				//* TODO: пока нет функционала прочитать несколько уведомлений за раз это будет через цикл, исправить как появится возможность обращения к нескольким уведомлениям
				this.appealNotifications.forEach((notification) => {
					console.log(notification)
					this.clear_notifications(notification.id);
				});
			} */
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/scss/variables';

	.page-appeal {
		padding: 2rem 7.2rem 0 4rem;
		display: grid;
		grid-template-rows: max-content 1fr;
		gap: 1.5rem;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		height: calc(100vh - 6.4rem);
		@media (max-width: 767px) {
			padding: 2rem 1.5rem 0 1.5rem;
		}
		:deep(.right-panel.page-appeal__rigth-panel) {
			position: fixed;
			right: 0;
			top: 0;
			background-color: $white;
			padding-top: 8.4rem;
			height: 100vh;
			box-shadow: $shadow;
			@media (max-width: 767px) {
				top: 0;
				display: flex;
				width: 100vw;
				z-index: 3;
				padding-top: 2rem;
				background-color: $white;
				transform: translateX(0);
				transition: all 0.2s ease;
				.right-panel__minimize {
					left: 0;
				}
			}
		}
		:deep(.right-panel.minimized) {
			@media (max-width: 767px) {
				transform: translateX(101vw);
				visibility: hidden;
			}
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
			@media (max-width: 540px) {
				grid-column: 2/3;
			}
			@media (max-width: 450px) {
				gap: 0.5rem;
			}
		}
		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;
		}

		&__back {
			background-color: transparent;
			width: 3rem;
			&-icon {
				width: 2.5rem;
				height: 1.5rem;
			}
		}
		&__appeal-info-button {
			background-color: transparent;
			display: none;
			@media (max-width: 767px) {
				display: block;
			}
		}
	}
	.appeal-info {
		&__title {
			font-size: 2rem;
			font-weight: 500;
			padding: 0 0 1rem 0;
			border-bottom: 1px solid $light-gray;
			margin: 0 0 2rem 0;
		}
		&__content {
			font-size: 1.8rem;
			text-overflow: ellipsis;
			overflow: hidden;
			margin: 0 0 2rem 0;
			cursor: default;
		}
		&__problem {
			font-size: 1.8rem;
			margin: 0 0 2rem 0;
			word-break: break-all;
			height: 150px;
			overflow-y: auto;
		}
	}
</style>
