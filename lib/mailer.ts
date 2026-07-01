/**
 * Mail delivery stub.
 *
 * Real SMTP/provider integration is deployment-specific infrastructure (same
 * category as object storage — see master plan §9). Until a provider is wired
 * in, messages are logged to the server console so the verification flow is
 * fully testable in local dev: the verification URL appears in the terminal.
 */
export async function sendMail(options: { to: string; subject: string; text: string }) {
  // TODO: replace with a real provider (nodemailer/SES/etc.) per deployment.
  console.log(
    [
      "────────────────────────────────────────────",
      `[mail] To: ${options.to}`,
      `[mail] Subject: ${options.subject}`,
      options.text,
      "────────────────────────────────────────────",
    ].join("\n")
  );
}

export async function sendVerificationEmail(to: string, token: string) {
  const baseUrl = process.env.NEXTAUTH_URL ?? process.env.AUTH_URL ?? "http://localhost:3000";
  const url = `${baseUrl}/verify?token=${token}`;
  await sendMail({
    to,
    subject: "Verify your email address",
    text: `Welcome! Please verify your email address by opening this link:\n\n${url}\n\nThis link expires in 24 hours.`,
  });
}
