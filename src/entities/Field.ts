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

    @Column({ nullable: true })
    string_value: string;

    @Column({ nullable: true })
    int_value: number;

    @Column({ nullable: true })
    date_value: Date;

    @ManyToOne(() => FieldJournal, fieldJournal => fieldJournal.fields)
    fieldJournal: FieldJournal;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default Field;
