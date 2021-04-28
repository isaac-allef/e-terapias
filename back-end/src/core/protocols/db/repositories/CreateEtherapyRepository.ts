import Etherapy from '../../../entities/Etherapy';

export type params = {
    name: string;
};

export default interface CreateEtherapyRepository {
    create({ name }: params): Promise<Etherapy>;
}
