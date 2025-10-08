<script lang="ts">
  import PageHeader from "$lib/components/PageHeader.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { formatCurrency, formatNumber } from "$lib/utils.js";
  import { CheckCircle, MoreVertical, XCircle } from "@lucide/svelte";
  import { enhance } from "$app/forms";

  let { data } = $props();
</script>

<div class="flex items-center justify-between gap-4">
  <PageHeader>Products</PageHeader>
  <Button href="/admin/products/new">Add Product</Button>
</div>
{#if data.products.length === 0}
  <p>no product found</p>
{:else}
  {@render productsTable()}
{/if}

{#snippet productsTable()}
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-0">
          <span class="sr-only">Available for purchase</span>
        </Table.Head>
        <Table.Head>name</Table.Head>
        <Table.Head>Price</Table.Head>
        <Table.Head class="">Order</Table.Head>
        <Table.Head class="w-0 text-right">
          <span class="sr-only">Actions</span>
        </Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each data.products as product}
        <Table.Row>
          <Table.Cell>
            {#if product.isAvailableForPurchase}
              <span class="sr-only">available</span>
              <CheckCircle />
            {:else}
              <span class="sr-only">Unavailable</span>

              <XCircle class="stroke-destructive" />
            {/if}
          </Table.Cell>
          <Table.Cell>{product.name}</Table.Cell>
          <Table.Cell>{formatCurrency(product.priceInCents / 100)}</Table.Cell>
          <Table.Cell>{formatNumber(product._count.Order)}</Table.Cell>
          <Table.Cell class="text-right">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <MoreVertical />
                <span class="sr-only"> Actions </span>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <a
                    href={`/admin/products/${product.id}/download`}
                    download
                    class="w-full"
                  >
                    Download
                  </a>
                </DropdownMenu.Item>
                <a href={`/admin/products/${product.id}/edit`} class="w-full">
                  <DropdownMenu.Item>Edit</DropdownMenu.Item>
                </a>
                <form action="?/toggleAvailability" use:enhance method="POST">
                  <button type="submit" class="w-full">
                    <DropdownMenu.Item>
                      {#if product.isAvailableForPurchase}
                        Deactivate
                      {:else}
                        Activate
                      {/if}
                    </DropdownMenu.Item>
                  </button>
                  <input type="hidden" name="id" value={product.id} />
                  <input
                    type="checkbox"
                    name="isAvailableForPurchase"
                    checked={!product.isAvailableForPurchase}
                    class="hidden"
                  />
                </form>
                <DropdownMenu.Separator />
                <form action="?/deleteProduct" use:enhance method="POST">
                  <button
                    class=" w-full text-destructive"
                    disabled={product._count.Order > 0}
                    type="submit"
                  >
                    <DropdownMenu.Item disabled={product._count.Order > 0}>
                      Delete
                    </DropdownMenu.Item>
                  </button>
                  <input type="hidden" name="id" value={product.id} />
                </form>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
{/snippet}
