import { PrismaClient } from '@prisma/client';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';


/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


async function fetch(request, env, ctx): Promise<Response> {
    const neon = new Pool({ connectionString: env.DATABASE_URL });
    const adapter = new PrismaNeon(neon);

    const db = new PrismaClient({ adapter });

    console.log('creating user');
    const user = await db.user.create({
        data: {
            email: 'test-user-11111@test.com'
        }
    });

    console.log('creating sub')
    await db.userSubscription.create({
        data: {
            userId: user.id,
            chargebeeId: 'asdf',
            status: 'asdf',
        },
    });
}

export default {
    fetch
} satisfies ExportedHandler<Env>;
