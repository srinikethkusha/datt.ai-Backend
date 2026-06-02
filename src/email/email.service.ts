import { Injectable, Logger } from '@nestjs/common';
import { Application, JobPosting } from '@prisma/client';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter | null = null;

  private getTransporter(): nodemailer.Transporter | null {
    if (this.transporter) {
      return this.transporter;
    }

    const host = process.env.SMTP_HOST;
    if (!host) {
      return null;
    }

    this.transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
    });

    return this.transporter;
  }

  private async sendMail(options: {
    to: string;
    subject: string;
    text: string;
    attachments?: nodemailer.SendMailOptions['attachments'];
  }): Promise<void> {
    const from = process.env.EMAIL_FROM ?? 'noreply@datt.ai';
    const transporter = this.getTransporter();

    if (!transporter) {
      this.logger.log(
        `[Email dev] To: ${options.to} | Subject: ${options.subject}\n${options.text}`,
      );
      return;
    }

    await transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      attachments: options.attachments,
    });
  }

  async sendHrApplicationNotification(
    application: Application,
    job: JobPosting,
    resumePath: string,
  ): Promise<void> {
    const hrEmail = process.env.HR_EMAIL ?? 'hr@datt.ai';
    const text = [
      `New application for: ${job.title}`,
      ``,
      `Name: ${application.fullName}`,
      `Email: ${application.email}`,
      `Phone: ${application.phone}`,
      `Location: ${application.location}`,
      `Experience: ${application.yearsOfExperience} years`,
      `Skills: ${application.skills}`,
      `Applied at: ${application.appliedAt.toISOString()}`,
    ].join('\n');

    await this.sendMail({
      to: hrEmail,
      subject: `New application: ${job.title} — ${application.fullName}`,
      text,
      attachments: resumePath
        ? [{ path: resumePath, filename: 'resume' }]
        : undefined,
    });
  }

  async sendCandidateConfirmation(
    application: Application,
    job: JobPosting,
  ): Promise<void> {
    await this.sendMail({
      to: application.email,
      subject: 'Application Submitted Successfully — Datt.ai',
      text: [
        `Thank you for applying at Datt.ai. Your application has been received successfully for the position: ${job.title}.`,
        ``,
        `Our HR and technical team will review your profile and contact you regarding next steps.`,
      ].join('\n'),
    });
  }

  async sendInterviewEmail(
    application: Application,
    subject: string,
    body: string,
  ): Promise<void> {
    await this.sendMail({
      to: application.email,
      subject,
      text: body,
    });
  }

  async sendOfferLetter(
    application: Application,
    subject: string,
    body: string,
    offerPdfPath?: string,
  ): Promise<void> {
    await this.sendMail({
      to: application.email,
      subject,
      text: body,
      attachments: offerPdfPath
        ? [{ path: offerPdfPath, filename: 'offer-letter.pdf' }]
        : undefined,
    });
  }
}
