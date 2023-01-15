import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { path } from "app-root-path";
import * as sharp from 'sharp';
import { ensureDir, writeFile } from "fs-extra";
import { FileElementResponse } from "./dto/file-element.response";
import { MFile } from "./mFile.class";

@Injectable()
export class FilesService {
  async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;

    await ensureDir(uploadFolder);

    const response: FileElementResponse[] = [];

    for(const { originalname, buffer } of files) {
      await writeFile(`${uploadFolder}/${originalname}`, buffer);

      response.push({ url: `${dateFolder}/${originalname}`, name: originalname })
    }

    return response;
  }

  async convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer()
  }
}
