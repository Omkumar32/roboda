import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "dynamicData.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, service, date, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    // 1. Read current portfolio dynamic data
    let currentData: any = {};
    try {
      const fileContent = await readFile(DATA_FILE_PATH, "utf-8");
      currentData = JSON.parse(fileContent);
    } catch (readErr) {
      console.warn("Could not read dynamicData.json:", readErr);
    }

    // 2. Create the inquiry item
    const newInquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim(),
      service: service || "General Inquiry",
      date: date || "",
      message: message ? message.trim() : "",
      createdAt: new Date().toISOString(),
      status: "new",
    };

    // 3. Save inquiry to persistent storage
    const inquiries = [newInquiry, ...(currentData.inquiries || [])];
    currentData.inquiries = inquiries;
    currentData.updatedAt = new Date().toISOString();

    try {
      await writeFile(DATA_FILE_PATH, JSON.stringify(currentData, null, 2), "utf-8");
    } catch (saveErr) {
      console.error("Failed to save inquiry:", saveErr);
    }

    // 4. If SMTP is configured and enabled, send email notification
    const smtp = currentData.smtp;
    let emailSent = false;
    let emailError: string | null = null;

    if (smtp && smtp.enabled && smtp.host && smtp.user && smtp.pass) {
      try {
        const portNumber = parseInt(smtp.port, 10) || 587;
        const transporter = nodemailer.createTransport({
          host: smtp.host,
          port: portNumber,
          secure: Boolean(smtp.secure || portNumber === 465),
          auth: {
            user: smtp.user,
            pass: smtp.pass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const recipient = smtp.toEmail || smtp.user;
        const fromAddress = smtp.fromEmail
          ? `"${smtp.fromName || "Portfolio Inquiries"}" <${smtp.fromEmail}>`
          : `"${smtp.fromName || "Portfolio Inquiries"}" <${smtp.user}>`;

        await transporter.sendMail({
          from: fromAddress,
          to: recipient,
          replyTo: email,
          subject: `✨ New Inquiry: ${name} (${service || "Portfolio"})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #FAF9F5; border: 1px solid #E2E0D8; border-radius: 16px; color: #22221F;">
              <div style="padding-bottom: 16px; border-bottom: 2px solid #596637;">
                <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #596637;">Anurag Studio · New Inquiry</span>
                <h1 style="margin: 8px 0 0 0; font-size: 24px; font-weight: 800; color: #1E252B;">Inquiry from ${name}</h1>
              </div>

              <div style="margin: 20px 0; padding: 16px; background: #FFFFFF; border-radius: 12px; border: 1px solid #ECEAE1;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 0; color: #77766F; width: 120px;">Client Name:</td>
                    <td style="padding: 6px 0; font-weight: 600; color: #1E252B;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #77766F;">Client Email:</td>
                    <td style="padding: 6px 0; font-weight: 600; color: #2D6A75;"><a href="mailto:${email}" style="color: #2D6A75; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #77766F;">Service Needed:</td>
                    <td style="padding: 6px 0; font-weight: 600; color: #1E252B;">${service || "Not specified"}</td>
                  </tr>
                  ${date ? `
                  <tr>
                    <td style="padding: 6px 0; color: #77766F;">Target Date:</td>
                    <td style="padding: 6px 0; font-weight: 600; color: #1E252B;">${date}</td>
                  </tr>
                  ` : ""}
                </table>
              </div>

              <div style="margin: 20px 0;">
                <h3 style="font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #77766F; margin-bottom: 8px;">Project Details / Message:</h3>
                <div style="padding: 16px; background: #FFFFFF; border-radius: 12px; border: 1px solid #ECEAE1; font-size: 14px; line-height: 1.6; color: #333330; white-space: pre-wrap;">
${message || "No additional message provided."}
                </div>
              </div>

              <div style="padding-top: 16px; border-top: 1px solid #E2E0D8; text-align: center;">
                <a href="mailto:${email}?subject=Re:%20Your%20Inquiry%20with%20Anurag%20Studio" style="display: inline-block; padding: 10px 24px; background: #596637; color: #FFFFFF; text-decoration: none; border-radius: 9999px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Reply Directly to ${name} ↗</a>
              </div>
            </div>
          `,
        });
        emailSent = true;
      } catch (smtpErr: any) {
        console.error("SMTP sending error:", smtpErr);
        emailError = smtpErr?.message || "Could not dispatch email via SMTP";
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been received.",
      inquiry: newInquiry,
      emailSent,
      emailError,
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process inquiry." },
      { status: 500 }
    );
  }
}
