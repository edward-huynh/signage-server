import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  machine_address: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
