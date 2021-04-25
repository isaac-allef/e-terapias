import ListFieldJournalsDTO from './ListFieldJournalsDTO';

export default interface ListFieldJournalsFilterByModeratorDTO
    extends ListFieldJournalsDTO {
    moderatorId?: string;
}
