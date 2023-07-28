<script>
	// import welcome from '$lib/images/svelte-welcome.webp';
	// import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="My Accounting Buddy" />
</svelte:head>

<section>
	<h1>My Accounting Buddy</h1>
	<p>
		This is a little accounting software that I make to efficiently learn about finance & accounting
		and to quickly compute and estimate my financial situation
	</p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
