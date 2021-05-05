import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Etherapy from '../../../../core/entities/Etherapy';
import FieldJournal, { field } from '../../../../core/entities/FieldJournal';
import Moderator from '../../../../core/entities/Moderator';
import EtherapyTypeorm from './EtherapyTypeorm';
import ModeratorTypeorm from './ModeratorTypeorm';

@Entity('FieldJournal')
class FieldJournalTypeorm implements FieldJournal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => ModeratorTypeorm, moderator => moderator.fieldJournals, {
        onDelete: 'CASCADE',
    })
    moderator: Moderator;

    @ManyToOne(() => EtherapyTypeorm, eterapia => eterapia.fieldJournals, {
        onDelete: 'CASCADE',
    })
    etherapy: Etherapy;

    @Column({ type: 'jsonb' })
    fields: field[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default FieldJournalTypeorm;
