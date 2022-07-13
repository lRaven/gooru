<template>
	<Datepicker
		v-model="date"
		range
		:clearable="false"
		:format="format"
		:enableTimePicker="false"
		locale="ru"
		cancelText="Закрыть"
		selectText="Выбрать"
		placeholder="Выберите дату"
		class="r-date-range-picker"
		inputClassName="r-date-range-picker__input"
	>
		<template #input-icon>
			<img
				class="input-slot-image"
				src="/img/icon/cabinet/calendar.svg"
			/>
		</template>
	</Datepicker>
</template>

<script>
	import { ref, onMounted } from "vue";
	import Datepicker from "@vuepic/vue-datepicker";
	import "@vuepic/vue-datepicker/dist/main.css";

	export default {
		name: "rDateRangePicker",
		components: { Datepicker },
		setup() {
			const date = ref(new Date());

			const format = (date) => {
				//* формат диапазона дат
				const startDateDay = date[0].getDate();
				const startDateMonth = date[0].getMonth() + 1;
				const startDateYear = date[0].getFullYear();

				const endDateDay = date[1].getDate();
				const endDateMonth = date[1].getMonth() + 1;
				const endDateYear = date[1].getFullYear();

				return `${startDateDay}.${startDateMonth}.${startDateYear} - ${endDateDay}.${endDateMonth}.${endDateYear}`;
			};

			onMounted(() => {
				//* дефолтный диапазон дат
				const startDate = new Date();
				const endDate = new Date(
					new Date().setDate(startDate.getDate() + 7)
				);
				date.value = [startDate, endDate];
			});
			return {
				date,
				format,
			};
		},
	};
</script>

<style lang="scss" scoped>
	@import "@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss";
</style>
<style lang="scss">
	// TODO: достилизовать календарь
	.r-date-range-picker {
		.dp__input_icon {
			left: initial;
			right: 1rem;
		}
		&__input {
			border: 0.1rem solid rgba(50, 50, 50, 0.1);
			padding: 1rem;
			font-size: 1.6rem;
		}
	}
</style>
