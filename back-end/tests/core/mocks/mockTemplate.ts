/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import Template from '../../../src/core/entities/Template';
import CreateTemplateRepository from '../../../src/core/protocols/db/repositories/CreateTemplateRepository';
import LoadTemplateByIdRepository from '../../../src/core/protocols/db/repositories/LoadTemplateByIdRepository';

export class CreateTemplateRepositoryStub implements CreateTemplateRepository {
    async create(): Promise<Template> {
        const template: Template = {
            id: 'randomId',
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
        };

        return new Promise(resolve => resolve(template));
    }
}

export class LoadTemplateByIdRepositoryStub
    implements LoadTemplateByIdRepository {
    async load(): Promise<Template> {
        const template: Template = {
            id: 'randomId',
            name: 'viver é bom',
            etherapies: [],
            templateFields: [
                { name: 'Qual o seu nome?' },
                { name: 'Quanto é 2 + 2?' },
                {
                    name: 'Informe sua data de nascimento',
                },
                { name: 'Voçê é estudante?' },
            ],
        };

        return new Promise(resolve => resolve(template));
    }
}
