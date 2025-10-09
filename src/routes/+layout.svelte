<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<main class="bg-background w-full min-h-screen font-sans antialiased relative">
	{@render children()}
</main>
