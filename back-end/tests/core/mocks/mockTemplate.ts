/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import Template from '../../../src/core/entities/Template';
import CreateTemplateRepository from '../../../src/core/protocols/db/repositories/CreateTemplateRepository';
import LoadTemplateByIdRepository from '../../../src/core/protocols/db/repositories/LoadTemplateByIdRepository';
import LinkTemplateToEtherapiesRepository from '../../../src/core/protocols/db/repositories/LinkTemplateToEtherapiesRepository';
import Etherapy from '../../../src/core/entities/Etherapy';

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
    async load(id: string): Promise<Template> {
        const template: Template = {
            id,
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

export class LinkTemplateToEtherapiesRepositoryStub
    implements LinkTemplateToEtherapiesRepository {
    link(_template: Template, _etherapies: Etherapy[]): Promise<boolean> {
        return new Promise(resolve => resolve(true));
    }
}
