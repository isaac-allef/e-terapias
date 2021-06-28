import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Manager from '../../../../core/entities/Manager';
import Offer from '../../../../core/entities/Offer';
import OfferTypeorm from './OfferTypeorm';

@Entity('Manager')
class ManagerTypeorm implements Manager {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    token: string;

    @Column({ nullable: true })
    role: string;

    @Column()
    name: string;

    @ManyToMany(() => OfferTypeorm, offer => offer.managers)
    offers: Offer[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default ManagerTypeorm;
