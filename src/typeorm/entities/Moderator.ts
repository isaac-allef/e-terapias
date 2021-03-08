import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import IModerator from '../../domains/moderators/models/IModerator';
import Eterapia from './Eterapia';
import FieldJournal from './FieldJournal';

@Entity()
class Moderator implements IModerator {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => FieldJournal, fieldJournal => fieldJournal.moderator)
    fieldJournals: FieldJournal[];

    @ManyToMany(() => Eterapia, eterapia => eterapia.moderators, {
        eager: true,
    })
    eterapias: Eterapia[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default Moderator;
