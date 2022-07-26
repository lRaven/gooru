<template>
	<div class="parsource-card" :class="{ manager: isParsourceManagerView }">
		<r-checkbox
			v-model="isSelected"
			:checked="isSelected"
			v-if="isCanSelect && document_width > 1140"
		></r-checkbox>

		<div
			class="parsource-card__content"
			:class="{ selected: isSelected }"
			v-if="document_width > 1140"
		>
			<p
				class="parsource-card__id"
				:title="parsource.user"
				v-if="isParsourceManagerView"
			>
				id{{ parsource.user }}
			</p>

			<p
				class="parsource-card__col parsource-card__source"
				:title="source"
			>
				{{ source }}
			</p>

			<div
				class="parsource-card__col parsource-card__name"
				v-if="!isParsourceManagerView"
				v-click-away="handleCloseEditParsourceMode"
			>
				<template v-if="!isEditParsourceName">
					<p
						class="parsource-card__name-text"
						:title="parsource.name"
					>
						{{ parsource.name }}
					</p>
					<svg
						class="parsource-card__edit-button"
						@click.stop="handleEditParsourceName"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M20.9991 10.0457V20.3159C20.9991 21.5221 20.0985 22.4998 18.9876 22.4998H3.5115C2.4006 22.4998 1.5 21.5221 1.5 20.3159V4.81178C1.5 3.60563 2.4006 2.62793 3.5115 2.62793H13.9528"
							stroke="#5960C7"
							stroke-miterlimit="10"
							stroke-linecap="round"
						/>
						<path
							d="M21.8333 4.5408L13.4576 13.1538C13.0311 13.5937 11.7549 13.98 10.5407 14.4252C10.0262 14.6139 9.53041 14.1336 9.70291 13.6134C10.1049 12.4006 10.4559 11.0982 10.8822 10.6582L19.2579 2.04525C19.947 1.3341 21.0822 1.31625 21.7934 2.0055C22.5045 2.6946 22.5224 3.82965 21.8333 4.5408Z"
							stroke="#5960C7"
							stroke-miterlimit="10"
							stroke-linecap="round"
						/>
						<path
							d="M17.8301 3.51855L20.4054 6.0141"
							stroke="#5960C7"
							stroke-miterlimit="10"
							stroke-linecap="round"
						/>
					</svg>
				</template>
				<template v-else>
					<r-input
						@keyup.enter="handleSubmitEditName"
						class="parsource-card__edit-name"
						v-model="editedParsourceName"
						:value="editedParsourceName"
					/>
					<svg
						class="parsource-card__close-button"
						@click.stop="handleEditParsourceName"
						width="25"
						height="25"
						viewBox="0 0 25 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							opacity="0.4"
							d="M23.5431 24.7086L0.233102 1.3986L1.3986 0.233101L24.7086 23.5431L23.5431 24.7086ZM1.10723 25L0 23.8928L23.8928 0L25 1.10723L1.10723 25Z"
							fill="#323232"
						/>
					</svg>
				</template>
			</div>

			<p
				class="parsource-card__col parsource-card__date"
				:title="parsource.date || '1.1.1970'"
			>
				{{ parsource.date ? prettyDate(parsource.date) : "1.1.1970" }}
			</p>

			<r-status
				class="parsource-card__status"
				:status="1 || parsource.condition"
				:isMinimized="document_width > 1700 ? false : true"
			></r-status>

			<p
				class="parsource-card__col parsource-card__found"
				:title="parsource.find || 0"
			>
				{{ parsource.find || 0 }}
			</p>

			<p
				class="parsource-card__col parsource-card__favorite"
				:title="parsource.favorite || 0"
				v-if="!isParsourceManagerView"
			>
				{{ parsource.favorite || 0 }}
			</p>

			<p
				class="parsource-card__col parsource-card__time"
				:title="lost_time"
			>
				{{ lost_time }}
			</p>

			<r-button
				:text="document_width > 1440 ? 'Подробнее' : ''"
				color="bordered"
				direction="revert"
				@click="
					this.$router.push({
						path: `/cabinet/parsource/${parsource.id}`,
						query: { page: 1 },
					})
				"
			>
				<template v-slot:icon>
					<img
						src="/img/icon/alert.svg"
						alt="notification"
						class="parsource-card__notification"
						v-if="isHasNotifications"
					/>
					<img
						src="/img/icon/dot_list.svg"
						alt="dots"
						class="parsource-card__dots"
						v-if="document_width <= 1440"
					/>
				</template>
			</r-button>
		</div>

		<div
			class="parsource-card__content"
			:class="{ selected: isSelected }"
			v-else
		>
			<div class="parsource-card__row">
				<div class="parsource-card__col">
					<r-checkbox
						v-model="isSelected"
						:checked="isSelected"
						v-if="isCanSelect"
					></r-checkbox>

					<p class="parsource-card__source" :title="source">
						{{ source }}
					</p>
				</div>

				<r-status
					class="parsource-card__status"
					:status="1 || parsource.condition"
				></r-status>
			</div>

			<div class="parsource-card__row">
				<div class="parsource-card__content-col">
					<p class="parsource-card__col-description">Дата</p>

					<p
						class="parsource-card__col parsource-card__date"
						:title="parsource.date || '1.1.1970'"
					>
						{{
							parsource.date
								? prettyDate(parsource.date)
								: "1.1.1970"
						}}
					</p>
				</div>

				<div class="parsource-card__content-col">
					<p class="parsource-card__col-description">Найдено</p>

					<p
						class="parsource-card__col parsource-card__found"
						:title="parsource.find || 0"
					>
						{{ parsource.find || 0 }}
					</p>
				</div>

				<r-button
					:text="document_width > 1440 ? 'Подробнее' : ''"
					color="bordered"
					direction="revert"
					@click="
						this.$router.push({
							path: `/cabinet/parsource/${parsource.id}`,
							query: { page: 1 },
						})
					"
				>
					<template v-slot:icon>
						<img
							src="/img/icon/alert.svg"
							alt="notification"
							class="parsource-card__notification"
							v-if="isHasNotifications"
						/>
						<img
							src="/img/icon/dot_list.svg"
							alt="dots"
							class="parsource-card__dots"
							v-if="document_width < 1440"
						/>
					</template>
				</r-button>
			</div>
		</div>
	</div>
