import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
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

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    token: string;

    @Column({ nullable: true })
    role: string;

    @Column()
    name: string;

    @OneToMany(
        () => FieldJournalTypeorm,
        fieldJournal => fieldJournal.moderator,
        { cascade: true },
    )
    fieldJournals: FieldJournal[];

    @ManyToMany(() => EtherapyTypeorm, eterapia => eterapia.moderators)
    etherapies: Etherapy[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}

export default ModeratorTypeorm;
