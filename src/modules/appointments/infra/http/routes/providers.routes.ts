import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
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
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayhAvailabilityController.index,
);

providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthhAvailabilityController.index,
);

export default providersRouter;
