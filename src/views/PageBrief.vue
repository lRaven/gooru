<template>
	<div class="page-brief theme-container" style="background">
		<div class="page-brief__container center-wide">
			<img
				src="img/brief/brief-bg.png"
				ref="bg"
				alt=""
				class="page-brief__bg"
			/>

			<div class="page-brief__content">
				<div class="page-brief__content-col">
					<transition mode="out-in">
						<button
							type="button"
							class="page-brief__back"
							v-if="page_number > 1"
							@click="moveToPrevPage"
						>
							<img
								src="img/icon/brief/arrow-long.svg"
								alt="arrow-back"
							/>
						</button>
					</transition>
					<r-progressbar :progress="page_progress"></r-progressbar>
				</div>

				<div class="page-brief__content-col">
					<transition mode="out-in">
						<brief-start
							v-if="page_number === 1"
							@moveToNextPage="moveToNextPage"
						></brief-start>
					</transition>

					<transition mode="out-in">
						<brief-status
							v-if="page_number === 2"
							@moveToNextPage="moveToNextPage"
						></brief-status>
					</transition>
				</div>

				<div class="page-brief__content-col"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import rProgressbar from "@/components/Brief/r-progressbar";
	import BriefStart from "@/components/Brief/BriefStart";
	import BriefStatus from "@/components/Brief/BriefStatus";

	export default {
		name: "PageBrief",
		components: {
			rProgressbar,
			BriefStart,
			BriefStatus,
		},
		watch: {
			page_number() {
				for (
					let index = 0;
					index < this.page_progress.length;
					index++
				) {
					this.page_number > index
						? (this.page_progress[index].checked = true)
						: (this.page_progress[index].checked = false);
				}

				if (this.page_number === 1) {
					this.$refs.bg.removeAttribute("style");
				} else if (this.page_number === 2) {
					this.$refs.bg.setAttribute(
						"style",
						"transform: translateX(-10%) scale(1.25);"
					);
				} else if (this.page_number === 3) {
					this.$refs.bg.setAttribute(
						"style",
						"transform: translate(25%, -37%) scale(0.5);"
					);
				} else if (this.page_number === 4) {
					this.$refs.bg.setAttribute(
						"style",
						"transform: translate(-15%, 40%) scale(1.25);"
					);
				} else if (this.page_number === 5 || this.page_number === 7) {
					this.$refs.bg.setAttribute(
						"style",
						"transform: translate(-15%, 20%) scale(1);"
					);
				} else if (this.page_number === 6) {
					this.$refs.bg.setAttribute(
						"style",
						"transform: translate(0, -20%) scale(0.8);"
					);
				} else if (this.page_number === 8) {
					this.$refs.bg.setAttribute(
						"style",
						"transform: translate(-20%, 0) scale(0.6);"
					);
				} else if (this.page_number === 9) {
					this.$refs.bg.setAttribute(
						"style",
						"transform: translate(-25%, -10%) scale(1.25);"
					);
				}
			},
		},
		data: () => ({
			page_number: 1,
			page_progress: [
				{ id: 1, checked: true },
				{ id: 2, checked: false },
				{ id: 3, checked: false },
				{ id: 4, checked: false },
				{ id: 5, checked: false },
				{ id: 6, checked: false },
				{ id: 7, checked: false },
				{ id: 8, checked: false },
				{ id: 9, checked: false },
			],
		}),

		methods: {
			moveToPrevPage() {
				this.page_number--;
			},
			moveToNextPage() {
				this.page_number++;
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-brief {
		color: $white;
		position: relative;
		background-color: #004a8b;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		transition: all 0.2s ease;
		padding: 3rem;

		&__bg {
			position: absolute;
			left: 0;
			bottom: 0;
			object-fit: contain;
			transform: scale(0.8);
			transition: all 0.3s ease;
		}

		&__container {
			height: 100%;
		}

		&__content {
			display: grid;
			grid-template-columns: max-content 1fr max-content;
			position: relative;
			gap: 5rem;
			height: 100%;
			&-col {
				width: 100%;
				position: relative;
				&:first-child {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					width: 6rem;
					.r-progressbar {
						margin-top: auto;
						padding: 2rem;
					}
				}
			}
		}

		&__back {
			background-color: transparent;
			padding: 2rem;
		}
	}
</style>
