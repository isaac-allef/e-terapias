import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Etherapy from '../../../../core/entities/Etherapy';
import Manager from '../../../../core/entities/Manager';
import Offer, { settings } from '../../../../core/entities/Offer';
import EtherapyTypeorm from './EtherapyTypeorm';
import ManagerTypeorm from './ManagerTypeorm';

@Entity('Offer')
class OfferTypeorm implements Offer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    dateStart: Date;

    @Column()
    dateEnd: Date;

    @Column({ type: 'jsonb' })
    settings: settings;

    @ManyToMany(() => ManagerTypeorm, manager => manager.offers)
    @JoinTable()
    managers: Manager[];

    @OneToMany(() => EtherapyTypeorm, etherapy => etherapy.offer)
    etherapies: Etherapy[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default OfferTypeorm;
