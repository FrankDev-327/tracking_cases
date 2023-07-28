import { v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (configService: ConfigService) => {
    return v2.config({
      cloud_name: configService.get<string>('CLOUDINARY_NAME'),
      api_key: configService.get<string>('CLOUDINARY_NAME_API_KEY'),
      api_secret: configService.get<string>('CLOUDINARY_NAME_API_SECRET_KEY'),
    });
  },
  inject: [ConfigService],
};