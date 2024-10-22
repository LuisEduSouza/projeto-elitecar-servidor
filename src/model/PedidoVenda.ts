import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um Pedido de Venda.
 */
export class PedidoVenda {
    /**
     * Identificador único do pedido de venda.
     */
    private idPedido: number = 0;
    /**
     * Identificador do carro associado ao pedido de venda.
     */
    private idCarro: number;
    /**
     * Identificador do cliente associado ao pedido de venda.
     */
    private idCliente: number;
    /**
     * Data do pedido de venda.
     */
    private dataPedido: Date;
    /**
     * Valor total do pedido.
     */
    private valorPedido: number;

    /**
     * Construtor da classe PedidoVenda.
     * @param idCarro - Identificador do carro.
     * @param idCliente - Identificador do cliente.
     * @param dataPedido - Data do pedido.
     * @param valorPedido - Valor do pedido.
     */
    constructor(idCarro: number, idCliente: number, dataPedido: Date, valorPedido: number) {
        this.idCarro = idCarro;
        this.idCliente = idCliente;
        this.dataPedido = dataPedido;
        this.valorPedido = valorPedido;
    }

    /**
     * Obtém o identificador do pedido.
     * @returns O identificador do pedido.
     */
    public getIdPedido(): number {
        return this.idPedido;
    }

    /**
     * Define o identificador do pedido.
     * @param idPedido - Novo identificador do pedido.
     */
    public setIdPedido(idPedido: number): void {
        this.idPedido = idPedido;
    }

    /**
     * Obtém o identificador do carro.
     * @returns O identificador do carro.
     */
    public getIdCarro(): number {
        return this.idCarro;
    }

    /**
     * Define o identificador do carro.
     * @param idCarro - Novo identificador do carro.
     */
    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    /**
     * Obtém o identificador do cliente.
     * @returns O identificador do cliente.
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Define o identificador do cliente.
     * @param idCliente - Novo identificador do cliente.
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Obtém a data do pedido.
     * @returns A data do pedido.
     */
    public getDataPedido(): Date {
        return this.dataPedido;
    }

    /**
     * Define a data do pedido.
     * @param dataPedido - Nova data do pedido.
     */
    public setDataPedido(dataPedido: Date): void {
        this.dataPedido = dataPedido;
    }

    /**
     * Obtém o valor do pedido.
     * @returns O valor do pedido.
     */
    public getValorPedido(): number {
        return this.valorPedido;
    }

    /**
     * Define o valor do pedido.
     * @param valorPedido - Novo valor do pedido.
     */
    public setValorPedido(valorPedido: number): void {
        this.valorPedido = valorPedido;
    }

    /**
     * Busca e retorna uma lista de pedidos de venda do banco de dados.
     * @returns Um array de objetos do tipo `PedidoVenda` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todos os registros da tabela "pedido_venda".
     * - Os dados retornados são utilizados para instanciar objetos da classe `PedidoVenda`.
     * - Cada pedido de venda instanciado é adicionado a uma lista que será retornada ao final da execução.
     * - Caso ocorra uma falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */
    static async listagemPedidos(): Promise<Array<PedidoVenda> | null> {
        const listaDePedidos: Array<PedidoVenda> = [];

        try {
            const querySelectPedidos = `SELECT * FROM pedido_venda;`;
            const respostaBD = await database.query(querySelectPedidos);

            respostaBD.rows.forEach((linha) => {
                const novoPedidoVenda = new PedidoVenda(
                    linha.id_carro,
                    linha.id_cliente,
                    linha.data_pedido,
                    parseFloat(linha.valor_pedido)
                );

                novoPedidoVenda.setIdPedido(linha.id_pedido);

                listaDePedidos.push(novoPedidoVenda);
            });

            return listaDePedidos;
        } catch (error) {
            console.log('Erro ao buscar lista de pedidos');
            return null;
        }
    }

    /**
    * Realiza o cadastro de um pedido de venda no banco de dados.
    * 
    * Esta função recebe o ID do cliente, o ID do carro, a data do pedido e o valor do pedido como parâmetros,
    * e insere esses dados na tabela `pedido_venda` no banco de dados. O método retorna um valor booleano indicando 
    * se o cadastro foi realizado com sucesso.
    * 
    * @param {number} idCliente - ID do cliente relacionado ao pedido.
    * @param {number} idCarro - ID do carro relacionado ao pedido.
    * @param {Date} dataPedido - Data do pedido de venda.
    * @param {number} valorPedido - Valor do pedido de venda.
    * @returns {Promise<boolean>} - Retorna `true` se o pedido foi cadastrado com sucesso, e `false` caso contrário.
    * 
    * @throws {Error} - Em caso de erro durante o processo, uma mensagem de erro é exibida no console e o método 
    *                   retorna `false`.
    */

    static async cadastroPedido(idCliente: number, idCarro: number, dataPedido: Date, valorPedido: number): Promise<boolean> {
        try {
            // Query para fazer insert de um pedido na tabela pedido_venda
            const queryInsertPedido = `INSERT INTO pedido_venda (id_cliente, id_carro, data_pedido, valor_pedido) VALUES
                                        (${idCliente}, 
                                        ${idCarro}, 
                                        '${dataPedido}', 
                                        ${valorPedido})
                                        RETURNING id_pedido;`;

            // Executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertPedido);

            // Verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Pedido cadastrado com sucesso! ID do pedido: ${respostaBD.rows[0].id_pedido}`);
                // Retorna true indicando que o cadastro foi realizado com sucesso
                return true;
            }

            // Retorna false se o cadastro não foi realizado
            return false;

        } catch (error) {
            // Imprime uma mensagem de erro no console
            console.log('Erro ao cadastrar o pedido. Verifique os logs para mais detalhes.');
            // Imprime os detalhes do erro no console
            console.log(error);
            // Retorna false em caso de erro
            return false;
        }
    }
}
