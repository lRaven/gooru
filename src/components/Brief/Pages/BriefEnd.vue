<template>
	<section class="brief-end">
		<h1 class="brief-end__title">СПАРСИБО!</h1>
	</section>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "BriefEnd",
		computed: {
			...mapState({
				client_status: (store) => store.brief.client_status,
				client_status_self_option: (store) =>
					store.brief.client_status_self_option,

				fields_of_activity: (store) => store.brief.fields_of_activity,
				fields_of_activity_self_option: (store) =>
					store.brief.fields_of_activity_self_option,

				site_types: (store) => store.brief.site_types,
				site_types_self_option: (store) =>
					store.brief.site_types_self_option,

				additional_parameters: (store) =>
					store.brief.additional_parameters,
				number_of_positions: (store) => store.brief.number_of_positions,
				source: (store) => store.brief.source,
				user_contacts: (store) => store.brief.user_contacts,
			}),

			brief() {
				let result = {};

				result.client_status = this.client_status;
				result.client_status_self_option =
					this.client_status_self_option;

				result.fields_of_activity = this.fields_of_activity;
				result.fields_of_activity_self_option =
					this.fields_of_activity_self_option;

				result.site_types = this.site_types;
				result.site_types_self_option = this.site_types_self_option;

				result.additional_parameters = this.additional_parameters;
				result.number_of_positions = this.number_of_positions;
				result.source = this.source;
				result.user_contacts = this.user_contacts;

				return result;
			},
		},
		mounted() {
			setTimeout(() => {
				this.$router.push("/");
			}, 5000);
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.brief-end {
		&__title {
			width: fit-content;
			position: relative;
			font-size: 4.8rem;
			line-height: 1.3;
			padding-top: 2rem;
			text-transform: uppercase;
			font-weight: 700;
			margin-bottom: 5rem;
			&::before {
				content: "";
				position: absolute;
				left: 0;
				top: 0;
				width: 70%;
				height: 0.6rem;
				background-color: $white;
			}
		}
	}

	@media (max-width: 540px) {
		.brief-end {
			display: flex;
			justify-content: center;
			align-items: flex-end;
			&__title {
				&::before {
					width: 100%;
				}
			}
		}
	}
</style>
