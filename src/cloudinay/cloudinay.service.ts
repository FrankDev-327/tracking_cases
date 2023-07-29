import { Injectable } from'@nestjs/common';
import toStream = require('buffer-to-stream');
import {
    UploadApiErrorResponse,
    UploadStream,
    UploadApiResponse,
    v2,
  } from 'cloudinary';

@Injectable()
export class CloudinayService {
    async uploadSingleImage(
        folder_id: string,
        file: Express.Multer.File,
      ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
          const upload: UploadStream = v2.uploader.upload_stream(
            {
              folder: folder_id,
            },
            (error: UploadApiErrorResponse, result: UploadApiResponse) => {
              if (error) return reject(error);
              resolve(result);
            },
          );
    
          toStream(file.buffer).pipe(upload);
        });
      }
    
      async deleteSingleImage(publicId: string): Promise<void> {
        await v2.uploader.destroy(publicId);
      }
    
      async deleteMultipleImages(publicIds: Array<string>): Promise<void> {
        await v2.api.delete_resources(publicIds);
      }

      async getFileInfoByPublicId(public_id: string): Promise<any>{
        return v2.api.resource(public_id)
      }

}
