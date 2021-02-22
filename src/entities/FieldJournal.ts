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

    @ManyToOne(_type => Moderator, _fieldJournal => FieldJournal, {
        eager: true,
    })
    moderator: Moderator;

    @ManyToOne(_type => Eterapia, _fieldJournal => FieldJournal, {
        eager: true,
    })
    eterapia: Eterapia;

    @OneToMany(_type => Field, _fieldJournal => FieldJournal, { eager: true })
    fields: Field[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default FieldJournal;
