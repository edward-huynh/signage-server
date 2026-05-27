import { Controller, Post, Get, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    const device = await this.deviceService.create(createDeviceDto);
    return {
      success: true,
      message: 'Device registered successfully',
      data: device,
    };
  }

  @Get()
  async findAll() {
    const devices = await this.deviceService.findAll();
    return {
      success: true,
      data: devices,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const device = await this.deviceService.findOne(id);
    return {
      success: true,
      data: device,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updates: Partial<CreateDeviceDto>) {
    const device = await this.deviceService.update(id, updates);
    return {
      success: true,
      message: 'Device updated successfully',
      data: device,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deviceService.remove(id);
    return {
      success: true,
      message: 'Device deleted successfully',
    };
  }
}
