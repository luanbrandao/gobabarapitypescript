import { injectable, inject } from 'tsyringe';
// quantos dias tem no mês
import { getHours, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

//  [{ day: 1 , available: false}]
type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    const hoursStart = 8;

    const eachHoursArray = Array.from(
      { length: 10 },
      (_, index) => index + hoursStart,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHoursArray.map(hour => {
      // tem algum agendamento nessa hora
      const hasApointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        //  !hasApointmentInHour, não pdoe ter agendamento
        //   isAfter(compareDate , currentDate),depois da data atual
        available: !hasApointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
