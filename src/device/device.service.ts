import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const existing = await this.deviceRepository.findOne({
      where: { machine_address: createDeviceDto.machine_address },
    });

    if (existing) {
      throw new ConflictException(
        `Device with machine_address '${createDeviceDto.machine_address}' already exists`,
      );
    }

    const device = this.deviceRepository.create({
      machine_address: createDeviceDto.machine_address,
      name: createDeviceDto.name,
      status: 'active',
      metadata: createDeviceDto.metadata || {},
    });

    return this.deviceRepository.save(device);
  }

  async findByMachineAddress(machineAddress: string): Promise<Device> {
    const device = await this.deviceRepository.findOne({
      where: { machine_address: machineAddress },
    });

    if (!device) {
      throw new NotFoundException(
        `Device with machine_address '${machineAddress}' not found`,
      );
    }

    return device;
  }

  async findAll(): Promise<Device[]> {
    return this.deviceRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Device> {
    const device = await this.deviceRepository.findOne({ where: { id } });

    if (!device) {
      throw new NotFoundException(`Device with ID '${id}' not found`);
    }

    return device;
  }

  async update(id: string, updates: Partial<Device>): Promise<Device> {
    const device = await this.findOne(id);
    Object.assign(device, updates);
    return this.deviceRepository.save(device);
  }

  async remove(id: string): Promise<void> {
    const device = await this.findOne(id);
    await this.deviceRepository.remove(device);
  }
}
