<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import Nav from "$lib/components/Nav.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";

  let { children } = $props();
  const pathname = $derived(page.url.pathname);
</script>

{#snippet navLink({ href, text }: { href: string; text: string })}
  <a
    class={cn(
      "px-3 py-2 rounded-md text-sm font-medium capitalize transition-colors hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10 focus-visible:outline-none",
      pathname === href &&
        "bg-primary-foreground/20 text-primary-foreground font-semibold",
    )}
    {href}>{text}</a
  >
{/snippet}

{#snippet rightContent()}
  <form method="post" use:enhance action="/admin">
    <Button
      variant="destructive"
      type="submit"
      class="px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10 focus-visible:outline-none text-primary-foreground"
    >
      Sign out
    </Button>
  </form>
{/snippet}

<Nav {rightContent}>
  {@render navLink({ href: "/", text: "home" })}
  {@render navLink({ href: "/admin", text: "dashboard" })}
  {@render navLink({ href: "/admin/products", text: "products" })}
  {@render navLink({ href: "/admin/users", text: "Customers" })}
  {@render navLink({ href: "/admin/orders", text: "Sales" })}
</Nav>
<div class="container my-6 mx-auto">
  {@render children()}
</div>
