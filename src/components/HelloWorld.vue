<template>
	<div class="hello">
		<h1 class="header">{{ msg }}</h1>
	</div>
</template>

<script>
	export default {
		name: "HelloWorld",
		props: {
			msg: String,
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.header {
		font-size: 128px;
		font-weight: 800;
		line-height: 141px;
		letter-spacing: 0em;
		text-align: left;
    text-transform: uppercase;
	}
</style>
