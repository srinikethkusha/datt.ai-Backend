import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { ApplicationStatus } from '@prisma/client';
import { join } from 'path';

import { EmailService } from 'src/email/email.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { JobService } from 'src/job/job.service';

import {
  CreateApplicationDto,
  SendInterviewEmailDto,
  SendOfferLetterDto,
  UpdateApplicationStatusDto,
} from './application.dto';
import {
  ApplicationRepository,
  ApplicationWithJob,
} from './application.repository';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly jobService: JobService,
    private readonly fileUploadService: FileUploadService,
    private readonly emailService: EmailService,
  ) {}

  async submitApplication(
    dto: CreateApplicationDto,
    resume: Express.Multer.File,
  ) {
    const job = await this.jobService.getActiveJob(dto.jobId);
    const resumePath = this.fileUploadService.saveResume(resume);

    const application = await this.applicationRepository.create({
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      location: dto.location,
      yearsOfExperience: dto.yearsOfExperience,
      skills: dto.skills,
      linkedIn: dto.linkedIn,
      portfolio: dto.portfolio,
      coverLetter: dto.coverLetter,
      resumePath,
      job: { connect: { id: job.id } },
    });

    try {
      await this.emailService.sendHrApplicationNotification(
        application,
        job,
        resumePath,
      );
      await this.emailService.sendCandidateConfirmation(application, job);
    } catch {
      // Application saved; email failure logged in EmailService
    }

    return application;
  }

  async getApplications(
    jobId?: string,
    status?: ApplicationStatus,
    search?: string,
  ): Promise<ApplicationWithJob[]> {
    return this.applicationRepository.findAll({ jobId, status, search });
  }

  async getApplication(id: string): Promise<ApplicationWithJob> {
    const application = await this.applicationRepository.findById(id);
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return application as ApplicationWithJob;
  }

  async updateStatus(id: string, dto: UpdateApplicationStatusDto) {
    await this.getApplication(id);
    return this.applicationRepository.updateStatus(id, dto.status);
  }

  async getResumeFile(id: string): Promise<StreamableFile> {
    const application = await this.getApplication(id);
    const path = application.resumePath.startsWith('/')
      ? application.resumePath
      : join(process.cwd(), application.resumePath);

    if (!existsSync(path)) {
      throw new NotFoundException('Resume file not found');
    }

    const file = createReadStream(path);
    return new StreamableFile(file);
  }

  async sendInterviewEmail(id: string, dto: SendInterviewEmailDto) {
    const application = await this.getApplication(id);
    await this.emailService.sendInterviewEmail(
      application,
      dto.subject,
      dto.body,
    );
    return { message: 'Interview email sent' };
  }

  async sendOfferLetter(id: string, dto: SendOfferLetterDto) {
    const application = await this.applicationRepository.findById(id);
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    await this.emailService.sendOfferLetter(
      application,
      dto.subject,
      dto.body,
    );

    return this.applicationRepository.updateStatus(
      id,
      ApplicationStatus.OFFER_SENT,
    );
  }
}
