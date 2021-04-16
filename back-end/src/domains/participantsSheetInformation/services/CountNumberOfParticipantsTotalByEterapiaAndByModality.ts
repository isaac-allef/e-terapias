import IParticipantsSheetInformationRepository from '../repositories/IParticipantsSheetInformationRepository';

class CountNumberOfParticipantsTotalByEterapiaAndByModality {
    private columnEterapiasNamesModality1 = [
        'e-terapia 01 - horário disponível:',
        'e-terapia 02 - horários disponíveis:',
        'e-terapia 03 - horário disponível',
    ];

    private columnEterapiasNamesModality2 = [
        'e-terapia 04 - horários disponíveis',
        'e-terapia 05 - horário disponível:',
        'e-terapia 06 - horários disponíveis:',
        'e-terapia 07 - horário disponível',
        'e-terapia 08 - horários disponíveis:',
        'e-terapia 09 - Inscrições encerradas temporariamente.',
    ];

    private columnEterapiasNamesModality3 = [
        'e-terapia 10 - horários disponíveis:',
        'e-terapia 11 - horário disponível:',
        'e-terapia 12 - Inscrições encerradas temporariamente.',
    ];

    private columnEterapiasNamesModality4 = [
        'e-terapia 13 - horário disponível:',
        'e-terapia 14 - horário disponível:',
        'e-terapia 15 - horário disponível:',
    ];

    constructor(
        private participantsSheetInformationRepository: IParticipantsSheetInformationRepository,
    ) {}

    public async execute(): Promise<number> {
        const sheet = await this.participantsSheetInformationRepository.getJSON();

        const obj = JSON.parse(JSON.stringify(sheet));

        let count = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        obj.forEach((participant: any) => {
            let jaContou = false;
            this.columnEterapiasNamesModality4.forEach(name => {
                if (!jaContou && participant[name] !== '') {
                    count += 1;
                    jaContou = true;
                }
            });
        });

        return count;
    }
}

export default CountNumberOfParticipantsTotalByEterapiaAndByModality;
