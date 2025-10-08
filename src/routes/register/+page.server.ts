import { userSchema } from "$lib/formSchema.js";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { Argon2id } from "oslo/password";
import { db, lucia } from "../../hooks.server.js";
import type { PageServerLoad, Actions } from "./$types.js";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(userSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod4(userSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const existingUser = await db.user.findUnique({
      where: { email: form.data.email },
    });

    if (existingUser) {
      form.errors.email = ["User with this email already exists"];
      return fail(400, { form });
    }


    // create admin user if not exists
    if (!existingUser) {
      const userId = generateId(15);
      const hashedPassword = await new Argon2id().hash(form.data.password);

      const user = await db.user.create({
        data: {
          email: form.data.email,
          hashPassword: hashedPassword,
          username: form.data.username,
          isAdmin: true,
          id: userId
        }
      });

      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });
    }

    redirect(302, "/admin");
  },
};
