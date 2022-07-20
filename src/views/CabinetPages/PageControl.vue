<template>
	<section class="page-control">
		<h2 class="page-control__title">Управление</h2>
		<div class="page-control__body">
			<div class="rate-cards">
				<rate-card
					v-for="rate in rates"
					:key="rate.id"
					isHasButton="true"
					ButtonText="Изменить"
					color="white"
					:rate="rate"
					@select-rate="selectRate"
				/>
			</div>
			<r-modal v-if="selectedRate" @close-modal="closeModal">
				<template v-slot>
					<form
						class="page-control__form"
						@submit.prevent="submitUpdatedRate"
					>
						<h3 class="page-control__form-title">
							Изменение параметров
						</h3>
						<r-input
							:value="selectedRate.name"
							v-model="selectedRate.name"
							placeholder="Название тарифа"
						/>
						<r-input
							v-if="selectedRate.price !== null"
							:value="selectedRate.price.toString()"
							v-model="selectedRate.price"
							placeholder="Стоимость в месяц"
						/>
						<r-input
							v-for="checkItem in selectedRate.checkList"
							:key="checkItem.id"
							:value="checkItem.text"
							v-model="checkItem.text"
							placeholder="Пункт описания тарифа"
						/>
						<button
							type="submit"
							class="page-control__form-submit"
							:class="{ white: isLoading }"
						>
							<r-loader v-if="isLoading" />
							<template v-else>Применить</template>
						</button>
					</form>
				</template></r-modal
			>
		</div>
	</section>
</template>

<script>
	import rLoader from "@/components/UI/r-loader.vue";
	import RateCard from "@/components/Rates/RateCard.vue";

	import { mapState, mapMutations, mapActions } from "vuex";

	import { useToast } from "vue-toastification";

	export default {
		name: "PageControl",
		components: {
			rLoader,
			RateCard,
		},
		data: () => ({
			selectedRate: null,
			isLoading: false,
		}),
		computed: {
			...mapState({ rates: (state) => state.rates.rates }),
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["updateRate", "getRates"]),

			selectRate(id) {
				const selectedRate = this.rates.find((rate) => rate.id === id);
				this.selectedRate = JSON.parse(JSON.stringify(selectedRate));
			},
			closeModal() {
				this.selectedRate = null;
			},
			async submitUpdatedRate() {
				this.isLoading = true;
				try {
					await this.updateRate(this.selectedRate);
					this.toast.success("Тариф успешно изменен!");
					setTimeout(this.closeModal, 1000);
				} catch (error) {
					this.isLoading = false;
					console.log(error);
					this.toast.error("Не удалось изменить тариф!");
				}
			},
		},
		created() {
			this.SET_TAB("control");
			this.getRates();
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style scoped lang="scss">
	@import "@/assets/scss/variables";

	.page-control {
		padding: 4rem;
		height: 100%;
		overflow: auto;
		&__title {
			margin-bottom: 4rem;
			font-weight: 400;
		}

		&__form-title {
			margin: 0 0 1.5rem 0;
			width: 400px;
		}
		&__form {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 0 2rem 2rem 2rem;
			gap: 1rem;
		}
		&__form-submit {
			margin: 3rem 0 0 0;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			font-size: 1.6rem;
			font-weight: 700;
			padding: 2rem 3rem;
			border-radius: 0.5rem;
			background-color: $primary;
			color: $white;
			min-width: -webkit-max-content;
			min-width: -moz-max-content;
			min-width: max-content;
			height: -webkit-max-content;
			height: -moz-max-content;
			height: max-content;
			opacity: 1;
			transition: all 0.2s ease;
			&.white {
				background-color: $white;
			}
		}
	}

	.rate-cards {
		display: flex;
		justify-content: space-between;
	}
</style>
