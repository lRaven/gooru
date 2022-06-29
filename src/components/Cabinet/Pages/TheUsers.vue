<template>
	<section class="the-users">
		<h2 class="the-users__title">Пользователи</h2>
		<div class="the-users__main">
			<transition mode="out-in">
				<r-loader v-if="!isUsersLoaded"></r-loader>
			</transition>

			<transition mode="out-in">
				<div class="the-users__list" v-if="isUsersLoaded">
					<user-card
						v-for="user in users"
						:key="user.id"
						:user="user"
					></user-card>
				</div>
			</transition>
		</div>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import UserCard from "@/components/Cabinet/Users/UserCard.vue";
	import rLoader from "@/components/r-loader.vue";

	export default {
		name: "TheUsers",
		components: {
			UserCard,
			rLoader,
		},
		watch: {
			page() {
				if (this.$route.path === this.path) {
					this.getParsources({
						page_number: this.page,
						page_size: this.parsources_in_page,
					});
				}
			},

			// selectAll() {
			// 	this.selectAll === true
			// 		? this.SELECT_ALL_PARSOURCES()
			// 		: this.UNSELECT_ALL_PARSOURCES();
			// },
			// deleteSelected() {
			// 	if (this.deleteSelected === true) {
			// 		this.DELETE_SELECTED_PARSOURCES();
			// 		setTimeout(() => {
			// 			this.deleteSelected = false;
			// 		}, 1000);
			// 	}
			// },
			// parsources: {
			// 	handler: function () {
			// 		if (this.parsources.length === 0) {
			// 			this.selectAll = false;
			// 		}
			// 	},
			// 	deep: true,
			// },

			users() {
				this.isUsersLoaded = true;
			},
		},
		computed: {
			...mapState({
				users: (state) => state.users.users,
				users_pagination: (state) => state.users.users_pagination,
			}),
			page() {
				return this.$route.query.page;
			},
			count() {
				return this.parsources_pagination.count;
			},

			number_of_pages() {
				return Math.ceil(this.count / this.parsources_in_page);
			},
		},
		data() {
			return {
				isUsersLoaded: false,
				path: this.$route.path,

				selectAll: false,
				postponeSelected: false,
				deleteSelected: false,
				sortBy: "none",

				parsources_in_page: 10,
			};
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions([
				"getUsers",
				"getUsersManagers",
				"getAllParsources",
				"getAllParsers",
			]),
		},
		created() {
			this.SET_TAB("users");
			this.getUsers({ page_size: 10, page_number: 1 });
			this.getAllParsources();
			this.getAllParsers();
			this.getUsersManagers();
		},
	};
</script>

<style lang="scss" scoped>
	.the-users {
		position: relative;
		padding: 4rem;
		height: 100%;
		overflow-y: auto;
		&__title {
			font-weight: 400;
			margin-bottom: 4rem;
		}

		&__main {
		}

		&__list {
			display: grid;
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}
</style>
