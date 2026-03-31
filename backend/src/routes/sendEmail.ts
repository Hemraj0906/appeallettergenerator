import { Hono } from "hono";

const router = new Hono<{ Bindings: { RESEND_API_KEY: string } }>();

router.post("/", async (c) => {
  try {
    const { to, subject, body: emailBody, replyTo } = await c.req.json();

    if (!to || !subject || !emailBody) {
      return c.json(
        { error: "Missing required fields: to, subject, body." },
        400,
      );
    }

    if (c.env.RESEND_API_KEY) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: `Appeal Letter Generator <appeals@appeallettergenerator.com>`,
            to: [to],
            subject: subject,
            text: emailBody,
            reply_to: replyTo || undefined,
          }),
        });
        const data: any = await response.json();
        if (response.ok) {
          return c.json({
            success: true,
            messageId: data.id,
            message: "Appeal email sent successfully!",
          });
        } else {
          throw new Error(data.message || "Resend API error");
        }
      } catch (emailError) {
        console.error("Resend error:", emailError);
      }
    }

    return c.json({
      success: true,
      messageId: `mock-${Date.now()}`,
      message: `Appeal email prepared for ${to}. In production, this would be sent via Resend SMTP.`,
      mock: true,
      emailContent: { to, subject, body: emailBody.substring(0, 200) + "..." },
    });
  } catch (error) {
    console.error("Send Email API Error:", error);
    return c.json({ error: "Failed to send email." }, 500);
  }
});

export default router;
