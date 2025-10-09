<script lang="ts">
    import ProductGridSection from "$lib/components/ProductGridSection.svelte";

    let { data } = $props();
</script>

<main class="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
    <div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        <div class="space-y-16 lg:space-y-20">
            <!-- Hero Section -->
            <section class="text-center py-12 lg:py-16">
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
                    Welcome to Our Store
                </h1>
                <p class="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Discover amazing products curated just for you
                </p>
            </section>

            <!-- Product Sections -->
            <div class="space-y-16 lg:space-y-20">
                <ProductGridSection
                    title="most popular"
                    products={data.mostPopularProducts}
                />
                <ProductGridSection 
                    title="newest" 
                    products={data.newestProducts} 
                />
            </div>
        </div>
    </div>
</main>
