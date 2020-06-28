import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

import ProviderDayhAvailabilityController from '../controllers/ProviderDayhAvailabilityController';
import ProviderMonthhAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providerDayhAvailabilityController = new ProviderDayhAvailabilityController();
const providerMonthhAvailabilityController = new ProviderMonthhAvailabilityController();
providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/day-availability',
  providerDayhAvailabilityController.index,
);

providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthhAvailabilityController.index,
);

export default providersRouter;
