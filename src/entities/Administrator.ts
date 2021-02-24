import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
class Administrator {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default Administrator;
