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
import FieldJournal from './FieldJournal';
import FieldJournalModel from './FieldJournalModel';

import Moderator from './Moderator';

@Entity()
class Eterapia {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(_type => FieldJournal, _eterapia => Eterapia)
    fieldJournals: FieldJournal[];

    @ManyToOne(_type => FieldJournalModel, _eterapias => Eterapia, {
        eager: true,
    })
    fieldJournalModel: FieldJournalModel;

    @ManyToMany(_type => Moderator, _eterapias => Eterapia)
    @JoinTable()
    moderators: Moderator[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default Eterapia;
