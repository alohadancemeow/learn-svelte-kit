<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Loader } from "@lucide/svelte";
  import * as Form from "$lib/components/ui/form/index.js";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { loginSchema, type loginSchemaType } from "$lib/formSchema.js";

  let { data }: { data: { form: SuperValidated<Infer<loginSchemaType>> } } =
    $props();
  const form = superForm(data.form, {
    validators: zod4Client(loginSchema),
  });
  const { form: formData, enhance, delayed } = form;
</script>

<form use:enhance method="POST" class="grid h-screen w-full place-items-center">
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title class="text-2xl">Login</Card.Title>
      <Card.Description
        >Enter your username and password below to login to your account.</Card.Description
      >
    </Card.Header>
    <Card.Content class="grid gap-4">
      <Form.Field {form} name="username">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Username</Form.Label>
            <Input {...props} bind:value={$formData.username} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="password">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Password</Form.Label>
            <Input type="password" {...props} bind:value={$formData.password} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    </Card.Content>
    <Card.Footer class="flex gap-3">
      <Button class="cursor-pointer" type="submit">
        {#if $delayed}
          <Loader class="size-4 animate-spin" />
        {:else}
          Sign in
        {/if}
      </Button>
      <a href="/register" class="text-sm text-muted-foreground"
        >Don't have an account? Sign up</a
      >
    </Card.Footer>
  </Card.Root>
</form>
