import { addFormSchema } from '$lib/formSchema.js';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import fs from 'fs/promises';
import { redirect } from '@sveltejs/kit';
import { db } from '../../../../hooks.server.js';

export const load = async () => {
    return {
        form: await superValidate(zod4(addFormSchema))
    };
};
export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod4(addFormSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        // saving files to the filesystem
        await fs.mkdir('products', { recursive: true });
        const filePath = `products/${Math.random()}-${form.data.file.name}`;

        // writeing files to the filesystem
        await fs.writeFile(filePath, Buffer.from(await form.data.file.arrayBuffer()));
        await fs.mkdir('static/products', { recursive: true });

        // writing files to the static folder
        const imagePath = `/products/${Math.random()}-${form.data.image.name}`;
        await fs.writeFile(`static${imagePath}`, Buffer.from(await form.data.image.arrayBuffer()));

        try {
            await db.product.create({
                data: {
                    name: form.data.name,
                    description: form.data.description,
                    priceInCents: form.data.priceInCents,
                    filePath,
                    imagePath,
                    isAvailableForPurchase: false
                }
            });
        } catch (error) {
            console.log(error);
        }

        redirect(303, '/admin/products');
    }
};