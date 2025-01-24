import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (
  date: Date | string,
  customFormat: string = 'YYYY-MM-DD',
  utc: boolean = false,
): string => {
  if (!date) {
    return 'Fecha inválida';
  }
  if (utc) {
    //se requiere especificar utc para fechas tipo: 2024-10-19T00:00:00.000+00:00 | 2024-10-20T00:00:00.000+00:00, para que al momento
    //de establecer un formato se mantenga en 19/10/2024 | 20/10/2024 y no en 18/10/2024 | 19/10/2024
    return dayjs(date).utc().format(customFormat);
  } else {
    // Configurar la zona horaria de Panamá
    const panamaTimezone = 'America/Panama';
    return dayjs(date).tz(panamaTimezone).format(customFormat);
  }
};
