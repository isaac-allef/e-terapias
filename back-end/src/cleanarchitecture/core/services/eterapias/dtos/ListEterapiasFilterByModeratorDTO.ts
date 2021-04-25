import ListEterapiasDTO from './ListEterapiasDTO';

export default interface ListEterapiasFilterByModeratorDTO
    extends ListEterapiasDTO {
    moderatorId: string;
}
