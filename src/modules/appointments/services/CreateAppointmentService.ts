import { startOfHour, isBefore, getHours } from 'date-fns';
// import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
// import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
/*
 [x] Recebimento das informações
 [/] Tratativa de erros/exessões
 [x] Acesso ao repositório
*/

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}
/**
 * Dependency Inversion
 * sempre que o serve tiver uma dependencia experna
 * ele recebe ela como parametro no constructor
 * para os serviços usarem a mesma instância
 */

@injectable()
class CreateAppointmentService {
  // SOLID, 'D' inversion dependence
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    // const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    // se a data do agendamento for antes que agora,
    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on past date");
    }

    // não pode marca com ele mesmo
    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8am abd 5pm',
      );
    }
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    // await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
