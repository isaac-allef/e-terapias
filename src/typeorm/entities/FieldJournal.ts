import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import IFieldJournal from '../../domains/fieldJournals/models/IFieldJournal';
import Eterapia from './Eterapia';
import Field from './Field';
import Moderator from './Moderator';

@Entity()
class FieldJournal implements IFieldJournal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @ManyToOne(() => Moderator, moderator => moderator.fieldJournals)
    moderator: Moderator;

    @ManyToOne(() => Eterapia, eterapia => eterapia.fieldJournals)
    eterapia: Eterapia;

    @OneToMany(() => Field, field => field.fieldJournal, { eager: true })
    fields: Field[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default FieldJournal;
