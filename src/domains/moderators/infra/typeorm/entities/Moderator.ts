import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import IModerator from '../../../models/IModerator';
import Eterapia from '../../../../eterapias/infra/typeorm/entities/Eterapia';
import FieldJournal from '../../../../fieldJournals/infra/typeorm/entities/FieldJournal';

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
