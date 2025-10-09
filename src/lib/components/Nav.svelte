<script lang="ts">
	import type { Snippet } from "svelte";

	type NavType = {
		children: Snippet;
		rightContent?: Snippet;
	};

	let { children, rightContent }: NavType = $props();
</script>

<nav class="sticky top-0 z-50 w-full border-b border-border/40 bg-primary">
	<div
		class="container mx-auto max-w-7xl w-full flex h-14 items-center justify-between sm:px-6 lg:px-8"
	>
		<div class="flex items-center space-x-1 text-primary-foreground">
			{@render children()}
		</div>
		{#if rightContent}
			<div class="flex items-center text-primary-foreground">
				{@render rightContent()}
			</div>
		{/if}
	</div>
</nav>
