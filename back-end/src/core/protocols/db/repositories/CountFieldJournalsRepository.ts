export type filterDate = {
    begin: Date;
    end: Date;
};

export default interface countFieldJournalsRepository {
    count(data?: filterDate, offerId?: string): Promise<number>;
}
