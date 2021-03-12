import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import IFieldJournal from '../../../models/IFieldJournal';
import Eterapia from '../../../../eterapias/infra/typeorm/entities/Eterapia';
import Field from './Field';
import Moderator from '../../../../moderators/infra/typeorm/entities/Moderator';

@Entity()
class FieldJournal implements IFieldJournal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @ManyToOne(() => Moderator, moderator => moderator.fieldJournals, {
        onDelete: 'CASCADE',
    })
    moderator: Moderator;

    @ManyToOne(() => Eterapia, eterapia => eterapia.fieldJournals, {
        onDelete: 'CASCADE',
    })
    eterapia: Eterapia;

    @OneToMany(() => Field, field => field.fieldJournal, {
        eager: true,
        cascade: true,
    })
    fields: Field[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default FieldJournal;
