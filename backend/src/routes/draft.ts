import { Hono } from 'hono';
import { generateAppeal } from '../lib/aiEngine';
import { AppealRequest } from '../types';

const router = new Hono<{ Bindings: { OPENAI_API_KEY: string } }>();

router.post('/', async (c) => {
    try {
        const body = await c.req.json() as AppealRequest;

        if (!body.insurer || !body.state || !body.reason) {
            return c.json({ error: 'Missing required fields: insurer, state, and reason are required.' }, 400);
        }

        // Pass Cloudflare Environment variables to the engine
        const result = await generateAppeal(body, c.env);
        return c.json(result);
    } catch (error) {
        console.error('Draft API Error:', error);
        return c.json({ error: 'Failed to generate appeal letter. Please try again.' }, 500);
    }
});

export default router;
