import test from 'node:test';
import assert from 'node:assert/strict';
import { consumoValido, dataHoraParaApi, formatarDataInstalacao } from '../src/utils/leitura.ts';

test('envia o horario local sem deslocar a leitura para UTC ou outro dia', () => {
  assert.equal(dataHoraParaApi('2026-11-16T22:21'), '2026-11-16T22:21:00');
  assert.equal(dataHoraParaApi('2026-11-16T22:21:30'), '2026-11-16T22:21:30');
});

test('consumo respeita zero, decimais e os limites do banco', () => {
  for (const valor of ['0', '0.01', '465.25', '999999.99']) assert.equal(consumoValido(valor), true, valor);
  for (const valor of ['', ' ', '-1', '1.234', '1000000', 'Infinity', 'NaN', '1e3']) assert.equal(consumoValido(valor), false, valor);
});

test('data de instalacao nao retrocede um dia em fusos negativos', () => {
  assert.equal(formatarDataInstalacao('2025-03-10'), '10/03/2025');
});
