import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import FieldJournal from './FieldJournal';

@Entity()
class Field {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    string_value: string;

    @Column()
    int_value: number;

    @Column()
    date_value: Date;

    @ManyToOne(_type => FieldJournal, _fields => Field)
    fieldJournal: FieldJournal;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default Field;
