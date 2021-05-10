import Etherapy from '../../../entities/Etherapy';

type dto = {
    identifier: string;

    name: string;
};

export type params = dto[];

export default interface CreateEtherapiesRepository {
    create(data: params): Promise<Etherapy[]>;
}
