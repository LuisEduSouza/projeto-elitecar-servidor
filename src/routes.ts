import { Request, Response, Router } from "express";
import { CarroController } from "./controller/CarroController";
import { ClienteController } from "./controller/ClienteController";
import { PedidoVendaController } from "./controller/PedidoVendaController";

// Cria um roteador
const router = Router();

// Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, mundo!" });
});

/* 
* ROTAS PARA CARROS
*/ 
// Rota para listar os carros
router.get("/lista/carros", CarroController.todos);
//Rota para cadastro de carros
router.post("/novo/carro", CarroController.novo);
//Rota para remover carros
router.delete("/delete/carro/:idCarro", CarroController.remover);
//Rota para atualizar carros
router.put("/atualizar/carro/:idCarro", CarroController.atualizar);

/* 
* ROTAS PARA CLIENTES
*/ 
// Rota para listar os clientes
router.get("/lista/clientes", ClienteController.todos);
//Rota para cadastro de clientes
router.post("/novo/cliente", ClienteController.novo);
//Rota para remover cliente
router.delete("/delete/cliente/:idCliente", ClienteController.remover);
//Rota para atualizar clientes
router.put("/atualizar/cliente/:idCliente", ClienteController.atualizar);

/* 
* ROTAS PARA PEDIDOS
*/ 
// Rota para listar os pedidos
router.get("/lista/pedidos", PedidoVendaController.todos);
//Rota para cadastro de clientes
router.post("/novo/pedido", PedidoVendaController.novo);
//Rota para remover pedido
router.delete("/delete/pedido/:idPedido", PedidoVendaController.remover);
//Rota para atualizar pedidos
router.put("/atualizar/pedido/:idPedido", PedidoVendaController.atualizar);

// exportando as rotas
export { router };