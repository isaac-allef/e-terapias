import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Eterapia from './Eterapia';

interface FieldTemplates {
    name: string;
    type: string;
}

@Entity()
class FieldJournalTemplate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'jsonb' })
    description: {
        title: string;
        fieldTemplates: FieldTemplates[];
    };

    @OneToMany(() => Eterapia, eterapia => eterapia.fieldJournalTemplate)
    eterapias: Eterapia[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default FieldJournalTemplate;
