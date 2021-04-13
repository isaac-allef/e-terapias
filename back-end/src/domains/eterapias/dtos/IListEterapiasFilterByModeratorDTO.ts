import IListEterapiasDTO from './IListEterapiasDTO';

export default interface IListEterapiasFilterByModeratorDTO
    extends IListEterapiasDTO {
    moderatorId?: string;
}
