import { loginSchema } from "$lib/formSchema.js";
import { fail, redirect } from "@sveltejs/kit";
// import { generateId } from "lucia";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { Argon2id } from "oslo/password";
import { db, lucia } from "../../hooks.server.js";
import type { PageServerLoad, Actions } from "./$types.js";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(loginSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod4(loginSchema));

    if (!form.valid) {
      return fail(400, { form });
    }
    // const userId = generateId(15);
    // const hashedPassword = await new Argon2id().hash(form.data.password);
    // await db.user.create({
    // 	data: {
    // 		email: 'sphade@gmail.com',
    // 		hashPassword: hashedPassword,
    // 		username: form.data.username,
    // 		isAdmin: true,
    // 		id: userId
    // 	}
    // });
    // const session = await lucia.createSession(userId, {});
    // const sessionCookie = lucia.createSessionCookie(session.id);
    // event.cookies.set(sessionCookie.name, sessionCookie.value, {
    // 	path: '.',
    // 	...sessionCookie.attributes
    // });

    const existingUser = await db.user.findUnique({
      where: { username: form.data.username.toLowerCase() },
    });

    console.log(existingUser, 'existing user');


    if (!existingUser) {
      return;
    }

    const validPassword = await new Argon2id().verify(
      existingUser.hashPassword!,
      form.data.password
    );

    if (!validPassword) {
      return;
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    redirect(302, "/admin");
  },
};
