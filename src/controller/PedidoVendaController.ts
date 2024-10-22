import { Request, Response } from "express";
import { PedidoVenda } from "../model/PedidoVenda";

interface PedidoDTO {
    idCliente: number,
    idCarro: number,
    dataPedido: Date,
    valorPedido: number;
}

/**
 * A classe `PedidoVendaController` estende a classe `PedidoVenda` e é responsável por controlar as requisições relacionadas aos pedidos de venda.
 * 
 * - Como um controlador dentro de uma API REST, esta classe gerencia as operações relacionadas ao recurso "pedido de venda".
 * - Herdando de `PedidoVenda`, ela pode acessar os métodos e propriedades da classe base.
 */
export class PedidoVendaController extends PedidoVenda {

    /**
     * Lista todos os pedidos de venda.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de pedidos de venda em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de pedidos de venda.
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaPedidos = await PedidoVenda.listagemPedidos();

            return res.status(200).json(listaPedidos);
        } catch (error) {
            console.log('Erro ao acessar listagem de carros');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de carros" });
        }
    }

    /**
        * Método controller para cadastrar um novo pedido de venda.
        * 
        * Esta função recebe uma requisição HTTP contendo os dados de um pedido de venda no corpo da requisição
        * e tenta cadastrar este pedido no banco de dados utilizando a função `cadastroPedido`. Caso o cadastro 
        * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
        * uma resposta HTTP 400 com uma mensagem de erro.
        * 
        * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do pedido no formato `PedidoDTO`.
        * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
        * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
        * 
        * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
        *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
        */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // Recuperando informações do corpo da requisição e colocando em um objeto da interface PedidoDTO
            const pedidoRecebido: PedidoDTO = req.body;

            // Instanciando um objeto do tipo PedidoVenda com as informações recebidas
            const novoPedido = new PedidoVenda(
                pedidoRecebido.idCliente, 
                pedidoRecebido.idCarro, 
                pedidoRecebido.dataPedido,
                pedidoRecebido.valorPedido
            );

            // Chamando a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await PedidoVenda.cadastroPedido(
                pedidoRecebido.idCliente,
                pedidoRecebido.idCarro,
                pedidoRecebido.dataPedido,
                pedidoRecebido.valorPedido
            );

            // Verifica a resposta da função
            if (repostaClasse) {
                // Retorna uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Pedido cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro caso o cadastro falhe
                return res.status(400).json({ mensagem: "Erro ao cadastrar o pedido. Entre em contato com o administrador do sistema." });
            }
            
        } catch (error) {
            // Lança uma mensagem de erro no console com detalhes
            console.log(`Erro ao cadastrar um pedido. ${error}`);

            // Retorna uma mensagem de erro para o cliente
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o pedido. Entre em contato com o administrador do sistema." });
        }
    }
}
