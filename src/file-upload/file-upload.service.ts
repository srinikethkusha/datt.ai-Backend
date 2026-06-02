import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

@Injectable()
export class FileUploadService {
  private readonly uploadDir: string;
  private readonly maxSizeBytes: number;

  constructor() {
    this.uploadDir = process.env.UPLOAD_DIR ?? './uploads';
    this.maxSizeBytes =
      (Number(process.env.UPLOAD_MAX_SIZE_MB) || 5) * 1024 * 1024;

    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  saveResume(file: Express.Multer.File): string {
    if (!file) {
      throw new BadRequestException('Resume file is required');
    }

    if (file.size > this.maxSizeBytes) {
      throw new BadRequestException('Resume file exceeds maximum size');
    }

    const extension = extname(file.originalname).toLowerCase();
    if (
      !ALLOWED_EXTENSIONS.includes(extension) ||
      !ALLOWED_MIME_TYPES.includes(file.mimetype)
    ) {
      throw new BadRequestException(
        'Resume must be PDF, DOC, or DOCX format',
      );
    }

    const filename = `${randomUUID()}${extension}`;
    const filepath = join(this.uploadDir, filename);
    writeFileSync(filepath, file.buffer);

    return filepath;
  }

  getAbsolutePath(relativePath: string): string {
    return join(process.cwd(), relativePath);
  }
}
