<template>
    <div
        class="parsource-card"
        :class="isParsourceManagerView ? 'manager' : ''"
    >
        <r-checkbox
            v-model="isSelected"
            :checked="isSelected"
            v-if="isCanSelect"
        ></r-checkbox>

        <div class="parsource-card__content" ref="content">
            <p
                class="parsource-card__col parsource-card__id"
                :title="parsource.user"
                v-if="isParsourceManagerView"
            >
                id{{ parsource.user }}
            </p>

            <p
                class="parsource-card__col parsource-card__source"
                :title="parsource.data_source"
            >
                {{ parsource.data_source }}
            </p>

            <div
                class="parsource-card__name"
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

            <div class="parsource-card__col">
                <r-status :status="1 || parsource.condition"></r-status>
            </div>

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
                :title="parsource.lost_time || '0ч'"
            >
                {{ parsource.lost_time || "0ч" }}
            </p>

            <div class="parsource-card__col">
                <r-button
                    text="Подробнее"
                    color="bordered"
                    @click="
                        this.$router.push({
                            path: `/cabinet/parsource/${parsource.id}`,
                            query: { page: 1 },
                        })
                    "
                ></r-button>
            </div>
        </div>
    </div>
</template>

<script>
    import rCheckbox from "@/components/r-checkbox";
    import rButton from "@/components/r-button";
    import rStatus from "@/components/Cabinet/r-status";
    import rInput from "@/components/Auth/r-input.vue";

    import { mapMutations, mapActions } from "vuex";
	import { directive } from "vue3-click-away";
	import { useToast } from "vue-toastification";

    import { prettyDate } from "@/js/processStrings";

    export default {
        name: "ParsourceCard",
        props: {
            parsource: Object,
            isCanSelect: {
                value: Boolean,
                default: true,
            },

            isParsourceManagerView: {
                value: Boolean,
                default: false,
            },
        },
        components: {
            rCheckbox,
            rButton,
            rStatus,
            rInput,
        },
        watch: {
            isSelected() {
                if (this.isSelected === true) {
                    this.$refs.content.classList.add("selected");
                    this.SELECT_PARSOURCE(this.parsource.id);
                } else {
                    this.$refs.content.classList.remove("selected");
                    this.UNSELECT_PARSOURCE(this.parsource.id);
                }
            },
            "parsource.selected"() {
                this.isSelected = this.parsource.selected;
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
					await this.updateParsourceName({ id: this.parsource.id, editedName: this.editedParsourceName });
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
                    grid-template-columns:
                        18rem 14rem
                        repeat(2, 20rem) repeat(3, 14rem);
                }
            }
        }

        &__content {
            display: grid;
            grid-template-columns: minmax(20rem, 1fr) 20rem 14rem 20rem repeat(
                    4,
                    14rem
                );
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
            }
        }

        &__col {
            &:nth-child(n + 2) {
                justify-self: center;
            }
        }
        &__name {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        &__edit-button {
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

        &__name {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
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

        &__id {
            color: $primary;
            font-weight: 600;
            font-size: 1.4rem;
        }
    }
</style>
