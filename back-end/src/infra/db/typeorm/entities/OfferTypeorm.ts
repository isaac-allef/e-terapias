import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Offer, { settings } from '../../../../core/entities/Offer';

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default OfferTypeorm;