</template>

<script>
	import rStatus from "@/components/Cabinet/r-status";

	import { mapState, mapMutations, mapActions } from "vuex";
	import { directive } from "vue3-click-away";
	import { useToast } from "vue-toastification";

	import { prettyDate } from "@/js/processStrings";

	export default {
		name: "ParsourceCard",
		props: {
			parsource: Object,

			parsourcesHasParsersNotifications: {
				value: Array,
				default: [],
			},

			isCanSelect: {
				value: Boolean,
				default: true,
			},

			isParsourceManagerView: {
				value: Boolean,
				default: false,
			},
		},
		components: { rStatus },
		watch: {
			isSelected() {
				this.isSelected
					? this.SELECT_PARSOURCE(this.parsource.id)
					: this.UNSELECT_PARSOURCE(this.parsource.id);
			},
			"parsource.selected"() {
				this.isSelected = this.parsource.selected;
			},
		},
		computed: {
			...mapState(["document_width"]),

			isHasNotifications() {
				return this.parsourcesHasParsersNotifications.find(
					(el) => el === this.parsource.id
				);
			},
			source() {
				return this.parsource.data_source.split("/")[2]
					? this.parsource.data_source.split("/")[2]
					: this.parsource.data_source;
			},
			lost_time() {
				const time = this.parsource.lost_time;
				const hours = Number(time.slice(0, 2));
				const minutes = Number(time.slice(3, 5));

				return `${hours > 0 ? hours + "ч" : ""} ${minutes}мин`;
			},
		},
		data() {
			return {
				isSelected: this.parsource.selected || false,
				isEditParsourceName: false,
				editedParsourceName: this.parsource.name,
			};
		},
		methods: {
			...mapMutations(["SELECT_PARSOURCE", "UNSELECT_PARSOURCE"]),
			...mapActions(["updateParsourceName"]),

			handleEditParsourceName() {
				this.isEditParsourceName = !this.isEditParsourceName;
				this.editedParsourceName = this.parsource.name;
			},
			handleCloseEditParsourceMode() {
				this.isEditParsourceName = false;
				this.editedParsourceName = this.parsource.name;
			},
			async handleSubmitEditName() {
				try {
					await this.updateParsourceName({
						id: this.parsource.id,
						editedName: this.editedParsourceName,
					});
					this.isEditParsourceName = false;
				} catch (error) {
					this.toast.error("Ошибка при обновлении названия ресурса!");
				}
			},
			prettyDate,
		},
		directives: { ClickAway: directive },
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.parsource-card {
		display: flex;
		align-items: center;
		gap: 1rem;

		&.manager {
			.parsource-card {
				&__content {
					grid-template-columns: repeat(6, 1fr) 18rem;

					@media (max-width: 1440px) {
						grid-template-columns: repeat(6, 1fr) 6.5rem;
					}
				}
			}
		}

		&__content {
			position: relative;
			display: grid;
			grid-template-columns: repeat(7, 1fr) 18rem;
			grid-gap: 2rem;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 2rem 3rem;
			background-color: $white;
			border-radius: 0.6rem;
			box-shadow: $shadow;
			outline: 0.1rem solid transparent;
			transition: all 0.2s ease;

			@media (max-width: 1440px) {
				grid-template-columns: repeat(7, 1fr) 6.5rem;
				padding: 1rem;
			}
			@media (max-width: 1140px) {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: flex-start;
			}

			&:hover {
				box-shadow: 0 0.4rem 1.2rem rgba(89, 96, 199, 0.2);
				outline-color: rgba(0, 0, 0, 0.22);
			}
			&.selected {
				outline-color: $primary;
				box-shadow: 0 0.4rem 1.2rem rgba(89, 96, 199, 0.2);
			}

			.r-button {
				width: 100%;
				font-size: 1.4rem;
				padding: 1rem 2.8rem;
				min-height: 4.2rem;
				margin-left: auto;

				@media (max-width: 1440px) {
					min-height: inherit;
					height: 4rem;
					width: 4rem;
					padding: 0 1rem;
				}
			}

			&-col {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}

		&__notification {
			width: 2.4rem;
			height: 2.4rem;
			@media (max-width: 1440px) {
				width: 1.5rem;
			}
		}

		&__col {
			&:first-child {
				@media (max-width: 1140px) {
					display: grid;
					grid-template-columns: max-content 1fr;
					gap: 1rem;
					align-items: center;
				}
			}

			&:nth-child(n + 2) {
				margin: 0 auto;
				max-width: 100%;

				@media (max-width: 1140px) {
					margin: 0;
				}
			}

			&-description {
				font-size: 1rem;
			}
		}
		&__row {
			width: 100%;
			&:first-child {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 1rem;
			}

			&:last-child {
				display: grid;
				grid-template-columns: repeat(2, 1fr) 6.5rem;
				grid-gap: 2rem;
			}
		}

		.r-status {
			@media (max-width: 540px) {
				min-width: max-content;
			}
		}

		&__name {
			display: flex;
			align-items: center;
			gap: 1rem;
			&-text {
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}
		&__edit-button {
			cursor: pointer;
			path {
				stroke: $black;
			}
			&:hover {
				path {
					stroke: $primary;
				}
			}
		}
		&__close-button {
			cursor: pointer;
			path {
				fill: $black;
				opacity: 0.7;
			}
			&:hover {
				path {
					fill: $primary;
				}
			}
		}

		&__name-text,
		&__date,
		&__status,
		&__found,
		&__time {
			font-size: 1.4rem;
		}
		&__source {
			font-weight: 500;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		&__favorite {
			font-weight: 600;
			font-size: 1.5rem;
		}
		&__status {
			justify-self: center;
		}

		&__id {
			color: $primary;
			font-weight: 600;
			font-size: 1.4rem;
		}
	}
</style>
