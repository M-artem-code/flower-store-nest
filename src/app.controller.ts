import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  sendMessage(): string {
    this.appService.sendMessage();
    return 'Message sent!';
  }

  @Get('health')
  health() {
    return {
      status: 'ok',
      version:
        this.configService.get<string>('APP_VERSION') ??
        process.env.npm_package_version ??
        'unknown',
      timestamp: new Date().toISOString(),
    };
  }
}
