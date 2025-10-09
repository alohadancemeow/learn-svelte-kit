<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Form from "$lib/components/ui/form/index.js";
    import { superForm } from "sveltekit-superforms";
    import { Input } from "$lib/components/ui/input/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Loader } from "@lucide/svelte";

    let { data } = $props();
    const form = superForm(data.form);
    const { form: formData, enhance, delayed, message } = form;
</script>

<form method="POST" class="mx-auto max-w-xl" action="/orders" use:enhance>
    <Card.Root>
        <Card.Header>
            <Card.Title>My Order</Card.Title>
            <Card.Description>
                Enter Your email and we will email you your order history and
                download link
            </Card.Description>
        </Card.Header>
        <Card.Content>
            <Form.Field {form} name="email">
                <Form.Control>
                    {#snippet children({ props })}
                        <Form.Label>Email</Form.Label>
                        <Input {...props} bind:value={$formData.email} />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </Card.Content>
        <Card.Footer>
            <div class="flex flex-col justify-center items-center w-full">
                <Button type="submit" class="w-full cursor-pointer mb-3">
                    {#if $delayed}
                        <Loader class="size-4 animate-spin" />
                    {:else}
                        send
                    {/if}
                </Button>
                {#if $message}
                    <div class="text-red-500">
                        {$message}
                    </div>
                {/if}
            </div>
        </Card.Footer>
    </Card.Root>
</form>
