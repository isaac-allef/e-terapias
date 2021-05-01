/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import FieldJournal from '../../../src/core/entities/FieldJournal';
import CreateFieldJournalRepository from '../../../src/core/protocols/db/repositories/CreateFieldJournalRepository';
import Moderator from '../../../src/core/entities/Moderator';
import Etherapy from '../../../src/core/entities/Etherapy';
import { LoadModeratorByIdRepositoryStub } from './mockModerator';
import { LoadEtherapyByIdRepositoryStub } from './mockEtherapy';

const loadModeratorByIdRepositoryStub = new LoadModeratorByIdRepositoryStub();
const loadEtherapyByIdRepositoryStub = new LoadEtherapyByIdRepositoryStub();

export class CreateFieldJournalRepositoryStub
    implements CreateFieldJournalRepository {
    async create(): Promise<FieldJournal> {
        const fieldJournal: FieldJournal = {
            id: 'randomId',
            name: 'diário das eterapias de promoção ao bem-estar',
            fields: [
                { name: 'Qual o seu nome?', value: 'Isaac' },
                { name: 'Quanto é 2 + 2?', value: '4' },
                {
                    name: 'Informe sua data de nascimento',
                    value: "{% now 'iso-8601', '' %}",
                },
                { name: 'Voçê é estudante?', value: 'sim' },
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

type mockCorrectCase = {
    moderator: Moderator;
    etherapy: Etherapy;
};

export const mockCorrenctCase: mockCorrectCase = {
    moderator: {
        id: 'randomIdModerator',
        email: 'fulano@email.com',
        name: 'fulano',
        etherapies: [
            {
                id: 'randomIdEtherapy',
                name: 'viver é bom',
                fieldJournals: [],
                moderators: [],
                template: {
                    id: 'randomIdTemplate',
                    name: 'diário das eterapias de promoção ao bem-estar',
                    etherapies: [],
                    templateFields: [
                        { name: 'Qual o seu nome?' },
                        { name: 'Quanto é 2 + 2?' },
                        {
                            name: 'Informe sua data de nascimento',
                        },
                        { name: 'Voçê é estudante?' },
                    ],
                },
            },
        ],
        fieldJournals: [],
        password: '1234',
        token: 'randomToken',
    },
    etherapy: {
        id: 'randomIdEtherapy',
        name: 'viver é bom',
        fieldJournals: [],
        moderators: [],
        template: {
            id: 'randomIdTemplate',
            name: 'diário das eterapias de promoção ao bem-estar',
            etherapies: [],
            templateFields: [
                { name: 'Qual o seu nome?' },
                { name: 'Quanto é 2 + 2?' },
                {
                    name: 'Informe sua data de nascimento',
                },
                { name: 'Voçê é estudante?' },
            ],
        },
    },
};
