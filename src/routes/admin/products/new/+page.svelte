<script lang="ts">
  import PageHeader from "$lib/components/PageHeader.svelte";
  import { fileProxy, superForm } from "sveltekit-superforms";
  import { Loader } from "@lucide/svelte";
  import * as Form from "$lib/components/ui/form/index.js";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { Input } from "$lib/components/ui/input/index.js";
  import { addFormSchema } from "$lib/formSchema.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { formatCurrency } from "$lib/utils.js";

  let { data } = $props();
  const form = superForm(data.form, {
    validators: zod4Client(addFormSchema),
  });

  const { form: formData, enhance, delayed } = form;
  const image = fileProxy(formData, "image");
  const file = fileProxy(formData, "file");
</script>

<div class="m-auto w-full flex flex-col max-w-lg gap-4">
  <PageHeader>Add Product</PageHeader>

  <form
    method="POST"
    class="space-y-8"
    action="/admin/products/new"
    enctype="multipart/form-data"
    use:enhance
  >
    <Form.Field {form} name="name">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Name</Form.Label>
          <Input {...props} bind:value={$formData.name} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="priceInCents">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Price In Cents</Form.Label>
          <Input type="number" {...props} bind:value={$formData.priceInCents} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <div class="text-muted-foreground">
      {formatCurrency($formData.priceInCents / 100)}
    </div>
    <Form.Field {form} name="description">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Description</Form.Label>
          <Textarea {...props} bind:value={$formData.description} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <!-- Files -->
    <Form.Field {form} name="file">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>File</Form.Label>
          <Input type="file" {...props} bind:files={$file} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="image">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Image</Form.Label>
          <Input type="file" accept="image/*" {...props} bind:files={$image} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Button type="submit">
      {#if $delayed}
        <Loader class="size-4 animate-spin" />
      {:else}
        save
      {/if}
    </Button>
  </form>
</div>
