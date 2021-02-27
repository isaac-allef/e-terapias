import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Eterapia from './Eterapia';

interface FieldModels {
    name: string;
    type: string;
}

@Entity()
class FieldJournalModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'jsonb' })
    description: {
        title: string;
        fieldModels: FieldModels[];
    };

    @OneToMany(_type => Eterapia, _fieldJournalModel => FieldJournalModel)
    eterapias: Eterapia[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default FieldJournalModel;
