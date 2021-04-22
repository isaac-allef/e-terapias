import ISpreadsheetsRepository from '../repositories/ISpreadsheetsRepository';
import IModeratorRepository from '../../moderators/repositories/IModeratorRepository';
import IEterapiaRepository from '../../eterapias/repositories/IEterapiaRepository';
import CreateRelationBetweenModeratorAndEterapiaService from '../../moderators/services/CreateRelationBetweenModeratorAndEterapiaService';

class CreateRelationsBetweenModeratorsAndEterapiasFromSpreadsheetsService {
    constructor(
        private spreadsheetsRepository: ISpreadsheetsRepository,
        private moderatorRepository: IModeratorRepository,
        private eterapiaRepository: IEterapiaRepository,
    ) {}

    public async execute(): Promise<number> {
        const moderators = await this.spreadsheetsRepository.getPageRows();

        const createRelationBetweenModeratorAndEterapia = new CreateRelationBetweenModeratorAndEterapiaService(
            this.moderatorRepository,
            this.eterapiaRepository,
        );

        const countNewModeratorsCreated = await moderators.reduce(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async (count: any, moderator: any) => {
                try {
                    let names = this.stringToArrayByComma(
                        moderator[
                            'Você é mediador ou estudante de apoio em qual(is) oficina(s)?'
                        ],
                    );
                    names = this.removeSubtitles(names);
                    const eterapiasIds = (await Promise.all(
                        await this.changeNameToId(
                            names,
                            this.eterapiaRepository,
                        ),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    )) as any;
                    const moderatorId = await this.getModeratorIdByEmail(
                        moderator['Endereço de e-mail'],
                        this.moderatorRepository,
                    );

                    eterapiasIds.forEach(async (eterapiaId: string) => {
                        await createRelationBetweenModeratorAndEterapia.execute(
                            {
                                eterapiaId,
                                moderatorId: moderatorId as string,
                            },
                        );
                    });

                    return (await count) + 1;
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.log({ error: err });

                    return count;
                }
            },
            0,
        );

        return countNewModeratorsCreated as number;
    }

    private stringToArrayByComma(namesSeparatePerComma: string): string[] {
        return namesSeparatePerComma.split(',');
    }

    private removeSubtitles(arrayNames: string[]): string[] {
        return arrayNames.map(name => {
            const array = name.split(' -');
            return array[0].replace(/\s+/g, '');
        });
    }

    private async changeNameToId(
        arrayNames: string[],
        eterapiaRepository: IEterapiaRepository,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise<string[] | any> {
        const a = await Promise.all(
            arrayNames.map(async (name: string) => {
                const eterapia = await eterapiaRepository.findByName({ name });
                return eterapia?.id;
            }),
        );

        return a;
    }

    private async getModeratorIdByEmail(
        email: string,
        moderatorRepository: IModeratorRepository,
    ): Promise<string | undefined> {
        const moderator = await moderatorRepository.findByEmail({ email });
        return moderator?.id;
    }
}

export default CreateRelationsBetweenModeratorsAndEterapiasFromSpreadsheetsService;
