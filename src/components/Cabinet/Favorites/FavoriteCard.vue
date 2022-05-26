<template>
	<div class="favorite-card">
		<div class="favorite-card__header">
			<r-checkbox v-model="isAllSelected"></r-checkbox>
		</div>

		<div class="favorite-card__body"></div>
	</div>
</template>

<script>
	import rCheckbox from "@/components/r-checkbox";

	export default {
		name: "FavoriteCard",
		components: {
			rCheckbox,
		},
		data: () => ({
			isAllSelected: false,
		}),
	};
</script>

<style lang="scss" scoped></style>
