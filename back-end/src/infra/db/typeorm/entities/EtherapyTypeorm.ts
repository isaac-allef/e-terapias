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
import Etherapy from '../../../../core/entities/Etherapy';
import FieldJournal from '../../../../core/entities/FieldJournal';
import Moderator from '../../../../core/entities/Moderator';
import Template from '../../../../core/entities/Template';
import FieldJournalTypeorm from './FieldJournalsTypeorm';
import ModeratorTypeorm from './ModeratorTypeorm';
import TemplateTypeorm from './TemplateTypeorm';

@Entity('Etherapy')
class EtherapyTypeorm implements Etherapy {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => FieldJournalTypeorm, fieldJournal => fieldJournal.etherapy)
    fieldJournals: FieldJournal[];

    @ManyToOne(() => TemplateTypeorm, template => template.etherapies, {
        onDelete: 'SET NULL',
    })
    template: Template;

    @ManyToMany(() => ModeratorTypeorm, moderator => moderator.etherapies)
    @JoinTable()
    moderators: Moderator[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default EtherapyTypeorm;
