import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { CreateApplicationDto } from './application.dto';
import { ApplicationService } from './application.service';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('resume', {
      storage: memoryStorage(),
    }),
  )
  async submit(
    @Body() dto: CreateApplicationDto,
    @UploadedFile() resume: Express.Multer.File,
  ) {
    return this.applicationService.submitApplication(dto, resume);
  }
}
