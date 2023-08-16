import { Module } from '@nestjs/common';
import { CasesMessageGateway } from './cases-message.gateway';

@Module({
    providers:[CasesMessageGateway]
})
export class CasesMessageModule {}
