import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AppointmentMail {
  get Key() {
    return 'AppointmentMail';
  }

  async handle({ data }) {
    console.log('A fila executou');
    const { appointment } = data;
    await Mail.sendmail({
      to: `${appointment.company.name} <${appointment.company.email}>`,
      subject: 'Agendamento de serviço',
      template: 'appointment',
      context: {
        provider: appointment.company.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          { locale: pt }),
      },
    });
  }
}

export default new AppointmentMail();
