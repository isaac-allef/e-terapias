import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
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
import Offer from '../../../../core/entities/Offer';
import Template from '../../../../core/entities/Template';
import FieldJournalTypeorm from './FieldJournalTypeorm';
import ModeratorTypeorm from './ModeratorTypeorm';
import OfferTypeorm from './OfferTypeorm';
import TemplateTypeorm from './TemplateTypeorm';

@Entity('Etherapy')
class EtherapyTypeorm implements Etherapy {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    identifier: string;

    @Column()
    name: string;

    @OneToMany(
        () => FieldJournalTypeorm,
        fieldJournal => fieldJournal.etherapy,
        { cascade: true },
    )
    fieldJournals: FieldJournal[];

    @ManyToOne(() => TemplateTypeorm, template => template.etherapies, {
        onDelete: 'SET NULL',
    })
    template: Template | null;

    @ManyToMany(() => ModeratorTypeorm, moderator => moderator.etherapies)
    @JoinTable()
    moderators: Moderator[];

    @ManyToOne(() => OfferTypeorm, offer => offer.etherapies, {
        onDelete: 'CASCADE',
    })
    offer: Offer;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}

export default EtherapyTypeorm;
