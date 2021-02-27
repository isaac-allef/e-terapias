import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Eterapia from './Eterapia';
import Field from './Field';
import Moderator from './Moderator';

@Entity()
class FieldJournal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @ManyToOne(_type => Moderator, _fieldJournal => FieldJournal)
    moderator: Moderator;

    @ManyToOne(_type => Eterapia, _fieldJournal => FieldJournal)
    eterapia: Eterapia;

    @OneToMany(() => Field, field => field.fieldJournal, { eager: true })
    fields: Field[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default FieldJournal;
