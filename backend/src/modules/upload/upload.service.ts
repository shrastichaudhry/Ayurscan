import { Injectable } from '@nestjs/common';

import cloudinary from '../../config/cloudinary';

@Injectable()
export class UploadService {
  async uploadImage(file: any) {

    const result =
      await cloudinary.uploader.upload(
        file.path,
        {
          folder: 'AyurScan/Plants',
        },
      );

    return {
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url,
      publicId: result.public_id,
    };
  }
}