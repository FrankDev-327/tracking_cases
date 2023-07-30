import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm"
import { ImagesEntity } from "src/entities/images.entity"

@EventSubscriber()
export class ImageSubscriber implements EntitySubscriberInterface<ImagesEntity> {
    
    listenTo(): string | Function {
        return ImagesEntity;
    }

    afterInsert(event: InsertEvent<ImagesEntity>): void | Promise<any> {
       /*  console.log(`AFTER ENTITY INSERTED: `, event.entity) */
    }

}
