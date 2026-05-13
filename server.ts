import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending email
  app.post("/api/send-email", async (req, res) => {
    const { firstName, lastName, email, subject, message } = req.body;

    const emailUser = process.env.EMAIL_USER;
    const emailAppPassword = process.env.EMAIL_APP_PASSWORD;

    if (!emailUser || !emailAppPassword) {
      return res.status(500).json({ 
        success: false, 
        message: "Email credentials not configured on the server. Please set EMAIL_USER and EMAIL_APP_PASSWORD." 
      });
    }

    try {
      // Create reusable transporter object using the default SMTP transport
      // This uses Google's SMTP. Ensure the account has 2-step verification and App Password generated.
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailAppPassword,
        },
      });

      // Send mail with defined transport object
      await transporter.sendMail({
        from: `"${firstName} ${lastName}" <${email}>`, // sender address
        to: emailUser, // list of receivers (we'll send it to the configured email)
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`, // Subject line
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`, // plain text body
      });

      res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // @ts-ignore
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
