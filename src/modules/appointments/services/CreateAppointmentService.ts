import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
// import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
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
      provider_id,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");
    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`,
    });

    // await appointmentsRepository.save(appointment);

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
