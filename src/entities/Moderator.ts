import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Eterapia from './Eterapia';
import FieldJournal from './FieldJournal';

@Entity()
class Moderator {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(_type => FieldJournal, _moderator => Moderator)
    fieldJournals: FieldJournal[];

    @ManyToMany(_type => Eterapia, _moderators => Moderator, { eager: true })
    eterapias: Eterapia[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default Moderator;
