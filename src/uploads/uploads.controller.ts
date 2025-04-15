import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('uploads')
@UseGuards(JwtAuthGuard)
export class UploadsController {
  constructor(private readonly usersService: UsersService) {}

  @Post('profile-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: { user: { id: number; email: string; name: string } },
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Construir la URL de la imagen (en producción, esto podría ser una URL completa)
    const imageUrl = `uploads/users/${file.filename}`;

    // Actualizar el campo de imagen del usuario
    await this.usersService.updateProfile(req.user.id, { image: imageUrl });

    return {
      message: 'Profile image uploaded successfully',
      imageUrl,
    };
  }
}
