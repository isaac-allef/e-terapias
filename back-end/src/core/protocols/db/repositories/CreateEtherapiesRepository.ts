import Etherapy from '../../../entities/Etherapy';

type dto = {
    name: string;
};

export type params = dto[];

export default interface CreateEtherapiesRepository {
    create(data: params): Promise<Etherapy[] | undefined>;
}
