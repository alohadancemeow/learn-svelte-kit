<script lang="ts">
    import ProductCard from "$lib/components/ProductCard.svelte";

    let { data } = $props();
</script>

<div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each data.products as product}
            <ProductCard {...product} />
        {/each}
    </div>
</div>
