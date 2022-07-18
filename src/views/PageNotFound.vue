<template>
	<section class="page-not-found">
		<div class="img">
			<img
				src="/img/404/backToTheHomepage.png"
				alt="Back to the Homepage"
			/>
			<img
				src="/img/404/Delorean.webp"
				alt="El Delorean, El Doc y Marti McFly"
			/>
		</div>
		<div class="text">
			<h1>404</h1>
			<h2>PAGE NOT FOUND</h2>
			<h3>BACK TO HOME?</h3>
			<router-link to="/" class="yes">YES</router-link>
			<a href="https://www.youtube.com/watch?v=G3AfIvJBcGo">NO</a>
		</div>
	</section>
</template>

<script>
	export default {
		name: "PageNotFound",
	};
</script>

<style lang="scss" scoped>
	@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-family: "Press Start 2P";
		color: #fff;
		text-align: center;
	}

	.page-not-found {
		background-color: #000 !important;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='42' height='58' viewBox='0 0 42 58'%3E%3Cg fill='%23dddcdd' fill-opacity='0.23'%3E%3Cpath fill-rule='evenodd' d='M12 18h12v18h6v4H18V22h-6v-4zm-6-2v-4H0V0h36v6h6v36h-6v4h6v12H6v-6H0V16h6zM34 2H2v8h24v24h8V2zM6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM2 50h32v-8H10V18H2v32zm28-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'/%3E%3C/g%3E%3C/svg%3E");
	}

	section.page-not-found {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 5%;
		height: 100vh;
	}

	section.page-not-found h1 {
		color: red;
		font-size: 10rem;
	}

	section.page-not-found h2 {
		font-size: 5rem;
	}

	section.page-not-found h1,
	h2,
	h3 {
		margin-bottom: 4rem;
	}

	div.text {
		height: 50vh;
	}

	div.text a {
		text-decoration: none;
		margin-right: 2rem;
	}

	div.text a:hover {
		color: red;
		text-decoration: underline;
	}

	@media only screen and (max-width: 768px) {
		section.page-not-found {
			flex-direction: column;
			justify-content: space-around;
		}
		section.page-not-found div.img img {
			width: 70vw;
			height: auto;
		}
		section.page-not-found h1 {
			font-size: 5rem;
		}
		section.page-not-found h2 {
			font-size: 2.5rem;
		}
		div.text a:active {
			color: red;
			text-decoration: underline;
		}
	}
</style>
