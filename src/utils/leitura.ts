// A API recebe LocalDateTime: preservar o horario digitado, sem conversao para UTC.
export const dataHoraParaApi = (valor: string) =>
  valor.length === 16 ? `${valor}:00` : valor;

export const consumoValido = (valor: string) =>
  /^\d+(\.\d{1,2})?$/.test(valor) &&
  Number.isFinite(Number(valor)) &&
  Number(valor) <= 999999.99;

// LocalDate do backend nao possui horario nem fuso.
export const formatarDataInstalacao = (valor: string) =>
  valor.split('-').reverse().join('/');
