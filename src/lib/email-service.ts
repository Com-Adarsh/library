const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'sfiimscsubcommittee25@gmail.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@imsc-commons.vercel.app';

interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html: string;
}

async function sendWithSendGrid(params: SendEmailParams) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) throw new Error('SENDGRID_API_KEY is not configured');

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: params.to }],
          subject: params.subject,
        },
      ],
      from: { email: EMAIL_FROM, name: 'IMSC Commons' },
      content: [
        { type: 'text/plain', value: params.text },
        { type: 'text/html', value: params.html },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SendGrid error: ${response.status} ${errorText}`);
  }
}

async function sendWithResend(params: SendEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend error: ${response.status} ${errorText}`);
  }
}

export async function sendEmail(params: SendEmailParams) {
  if (process.env.SENDGRID_API_KEY) {
    return sendWithSendGrid(params);
  }

  if (process.env.RESEND_API_KEY) {
    return sendWithResend(params);
  }

  console.warn('No transactional email provider configured. Email skipped:', params);
}

export async function sendAdminApprovalEmail(options: {
  resourceId: string;
  title: string;
  subject: string;
  semester: string;
  category: string;
  uploaderName: string;
  uploaderEmail: string;
  fileName: string;
  previewUrl?: string;
  approveUrl: string;
  rejectUrl: string;
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #0f172a;">
      <h2>New Resource Contribution!</h2>
      <p><strong>Uploader:</strong> ${options.uploaderName}</p>
      <p><strong>Email:</strong> ${options.uploaderEmail}</p>
      <p><strong>Category:</strong> ${options.category} / Semester ${options.semester}</p>
      <p><strong>Document:</strong> ${options.fileName}</p>
      <p><strong>Subject:</strong> ${options.subject}</p>
      ${options.previewUrl ? `<p><strong>Preview:</strong> <a href="${options.previewUrl}">View PDF</a></p>` : ''}
      <p>Does this meet the sub-committee's academic standards?</p>
      <div style="margin: 24px 0; display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="${options.approveUrl}" style="background: #16a34a; color: #fff; text-decoration: none; padding: 12px 18px; border-radius: 8px; display: inline-block;">✅ ACCEPT & PUBLISH</a>
        <a href="${options.rejectUrl}" style="background: #dc2626; color: #fff; text-decoration: none; padding: 12px 18px; border-radius: 8px; display: inline-block;">❌ REJECT & DELETE</a>
      </div>
      <p style="font-size: 14px; color: #475569;">This action is protected with a secure admin token.</p>
    </div>
  `;

  const text = `New Resource Contribution!\nUploader: ${options.uploaderName}\nEmail: ${options.uploaderEmail}\nCategory: ${options.category} / Semester ${options.semester}\nDocument: ${options.fileName}\nSubject: ${options.subject}\nApprove: ${options.approveUrl}\nReject: ${options.rejectUrl}`;

  await sendEmail({
    to: process.env.ADMIN_NOTIFICATION_EMAIL || ADMIN_EMAIL,
    subject: 'New Resource Contribution Pending Approval',
    text,
    html,
  });
}

export async function sendUploaderNotification(options: {
  uploaderEmail?: string;
  uploaderName?: string;
  title: string;
  accepted: boolean;
  resourceUrl?: string;
}) {
  if (!options.uploaderEmail) return;

  const statusMessage = options.accepted
    ? 'Your resource has been approved and published to the library.'
    : 'Your resource has been rejected and removed from the pending queue.';

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0f172a;">
      <h2>${options.accepted ? 'Thank You!' : 'Update on Your Upload'}</h2>
      <p>Hi ${options.uploaderName || 'Contributor'},</p>
      <p>${statusMessage}</p>
      <p><strong>Document:</strong> ${options.title}</p>
      ${options.accepted && options.resourceUrl ? `<p><strong>Live Link:</strong> <a href="${options.resourceUrl}">View Published Resource</a></p>` : ''}
      <p>Thank you for contributing to the IMSC Commons.</p>
    </div>
  `;

  const text = `${statusMessage}\nDocument: ${options.title}${options.accepted && options.resourceUrl ? `\nLive Link: ${options.resourceUrl}` : ''}`;

  await sendEmail({
    to: options.uploaderEmail,
    subject: options.accepted ? 'Your Upload Has Been Approved' : 'Your Upload Has Been Rejected',
    text,
    html,
  });
}
