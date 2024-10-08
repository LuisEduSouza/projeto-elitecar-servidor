import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool
/**
 * Classe que representa um pedido de venda.
 */
export class PedidoVenda {

    /* Atributos */
    /* Identificador do pedido de venda */
    private idPedido: number = 0;
    /* Identificador do carro associado ao pedido */
    private idCarro: number;
    /* Identificador do cliente associado ao pedido */
    private idCliente: number;
    /* Data em que o pedido foi feito */
    private dataPedido: Date;
    /* Valor total do pedido */
    private valorPedido: number;

    /**
     * Construtor da classe PedidoVenda
     * 
     * @param idCarro Identificador do carro
     * @param idCliente Identificador do cliente
     * @param dataPedido Data do pedido
     * @param valorPedido Valor total do pedido
     */
    constructor(
        idCarro: number, 
        idCliente: number,
        dataPedido: Date,
        valorPedido: number
    ) {
        this.idCarro = idCarro;
        this.idCliente = idCliente;
        this.dataPedido = dataPedido;
        this.valorPedido = valorPedido;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do pedido de venda
     * @returns o identificador do pedido de venda
     */
    public getIdPedido(): number {
        return this.idPedido;
    }

    /**
     * Atribui um valor ao identificador do pedido de venda
     * @param idPedido novo identificador do pedido de venda
     */
    public setIdPedido(idPedido: number): void {
        this.idPedido = idPedido;
    }

    /**
     * Recupera o identificador do carro associado ao pedido
     * @returns o identificador do carro
     */
    public getIdCarro(): number {
        return this.idCarro;
    }

    /**
     * Define o identificador do carro associado ao pedido
     * @param idCarro novo identificador do carro
     */
    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    /**
     * Recupera o identificador do cliente associado ao pedido
     * @returns o identificador do cliente
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Define o identificador do cliente associado ao pedido
     * @param idCliente novo identificador do cliente
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Recupera a data do pedido
     * @returns a data do pedido
     */
    public getDataPedido(): Date {
        return this.dataPedido;
    }

    /**
     * Define a data do pedido
     * @param dataPedido nova data do pedido
     */
    public setDataPedido(dataPedido: Date): void {
        this.dataPedido = dataPedido;
    }

    /**
     * Recupera o valor total do pedido
     * @returns o valor total do pedido
     */
    public getValorPedido(): number {
        return this.valorPedido;
    }

    /**
     * Define o valor total do pedido
     * @param valorPedido novo valor do pedido
     */
    public setValorPedido(valorPedido: number): void {
        this.valorPedido = valorPedido;
    }

    static async listarPedidoVenda(): Promise<Array<PedidoVenda> | null> {
        //CRIANDO LISTA VAZIA PARA ARMAZENAR OS PEDIDOS DE VENDA
        let listaDePedidoVenda: Array<PedidoVenda> = [];

        try {
            // Querry para consulta no banco de dados
            const querySelectPedidoVenda = `SELECT * FROM pedido_venda;`;

            // executa a querry no banco de dados
            const respostaBD = await database.query(querySelectPedidoVenda);

            respostaBD.rows.forEach((pedidoVenda) => {
                let novoPedidoVenda = new PedidoVenda(
                    pedidoVenda.id_carro,
                    pedidoVenda.id_cliente,
                    pedidoVenda.data_pedido,
                    pedidoVenda.valor_pedido
                );

                novoPedidoVenda.setIdPedido(pedidoVenda.id);

                // adicionando o pedido na lista
                listaDePedidoVenda.push(novoPedidoVenda);
            });

            //retornando a lista de pedido para que chamou a função
            return listaDePedidoVenda;

        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }
}
