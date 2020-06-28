import { Router } from 'express';
// import { uuid } from 'uuidv4';
// import { parseISO } from 'date-fns';
// import { container } from 'tsyringe';
// import Appointment from '../models/Appointment';
// import { getCustomRepository } from 'typeorm';
// import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
// import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   // console.log(request.user);
//   // const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

// appointmentsRouter.post('/', async (request, response) => {
//   // const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   // const appointmentsRepository = new AppointmentsRepository();
//   const { provider_id, date } = request.body;

//   const parsedDate = parseISO(date);
//   // const createAppointment = new CreateAppointmentService(
//   //   appointmentsRepository,
//   // );
//   const createAppointment = container.resolve(CreateAppointmentService);
//   const appointment = await createAppointment.execute({
//     date: parsedDate,
//     provider_id,
//   });

//   return response.json(appointment);
// });
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
