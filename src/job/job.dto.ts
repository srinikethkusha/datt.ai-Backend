import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EmploymentType, JobStatus } from '@prisma/client';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @IsString()
  @IsNotEmpty()
  experience: string;

  @IsString()
  @IsNotEmpty()
  skills: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  salary?: string;

  @IsEnum(JobStatus)
  @IsOptional()
  status?: JobStatus;

  @IsDateString()
  deadline: string;
}

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEnum(EmploymentType)
  @IsOptional()
  employmentType?: EmploymentType;

  @IsString()
  @IsOptional()
  experience?: string;

  @IsString()
  @IsOptional()
  skills?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  salary?: string;

  @IsEnum(JobStatus)
  @IsOptional()
  status?: JobStatus;

  @IsDateString()
  @IsOptional()
  deadline?: string;
}

export class UpdateJobStatusDto {
  @IsEnum(JobStatus)
  status: JobStatus;
}
