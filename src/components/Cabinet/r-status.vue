<template>
	<p class="r-status" :class="statusClass">
		<template v-if="isMinimized">
			<template v-if="statusClass === 'works'">
				{{ `${status}%` }}
			</template>

			<img
				src="/img/icon/cabinet/tick.svg"
				alt=""
				v-else-if="statusClass === 'completed'"
			/>

			<img src="/img/icon/cabinet/postpone.svg" alt="" v-else />
		</template>

		<template v-else> {{ statusMessage }} </template>
	</p>
</template>

<script>
	export default {
		name: "rStatus",
		props: {
			status: Number,
			isMinimized: {
				value: Boolean,
				default: false,
			},
		},
		computed: {
			//* вывод класса в зависимости от статуса (предварительно цифровой, т.к. с бека статус не приходит разный)
			statusClass() {
				return this.status !== null && this.status < 100
					? "works"
					: this.status === 100
					? "completed"
					: this.status === null
					? "postpone"
					: "";
			},
			//* вывод сообщения статуса в параграф в зависимости от статуса
			statusMessage() {
				return this.statusClass === "works"
					? `Выполнено ${this.status}%`
					: this.statusClass === "completed"
					? "Готово"
					: this.statusClass === "postpone"
					? "Отложено"
					: "";
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-status {
		user-select: none;
		display: flex;
		align-items: center;
		width: max-content;
		padding: 0.8rem 2.4rem;
		border-radius: 5rem;
		font-weight: 600;
		font-size: 1.4rem;
		&.works {
			color: $secondary;
			background-color: rgba($secondary, $alpha: 0.1);
		}
		&.completed {
			color: $primary;
			background-color: rgba($primary, $alpha: 0.15);
		}
		&.postpone {
			color: rgba($black, $alpha: 0.5);
			background-color: #f0f0f0;
		}
	}
</style>
