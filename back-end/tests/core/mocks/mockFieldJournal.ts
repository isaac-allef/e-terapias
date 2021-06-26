/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import FieldJournal from '../../../src/core/entities/FieldJournal';
import CreateFieldJournalRepository from '../../../src/core/protocols/db/repositories/CreateFieldJournalRepository';
import { LoadModeratorByIdRepositoryStub } from './mockModerator';
import { LoadEtherapyByIdRepositoryStub } from './mockEtherapy';
import LoadFieldJournalByIdRepository from '../../../src/core/protocols/db/repositories/LoadFieldJournalByIdRepository';
import LoadAllFieldJournalsPerModeratorRepository from '../../../src/core/protocols/db/repositories/LoadAllFieldJournalsPerModeratorRepository';
import SearchFieldJournalsPerModeratorRepository from '../../../src/core/protocols/db/repositories/SearchFieldJournalsPerModeratorRepository';

const loadModeratorByIdRepositoryStub = new LoadModeratorByIdRepositoryStub();
const loadEtherapyByIdRepositoryStub = new LoadEtherapyByIdRepositoryStub();

export class CreateFieldJournalRepositoryStub
    implements CreateFieldJournalRepository {
    async create(): Promise<FieldJournal> {
        const fieldJournal: FieldJournal = {
            id: 'randomId',
            name: 'diário das eterapias de promoção ao bem-estar',
            date: new Date(),
            fields: [
                {
                    name: 'Qual o seu nome?',
                    type: 'short',
                    value: 'Isaac',
                    isRequired: true,
                },
                {
                    name: 'Quanto é 2 + 2?',
                    type: 'short',
                    value: '4',
                    isRequired: true,
                },
                {
                    name: 'Informe sua data de nascimento',
                    type: 'short',
                    value: "{% now 'iso-8601', '' %}",
                    isRequired: true,
                },
                {
                    name: 'Voçê é estudante?',
                    type: 'short',
                    value: 'sim',
                    isRequired: true,
                },
            ],
            moderator: await loadModeratorByIdRepositoryStub.load(
                'randomIdModerator',
            ),
            etherapy: await loadEtherapyByIdRepositoryStub.load(
                'randomIdEtherapy',
            ),
        };

        return new Promise(resolve => resolve(fieldJournal));
    }
}

export class LoadFieldJournalByIdRepositoryStub
    implements LoadFieldJournalByIdRepository {
    async load(id: string): Promise<FieldJournal> {
        const fieldJournal: FieldJournal = {
            id,
            name: 'diário das eterapias de promoção ao bem-estar',
            date: new Date(),
            fields: [
                {
                    name: 'Qual o seu nome?',
                    type: 'short',
                    value: 'Isaac',
                    isRequired: true,
                },
                {
                    name: 'Quanto é 2 + 2?',
                    type: 'short',
                    value: '4',
                    isRequired: true,
                },
                {
                    name: 'Informe sua data de nascimento',
                    type: 'short',
                    value: "{% now 'iso-8601', '' %}",
                    isRequired: true,
                },
                {
                    name: 'Voçê é estudante?',
                    type: 'short',
                    value: 'sim',
                    isRequired: true,
                },
            ],
            moderator: await loadModeratorByIdRepositoryStub.load(
                'randomIdModerator',
            ),
            etherapy: await loadEtherapyByIdRepositoryStub.load(
                'randomIdEtherapy',
            ),
        };

        return new Promise(resolve => resolve(fieldJournal));
    }
}

export class LoadAllFieldJournalsPerModeratorRepositoryStub
    implements LoadAllFieldJournalsPerModeratorRepository {
    async loadAllPerModerator(): Promise<FieldJournal[]> {
        const fieldJournals: FieldJournal[] = [
            {
                id: 'randomId',
                name: 'diário das eterapias de promoção ao bem-estar',
                date: new Date(),
                fields: [
                    {
                        name: 'Qual o seu nome?',
                        type: 'short',
                        value: 'Isaac',
                        isRequired: true,
                    },
                    {
                        name: 'Quanto é 2 + 2?',
                        type: 'short',
                        value: '4',
                        isRequired: true,
                    },
                    {
                        name: 'Informe sua data de nascimento',
                        type: 'short',
                        value: "{% now 'iso-8601', '' %}",
                        isRequired: true,
                    },
                    {
                        name: 'Voçê é estudante?',
                        type: 'short',
                        value: 'sim',
                        isRequired: true,
                    },
                ],
                moderator: await loadModeratorByIdRepositoryStub.load(
                    'randomIdModerator',
                ),
                etherapy: await loadEtherapyByIdRepositoryStub.load(
                    'randomIdEtherapy',
                ),
            },
        ];

        return new Promise(resolve => resolve(fieldJournals));
    }
}

export class SearchFieldJournalsPerModeratorRepositoryStub
    implements SearchFieldJournalsPerModeratorRepository {
    async searchPerModerator(): Promise<FieldJournal[]> {
        const fieldJournals: FieldJournal[] = [
            {
                id: 'randomId',
                name: 'diário das eterapias de promoção ao bem-estar',
                date: new Date(),
                fields: [
                    {
                        name: 'Qual o seu nome?',
                        type: 'short',
                        value: 'Isaac',
                        isRequired: true,
                    },
                    {
                        name: 'Quanto é 2 + 2?',
                        type: 'short',
                        value: '4',
                        isRequired: true,
                    },
                    {
                        name: 'Informe sua data de nascimento',
                        type: 'short',
                        value: "{% now 'iso-8601', '' %}",
                        isRequired: true,
                    },
                    {
                        name: 'Voçê é estudante?',
                        type: 'short',
                        value: 'sim',
                        isRequired: true,
                    },
                ],
                moderator: await loadModeratorByIdRepositoryStub.load(
                    'randomIdModerator',
                ),
                etherapy: await loadEtherapyByIdRepositoryStub.load(
                    'randomIdEtherapy',
                ),
            },
        ];

        return new Promise(resolve => resolve(fieldJournals));
    }
}
