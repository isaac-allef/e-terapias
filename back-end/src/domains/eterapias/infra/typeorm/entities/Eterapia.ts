import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import IEterapia from '../../../models/IEterapia';
import FieldJournal from '../../../../fieldJournals/infra/typeorm/entities/FieldJournal';
import FieldJournalTemplate from '../../../../fieldJournalsTemplates/infra/typeorm/entities/FieldJournalTemplate';

import Moderator from '../../../../moderators/infra/typeorm/entities/Moderator';

@Entity()
class Eterapia implements IEterapia {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => FieldJournal, fieldJournal => fieldJournal.eterapia)
    fieldJournals: FieldJournal[];

    @ManyToOne(
        () => FieldJournalTemplate,
        fieldJournalTemplate => fieldJournalTemplate.eterapias,
        { onDelete: 'SET NULL' },
    )
    fieldJournalTemplate: FieldJournalTemplate;

    @ManyToMany(() => Moderator, moderator => moderator.eterapias)
    @JoinTable()
    moderators: Moderator[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default Eterapia;
