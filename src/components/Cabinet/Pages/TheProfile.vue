<template>
	<section class="the-profile">
		<h2 class="the-profile__title">Мой профиль</h2>
		<div class="the-profile__main"></div>
	</section>
</template>

<script>
	import { mapMutations } from "vuex";

	export default {
		name: "TheProfile",
		methods: {
			...mapMutations(["SET_TAB"]),
		},
		created() {
			this.SET_TAB("profile");
		},
	};
</script>

<style lang="scss" scoped>
	.the-profile {
		display: grid;
		grid-template-columns: 1fr 29rem;
		padding-right: 0;
		gap: 3rem;

		&__title,
		&__main {
			grid-column: 1/2;
		}

		&__title {
			font-weight: 400;
		}
	}
</style>
