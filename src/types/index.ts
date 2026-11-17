export interface Residencia {
  id: number;
  idComunidade: number;
  codigoResidencia: string;
  endereco: string;
  qtdMoradores: number;
}

export interface Medidor {
  id: number;
  idResidencia: number;
  numeroSerie: string;
  dataInstalacao: string;
  status: "ATIVO" | "INATIVO" | "MANUTENCAO";
}

export interface Leitura {
  id: number;
  idMedidor: number;
  dataHoraLeitura: string;
  consumoLitros: number;
}

export interface ErroApi {
  timestamp: string;
  status: number;
  mensagem: string;
  caminho: string;
  detalhes: string[];
}
