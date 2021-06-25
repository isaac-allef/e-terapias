/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import Template, { templateField } from '../../../src/core/entities/Template';
import CreateTemplateRepository from '../../../src/core/protocols/db/repositories/CreateTemplateRepository';
import LoadTemplateByIdRepository from '../../../src/core/protocols/db/repositories/LoadTemplateByIdRepository';
import LinkTemplateToEtherapiesRepository from '../../../src/core/protocols/db/repositories/LinkTemplateToEtherapiesRepository';

const fakeTemplateFields: templateField[] = [
    { name: 'Qual o seu nome?', type: 'short', isRequired: true },
    { name: 'Fale sobre você', type: 'long', isRequired: true },
];

export class CreateTemplateRepositoryStub implements CreateTemplateRepository {
    async create(): Promise<Template> {
        const template: Template = {
            id: 'randomId',
            name: 'diário das eterapias de promoção ao bem-estar',
            etherapies: [],
            templateFields: fakeTemplateFields,
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
            templateFields: fakeTemplateFields,
        };

        return new Promise(resolve => resolve(template));
    }
}

export class LinkTemplateToEtherapiesRepositoryStub
    implements LinkTemplateToEtherapiesRepository {
    linkTemplate(_template: Template, _etherapies: string[]): Promise<boolean> {
        return new Promise(resolve => resolve(true));
    }
}
