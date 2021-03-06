import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail'; // Chave unica
  }

  async handle({ data }) {
    // Tarefa que vai ser executada quando o processo for executado
    const { appointment } = data;

    await Mail.sedndMail({
      to: `${data.provider.name} <${appointment.provider.email}`, // Lá do include do começo do delete
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}
export default new CancellationMail();
