/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import LinkModeratorsToEtherapiesRepository, {
    params,
} from '../../../src/core/protocols/db/repositories/LinkModeratorsToEtherapiesRepository';

export class LinkModeratorsToEtherapiesRepositoryStub
    implements LinkModeratorsToEtherapiesRepository {
    link(_data: params): Promise<boolean> {
        return new Promise(resolve => resolve(true));
    }
}
