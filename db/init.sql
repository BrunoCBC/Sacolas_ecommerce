CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    valor DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50),
    imagem_url VARCHAR(1000)
);

INSERT INTO produtos (titulo, descricao, valor, categoria, imagem_url)
VALUES 
("Sacola Verde", "Sacola ecológica personalizada", 29.90, "Ecológica", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.tcdn.com.br%2Fimg%2Fimg_prod%2F862884%2Fsacola_verde_personalizada_23x16x7_cm_axlxp_pacote_com_100_a_1000_unidades_2277_1_5d0c19538da43de6e7402ea1485df09d.jpg&f=1&nofb=1&ipt=0020c65d3e530169669a3e9b824d1b41f5e032825fd3adc7e8d15bc493557500"),
("Sacola Azul", "Sacola em tecido azul", 34.90, "Tecido", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthf.bing.com%2Fth%2Fid%2FOIP.gsueZHDl9ZM_Ne5uQshuowHaHa%3Fcb%3Dthfc1%26pid%3DApi&f=1&ipt=9251b8ed7e4bbe0a498fd11723e3dea999ea41a55ed126f6c70b9afcb2133323");
