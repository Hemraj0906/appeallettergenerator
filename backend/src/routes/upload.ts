import { Hono } from 'hono';

const router = new Hono();

router.post('/', async (c) => {
    try {
        const body = await c.req.parseBody();
        const file = body['file'] as unknown as File;

        if (!file) {
            return c.json({ error: 'No file uploaded.' }, 400);
        }

        const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return c.json({ error: 'Unsupported file type. Upload PDF, PNG, JPG, or WebP.' }, 400);
        }

        const mockExtraction = {
            text: `DENIAL OF CLAIM NOTIFICATION\n\nDear Member,\n\nAfter review of your claim for the medical service described below, we have determined that the requested service does not meet our criteria for medical necessity.\n\nClaim Number: CLM-2024-${Math.random().toString(36).substring(7).toUpperCase()}\nDate of Service: ${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}\nAmount: $${(Math.floor(Math.random() * 50) + 5) * 100}\nReason: Not Medically Necessary\n\nYou have the right to appeal this decision within 180 days.`,
            denialReason: 'not-medically-necessary',
            insurer: '',
            amount: (Math.floor(Math.random() * 50) + 5) * 100,
            claimNumber: `CLM-2024-${Math.random().toString(36).substring(7).toUpperCase()}`,
            dateOfDenial: new Date().toLocaleDateString(),
            confidence: 75,
        };

        return c.json(mockExtraction);
    } catch (error) {
        console.error('Upload API Error:', error);
        return c.json({ error: 'Failed to process file.' }, 500);
    }
});

export default router;
