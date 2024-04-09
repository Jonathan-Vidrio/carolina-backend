import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async create(createEmailDto: CreateEmailDto) {
    return this.mailerService.sendMail({
      to: this.configService.get<string>('OWNER_EMAIL'),
      subject: createEmailDto.subject,
      cc: createEmailDto.email,
      text: `Name: ${createEmailDto.name}\nEmail: ${createEmailDto.email}\nMessage: ${createEmailDto.message}`,
      replyTo: createEmailDto.email,
    });
  }
}
