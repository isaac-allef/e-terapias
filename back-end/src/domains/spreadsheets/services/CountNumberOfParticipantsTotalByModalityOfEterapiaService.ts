import ISpreadsheetsRepository from '../repositories/ISpreadsheetsRepository';
// 2020

// e-terapias de promoção de bem-estar:
// 'e-terapia 01'
// 'e-terapia 02'
// 'e-terapia 03'

// e-terapias de apoio psicossocial:
// 'e-terapia 04'
// 'e-terapia 05'
// 'e-terapia 06'
// 'e-terapia 07'
// 'e-terapia 08'
// 'e-terapia 09'

// e-terapias de apoio matricial:
// 'e-terapia 10'
// 'e-terapia 11'
// 'e-terapia 12'

// e-terapias expressivas: escrita terapêutica e arteterapia:
// 'e-terapia 13'
// 'e-terapia 14'
// 'e-terapia 15'

class CountNumberOfParticipantsTotalByModalityOfEterapiaService {
    constructor(private spreadsheetsRepository: ISpreadsheetsRepository) {}

    public async execute(): Promise<number> {
        const verify = (value: string) => {
            if (value === '' || !value) {
                return false;
            }
            return true;
        };

        const like = (column: string, value: string) => {
            const a = value.split(';');
            for (let i = 0; i < a.length; i += 1) {
                if (column.includes(a[i])) {
                    return true;
                }
            }
            return false;
        };

        const participants = await this.spreadsheetsRepository.getPageRowsByColumn(
            'e-terapia 04;e-terapia 05;e-terapia 06;e-terapia 07;e-terapia 08;e-terapia 09',
            like,
            verify,
        );

        return participants?.length || 0;
    }
}

export default CountNumberOfParticipantsTotalByModalityOfEterapiaService;
