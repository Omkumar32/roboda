import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { host, port, secure, user, pass, fromName, fromEmail, toEmail } = body;

    if (!host || !user || !pass) {
      return NextResponse.json(
        { error: "SMTP Host, Username, and Password are required to test." },
        { status: 400 }
      );
    }

    const portNumber = parseInt(port, 10) || 587;
    const isSecure = Boolean(secure || portNumber === 465);

    // 1. Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: host.trim(),
      port: portNumber,
      secure: isSecure,
      auth: {
        user: user.trim(),
        pass: pass.trim(),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 2. Verify connection
    await transporter.verify();

    // 3. Dispatch a real test email
    const recipient = toEmail?.trim() || user.trim();
    const fromAddress = fromEmail?.trim()
      ? `"${fromName?.trim() || "Anurag Studio Admin"}" <${fromEmail.trim()}>`
      : `"${fromName?.trim() || "Anurag Studio Admin"}" <${user.trim()}>`;

    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipient,
      subject: "✅ Test Email: SMTP Connected Successfully",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 550px; margin: 0 auto; padding: 24px; background: #FAF9F5; border: 1px solid #E2E0D8; border-radius: 16px; color: #22221F;">
          <div style="padding-bottom: 12px; border-bottom: 2px solid #2D6A75;">
            <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #2D6A75;">SMTP Verification</span>
            <h2 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 800; color: #1E252B;">Connection Established!</h2>
          </div>
          <p style="font-size: 14px; line-height: 1.5; color: #555550; margin: 16px 0;">
            Congratulations! Your SMTP settings in the portfolio admin panel are functioning properly. Inquiries submitted via your contact form will now be delivered directly to your inbox.
          </p>
          <div style="padding: 12px 16px; background: #FFFFFF; border: 1px solid #ECEAE1; border-radius: 8px; font-size: 12px; font-family: monospace; color: #444;">
            <div><strong>Host:</strong> ${host}:${portNumber}</div>
            <div><strong>Security:</strong> ${isSecure ? "SSL/TLS (Port 465)" : "STARTTLS (Port 587)"}</div>
            <div><strong>User:</strong> ${user}</div>
            <div><strong>Delivered To:</strong> ${recipient}</div>
            <div><strong>Time:</strong> ${new Date().toLocaleString()}</div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: `Verified! Test email sent successfully to ${recipient}. MessageId: ${info.messageId}`,
    });
  } catch (error: any) {
    console.error("SMTP Test Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to establish connection to SMTP server.",
      },
      { status: 500 }
    );
  }
}
