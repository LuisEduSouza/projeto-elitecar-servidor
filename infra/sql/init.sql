CREATE TABLE carro (
    id_carro SERIAL UNIQUE NOT NULL PRIMARY KEY,
    marca VARCHAR (50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
	ano INT,
    cor VARCHAR(20)
);

CREATE TABLE cliente (
    id_cliente SERIAL UNIQUE NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
	telefone VARCHAR(16)
);

CREATE TABLE pedido_venda (
    id_pedido SERIAL UNIQUE NOT NULL PRIMARY KEY,
	id_cliente INT NOT NULL,
	id_carro INT NOT NULL,
    data_pedido DATE NOT NULL,
    valor_pedido DECIMAL (6) NOT NULL,
	FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
	FOREIGN KEY (id_carro) REFERENCES carro (id_carro)
);

INSERT INTO carro (marca,modelo,ano,cor) VALUES
('Fiat', 'Fiorino', 2015, 'Azul'),
('Honda', 'Civic', 2018, 'Preto'),
('Ford', 'Mustang', 2021, 'Vermelho'),
('Chevrolet','Onix', 2019, 'Branco'),
('Volkswagen', 'Gol', 2017, 'Prata');

INSERT INTO cliente (nome,cpf,telefone) VALUES
('João da Silva', '12345678901', '(11) 91234-5678'),
('Maria Souza', '98765432100', '(21) 99876-5432'),
('Carlos Pereira', '45612378910', '(31) 97654-3210'),
('Ana Costa','78945612320', ' (41) 93456-7890'),
('Pedro Lima', '32165498700', '(51) 98765-4321');

INSERT INTO pedido_venda (id_cliente,id_carro,data_pedido,valor_pedido) VALUES
(1, 2, '2023-09-15', 45000.00),
(3, 1, '2023-08-10', 55000.00),
(2, 4, '2023-07-22', 30000.00),
(4, 3, '2023-09-05', 70000.00),
(5, 5,  '2023-09-25', 6000.00);