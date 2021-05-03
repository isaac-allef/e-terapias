import { TestController } from '../../presentation/controllers/TestController';
import { Controller } from '../../presentation/protocols/controller';

const makeTestContoller = (): Controller => {
    return new TestController();
};

export default makeTestContoller;
