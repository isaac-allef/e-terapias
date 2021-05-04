import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Etherapy from '../../../../core/entities/Etherapy';
import FieldJournal from '../../../../core/entities/FieldJournal';
import Moderator from '../../../../core/entities/Moderator';
import EtherapyTypeorm from './EtherapyTypeorm';
import FieldJournalTypeorm from './FieldJournalTypeorm';

@Entity('Moderator')
class ModeratorTypeorm implements Moderator {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    token: string;

    @Column()
    name: string;

    @OneToMany(
        () => FieldJournalTypeorm,
        fieldJournal => fieldJournal.moderator,
    )
    fieldJournals: FieldJournal[];

    @ManyToMany(() => EtherapyTypeorm, eterapia => eterapia.moderators)
    etherapies: Etherapy[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default ModeratorTypeorm;
