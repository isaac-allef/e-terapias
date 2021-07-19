import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Etherapy from '../../../../core/entities/Etherapy';
import Template, { templateField } from '../../../../core/entities/Template';
import EtherapyTypeorm from './EtherapyTypeorm';

@Entity('Template')
class TemplateTypeorm implements Template {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'jsonb' })
    templateFields: templateField[];

    @OneToMany(() => EtherapyTypeorm, eterapia => eterapia.template)
    etherapies: Etherapy[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}

export default TemplateTypeorm;
