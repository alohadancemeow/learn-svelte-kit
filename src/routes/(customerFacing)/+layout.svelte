<script lang="ts">
    import { page } from "$app/state";
    import Nav from "$lib/components/Nav.svelte";
    import { cn } from "$lib/utils.js";

    let { children } = $props();
    const pathname = $derived(page.url.pathname);
</script>

{#snippet rightContent()}
    <a
        href="/admin"
        class="px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10 focus-visible:outline-none text-primary-foreground"
    >
        Admin Panel
    </a>
{/snippet}

<Nav {rightContent}>
    {@render navLink({ href: "/", text: "home" })}
    {@render navLink({ href: "/products", text: "products" })}
    {@render navLink({ href: "/orders ", text: "my Orders" })}
</Nav>

<div class="container my-6 mx-auto">
    {@render children()}
</div>

{#snippet navLink({ href, text }: { href: string; text: string })}
    <a
        class={cn(
            "px-3 py-2 rounded-md text-sm font-medium capitalize transition-colors hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10 focus-visible:outline-none",
            pathname === href &&
                "bg-primary-foreground/20 text-primary-foreground font-semibold",
        )}
        {href}
    >
        {text}
    </a>
{/snippet}
