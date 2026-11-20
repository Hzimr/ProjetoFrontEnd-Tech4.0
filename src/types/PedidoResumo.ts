export type StatusPedido = "em-transito" | "finalizado" | "cancelado";

export interface PedidoResumo {
  numero: string;
  produtoId: number;
  nome: string;
  img: string;
  alt: string;
  status: StatusPedido;
}
