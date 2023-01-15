import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { path } from "app-root-path";
import { ensureDir, writeFile } from "fs-extra";
import { FileElementResponse } from "./dto/file-element.response";

@Injectable()
export class FilesService {
  async saveFiles(files: Express.Multer.File[]): Promise<FileElementResponse[]> {
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
}
