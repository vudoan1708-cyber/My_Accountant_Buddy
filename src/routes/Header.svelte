<script>
	import { page } from '$app/stores';

	let calculationSectionOpen = false;

	const menuList = () => {
		calculationSectionOpen = !calculationSectionOpen;
	};
</script>

<header>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/" on:click={() => { calculationSectionOpen = false; }}>Home</a>
			</li>
			<li aria-current={$page.url.pathname.includes('/calculation') ? 'page' : undefined}>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span role="button" tabindex="0" on:click={menuList}>Calculation</span>
				{#if calculationSectionOpen}
					<div class="sub_menu">
						<a href="/calculation" on:click={() => { calculationSectionOpen = false; }}>
							Compounding Interest Rate
						</a>

						<hr />

						<a href="/calculation/dcf" on:click={() => { calculationSectionOpen = false; }}>
							DCF valuation
						</a>
					</div>
				{/if}
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: center;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
		--background-submenu: rgba(255, 255, 255, 0.9);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a,
	nav span[role="button"] {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		cursor: pointer;
		user-select: none;
		transition: color 0.2s linear;
	}

	a:hover,
	span[role="button"]:hover {
		color: var(--color-theme-1);
	}

	.sub_menu {
		position: absolute;
		top: 100%;
		/* width: 200%; */
		background-color: var(--background-submenu);
		border-radius: var(--border-radius);
		padding: var(--padding) calc(var(--padding) / 2);
		width: fit-content;
		display: flex;
		flex-direction: column;
		gap: calc(var(--margin) / 2);
	}
	.sub_menu a {
		font-size: 0.75rem;
	}

	hr {
		width: 100%;
	}
</style>
