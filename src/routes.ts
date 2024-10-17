import { Request, Response, Router } from "express";
import { CarroController } from "./controller/CarroController";
import { ClienteController } from "./controller/ClienteController";
import { PedidoVendaController } from "./controller/PedidoVendaController";

// Cria um roteador
const router = Router();

// Criando sua rota principal para a aplicação
router.get("/", (req:Request, res:Response) => {
    res.json({ mensagem: "Bem-vindo ao meu servidor"});
});

// ROTAS PARA CARROS
router.get('/lista/carros', CarroController.todos);

// ROTAS PARA CLIENTES
router.get('/lista/clientes', ClienteController.todos);

// ROTAS PARA PEDIDOS
router.get('/lista/pedidos', PedidoVendaController.todos);

// Exportando as rotas
export{ router };