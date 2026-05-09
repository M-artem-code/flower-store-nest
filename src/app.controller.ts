import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  sendMessage(): string {
    this.appService.sendMessage();
    return 'Message sent!';
  }

  @Get('health')
  async health() {
    let db = 'down';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      db = 'up';
    } catch {
      db = 'down';
    }

    return {
      status: 'ok',
      db,
      version:
        this.configService.get<string>('APP_VERSION') ??
        process.env.npm_package_version ??
        'unknown',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('version')
  version() {
    return {
      version:
        this.configService.get<string>('APP_VERSION') ??
        process.env.npm_package_version ??
        'unknown',
    };
  }
}
