<template>
	<section class="the-appeals">Обращения</section>
</template>

<script>
	import { mapMutations } from "vuex";

	export default {
		name: "TheAppeals",
		methods: {
			...mapMutations(["SET_TAB"]),
		},
		created() {
			this.SET_TAB("appeals");
		},
	};
</script>

<style lang="scss" scoped></style>
