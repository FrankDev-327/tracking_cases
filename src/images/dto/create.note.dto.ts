import { IsString } from "class-validator";

export class CreateNoteDto {
    @IsString()
    text_note: string;

    @IsString()
    caseId: string;
}