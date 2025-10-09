import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';
import { db } from '../../../hooks.server.js';
// import { Resend } from 'resend';
// import { RESEND_API_KEY, SENDER_EMAIL } from '$env/static/private';

const schema = z.object({
    email: z.email()
});

// const resend = new Resend(RESEND_API_KEY);

export const load = async () => {
    return {
        form: await superValidate(zod4(schema))
    };
};

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod4(schema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const user = await db.user.findUnique({
            where: { email: form.data.email },
            select: {
                email: true,
                Order: {
                    select: {
                        pricePaidInCents: true,
                        id: true,
                        createdAt: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                imagePath: true,
                                description: true
                            }
                        }
                    }
                }
            }
        });

        console.log(user, 'user');

        if (user === null) {
            return message(
                form,
                'no user found with that email'
            );
        }

        const orders = user?.Order.map(async (order) => {
            return {
                ...order,
                downloadVerificationId: (
                    await db.downloadVerification.create({
                        data: {
                            expiredAt: new Date(Date.now() + 24 * 1000 * 60 * 60),
                            productId: order.product.id
                        }
                    })
                ).id
            };
        });

        // send email
        // try {
        //     const { data, error } = await resend.emails.send({
        //         from: `support <${SENDER_EMAIL}>`,
        //         to: user.email,
        //         subject: 'Order History',
        //         html: '<strong>this are your orders</strong>'
        //     });

        //     if (error) {
        //         console.log(error, 'email send error');
        //         return Response.json({ error }, { status: 500 });
        //     }
        //     console.log(data, 'data');

        // } catch (error) {
        //     console.log(error, 'email send error');
        //     return Response.json({ error }, { status: 500 });
        // }

        /** 
         * {
            statusCode: 403,
            message: 'The example.com domain is not verified. Please, add and verify your domain on https://resend.com/domains',
            name: 'validation_error'
            } email send error
        */


        console.log(orders, 'orders');

        // return message(form, 'check your email to view your order history and download your products');
        return message(form, 'This function is still under development.');
    }
};