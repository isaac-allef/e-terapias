import Offer from './Offer';
import User from './User';

interface Manager extends User {
    id: string;

    name: string;

    offers: Offer[];
}

export default Manager;
