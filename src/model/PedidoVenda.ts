import { DatabaseModel } from "./DatabaseModel";

// Cria uma instância do modelo de banco de dados e inicializa o pool de conexões.
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
        const listaDePedidos: Array<any> = [];

        try {
            // Define a query SQL para buscar dados de pedidos de venda e informações associadas.
            const querySelectPedidos = `SELECT 
                pedido_venda.id_pedido,
                pedido_venda.id_carro,
                pedido_venda.id_cliente,
                TO_CHAR(pedido_venda.data_pedido, 'DD/MM/YYYY') AS data_pedido_br,
                TO_CHAR(pedido_venda.valor_pedido, 'FM999G999D00') AS valor_total_br,
                cliente.nome AS nome_cliente,
                carro.modelo AS modelo_carro
            FROM 
                pedido_venda
            JOIN 
                cliente ON pedido_venda.id_cliente = cliente.id_cliente
            JOIN 
                carro ON pedido_venda.id_carro = carro.id_carro;`;

            // Executa a consulta no banco de dados.
            const respostaBD = await database.query(querySelectPedidos);

            // Processa cada linha retornada e cria objetos correspondentes.
            respostaBD.rows.forEach((linha) => {
                let pedidoVenda = {
                    idPedido: linha.id_pedido,
                    idCarro: linha.id_carro,
                    idCliente: linha.id_cliente,
                    dataPedido: linha.data_pedido_br,
                    valorTotal: parseFloat(linha.valor_total_br),
                    nomeCliente: linha.nome_cliente,
                    modeloCarro: linha.modelo_carro
                };

                // Adiciona o objeto criado à lista de pedidos.
                listaDePedidos.push(pedidoVenda);
            });

            // Retorna a lista de pedidos.
            return listaDePedidos;
        } catch (error) {
            // Loga a mensagem de erro caso algo dê errado na consulta.
            console.log('Erro ao buscar lista de pedidos');
            return null;
        }
    }

    /**
     * Realiza o cadastro de um pedido de venda no banco de dados.
     * @param idCliente - ID do cliente relacionado ao pedido.
     * @param idCarro - ID do carro relacionado ao pedido.
     * @param dataPedido - Data do pedido de venda.
     * @param valorPedido - Valor do pedido de venda.
     * @returns Retorna `true` se o pedido foi cadastrado com sucesso, e `false` caso contrário.
     */
    static async cadastroPedido(idCliente: number, idCarro: number, dataPedido: Date, valorPedido: number): Promise<boolean> {
        try {
            // Query para inserir dados do pedido de venda na tabela correspondente.
            const queryInsertPedido = `INSERT INTO pedido_venda (id_cliente, id_carro, data_pedido, valor_pedido) VALUES
                (${idCliente}, 
                ${idCarro}, 
                '${dataPedido}', 
                ${valorPedido})
                RETURNING id_pedido;`;

            // Executa a query no banco de dados e captura a resposta.
            const respostaBD = await database.query(queryInsertPedido);

            // Verifica se pelo menos uma linha foi afetada.
            if (respostaBD.rowCount != 0) {
                console.log(`Pedido cadastrado com sucesso! ID do pedido: ${respostaBD.rows[0].id_pedido}`);
                return true;
            }

            return false;

        } catch (error) {
            // Loga mensagens de erro detalhadas no console.
            console.log('Erro ao cadastrar o pedido. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }

    /**
     * Remove um pedido de venda do banco de dados com base no ID.
     * @param idPedido - ID do pedido a ser removido.
     * @returns Retorna `true` se o pedido foi removido com sucesso, e `false` caso contrário.
     */
    static async removerPedido(idPedido: number): Promise<boolean> {
        try {
            // Query para deletar o pedido do banco de dados.
            const queryDeletePedido = `DELETE FROM pedido_venda WHERE id_pedido = ${idPedido};`;

            // Executa a query e verifica a resposta.
            const respostaBD = await database.query(queryDeletePedido);

            if (respostaBD.rowCount != 0) {
                console.log(`Pedido removido com sucesso! ID do pedido: ${idPedido}`);
                return true;
            }

            return false;

        } catch (error) {
            console.log('Erro ao remover o pedido. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }

    /**
     * Atualiza os dados de um pedido de venda existente no banco de dados.
     * @param pedido - Objeto do tipo `PedidoVenda` com os dados atualizados do pedido.
     * @returns Retorna `true` se o pedido foi atualizado com sucesso, e `false` caso contrário.
     */
    static async atualizarPedido(pedido: PedidoVenda): Promise<boolean> {
        try {
            // Query para atualizar os dados do pedido no banco.
            const queryUpdatePedido = `UPDATE pedido_venda
                                        SET id_cliente = ${pedido.getIdCarro()}, 
                                            id_carro = ${pedido.getIdCliente()}, 
                                            data_pedido = '${pedido.getDataPedido()}',
                                            valor_pedido = ${pedido.getValorPedido()}
                                        WHERE id_pedido = ${pedido.getIdPedido()};`;

            const respostaBD = await database.query(queryUpdatePedido);

            if (respostaBD.rowCount != 0) {
                console.log(`Pedido atualizado com sucesso! ID do pedido: ${pedido.getIdPedido()}`);
                return true;
            }

            return false;

        } catch (error) {
            console.log('Erro ao atualizar o pedido. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }
}
