import * as fs from 'fs';
import * as pdf2image from 'pdf2image';
const fullFilePath = __dirname+'utilstempFile.pdf';

export const storingTempFile = async (
  file: Express.Multer.File,
): Promise<any> => {
  const buff = Buffer.from(file[0].buffer, 'hex');
    fs.writeFileSync(fullFilePath, Buffer.from(buff).toString());
};

export const deletingTempFile = async (): Promise<any> => {
    fs.unlink(fullFilePath, (error) => {
        if(!error) {
            console.log('file deleted');
        }
    });
};

export const convertPDFToImage = async (): Promise<any> => {
    pdf2image.convertPDF(fullFilePath, {
        outputType:'.png',
        pages:"*"
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });
}
