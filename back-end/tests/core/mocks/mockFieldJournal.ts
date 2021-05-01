/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import FieldJournal from '../../../src/core/entities/FieldJournal';
import CreateFieldJournalRepository from '../../../src/core/protocols/db/repositories/CreateFieldJournalRepository';
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
