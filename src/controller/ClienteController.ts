import { Request, Response } from "express";
import { Cliente } from "../model/Cliente";

// Interface que define o formato esperado para os dados do cliente.
interface ClienteDTO {
    nome: string,
    cpf: string,
    telefone: string
}

/**
 * A classe `ClienteController` estende a classe `Cliente` e é responsável por controlar as requisições relacionadas aos clientes.
 * 
 * - Como um controlador em uma API REST, esta classe gerencia as operações relacionadas ao recurso "cliente".
 * - Herdando de `Cliente`, ela pode acessar os métodos e propriedades da classe base.
 */
export class ClienteController extends Cliente {

    /**
     * Lista todos os clientes.
     * 
     * Esta função responde a uma requisição HTTP listando todos os clientes disponíveis no banco de dados.
     * Utiliza o método estático `listagemClientes` da classe `Cliente` para buscar os dados.
     * 
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de clientes em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de clientes.
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método para listar os clientes no banco de dados.
            const listaDeClientes = await Cliente.listagemClientes();
            console.log(listaDeClientes);

            // Retorna a lista em formato JSON com status 200.
            return res.status(200).json(listaDeClientes);
        } catch (error) {
            // Loga um erro no console e retorna uma mensagem de erro ao cliente.
            console.log('Erro ao acessar listagem de clientes');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de clientes" });
        }
    }

    /**
     * Cadastra um novo cliente.
     * 
     * Recebe os dados do cliente no corpo da requisição, cria uma instância de `Cliente` e utiliza 
     * o método estático `cadastroCliente` para inserir os dados no banco.
     * 
     * @param req Objeto de requisição HTTP, contendo os dados do cliente no corpo da requisição no formato `ClienteDTO`.
     * @param res Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
     * @returns Resposta HTTP com status 200 e uma mensagem de sucesso ou 400 com uma mensagem de erro.
     */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // Recupera os dados do cliente do corpo da requisição.
            const clienteRecebido: ClienteDTO = req.body;

            // Cria uma nova instância de Cliente com os dados recebidos.
            const novoCliente = new Cliente(clienteRecebido.nome, clienteRecebido.cpf, clienteRecebido.telefone);

            // Chama o método para cadastrar o cliente no banco de dados.
            const respostaClasse = await Cliente.cadastroCliente(novoCliente);

            // Verifica a resposta do método e retorna a mensagem apropriada.
            if (respostaClasse) {
                return res.status(200).json({ mensagem: "Cliente cadastrado com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar o cliente. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Loga o erro no console e retorna uma mensagem de erro ao cliente.
            console.log(`Erro ao cadastrar um cliente. ${error}`);
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o cliente. Entre em contato com o administrador do sistema." });
        }
    }

    /**
     * Remove um cliente.
     * 
     * Recebe o identificador do cliente a ser removido via parâmetro na URL e utiliza o método `removerCliente` 
     * para excluí-lo do banco de dados.
     * 
     * @param req Objeto de requisição HTTP contendo o ID do cliente nos parâmetros.
     * @param res Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
     * @returns Resposta HTTP com status 200 e uma mensagem de sucesso ou 400 com uma mensagem de erro.
     */
    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            // Recupera o ID do cliente a ser removido a partir dos parâmetros da requisição.
            const idCliente = parseInt(req.params.idCliente as string);

            // Chama o método para remover o cliente do banco de dados.
            const respostaModelo = await Cliente.removerCliente(idCliente);

            // Verifica a resposta do método e retorna a mensagem apropriada.
            if (respostaModelo) {
                return res.status(200).json({ mensagem: "Cliente removido com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao remover o cliente. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Loga o erro no console e retorna uma mensagem de erro ao cliente.
            console.log(`Erro ao remover um cliente. ${error}`);
            return res.status(400).json({ mensagem: "Não foi possível remover o cliente. Entre em contato com o administrador do sistema." });
        }
    }

    /**
     * Atualiza os dados de um cliente.
     * 
     * Recebe o identificador do cliente a ser atualizado via parâmetro e os novos dados via corpo da requisição.
     * Cria uma instância de `Cliente` com os dados atualizados e utiliza o método `atualizarCliente` para 
     * aplicar as mudanças no banco de dados.
     * 
     * @param req Objeto de requisição HTTP contendo o ID do cliente nos parâmetros e os novos dados no corpo.
     * @param res Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
     * @returns Resposta HTTP com status 200 e uma mensagem de sucesso ou 400 com uma mensagem de erro.
     */
    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            // Recupera o ID do cliente a ser atualizado dos parâmetros da requisição.
            const idClienteRecebido = parseInt(req.params.idCliente as string);

            // Recupera os novos dados do cliente do corpo da requisição.
            const clienteRecebido: ClienteDTO = req.body;

            // Cria uma nova instância de Cliente com os dados atualizados.
            const clienteAtualizado = new Cliente(clienteRecebido.nome, clienteRecebido.cpf, clienteRecebido.telefone);

            // Define o ID do cliente na instância criada.
            clienteAtualizado.setIdCliente(idClienteRecebido);

            // Chama o método para atualizar o cliente no banco de dados.
            const resposta = await Cliente.atualizarCliente(clienteAtualizado);

            // Verifica a resposta do método e retorna a mensagem apropriada.
            if (resposta) {
                return res.status(200).json({ mensagem: "Cliente atualizado com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao atualizar o cliente. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Loga o erro no console e retorna uma mensagem de erro ao cliente.
            console.log(`Erro ao atualizar um cliente. ${error}`);
            return res.status(400).json({ mensagem: "Não foi possível atualizar o cliente. Entre em contato com o administrador do sistema." });
        }
    }
}
