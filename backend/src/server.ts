import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import draftRouter from './routes/draft';
import chargebackRouter from './routes/chargeback';
import uploadRouter from './routes/upload';
import sendEmailRouter from './routes/sendEmail';

type Bindings = {
    OPENAI_API_KEY: string;
    RESEND_API_KEY: string;
}

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

// Middleware
app.use('*', cors());

// Routes
app.route('/draft', draftRouter);
app.route('/chargeback', chargebackRouter);
app.route('/upload', uploadRouter);
app.route('/send-email', sendEmailRouter);

app.get('/health', (c) => {
    return c.json({ status: 'ok', message: 'Backend is running on Cloudflare Workers' });
});

const port = 8787;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});

export default app;
