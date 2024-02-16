## Projeto Store Manager

Este projeto consiste em uma aplicação para gerenciamento de produtos e vendas em uma loja virtual.

## Tecnologias Utilizadas

  - **Node.js**
  - **Express.js**
  - **MySQL**

## Requisitos do Projeto

### 01 - Crie endpoints para listar produtos

- O endpoint GET /products deve retornar todos os produtos cadastrados.
- O endpoint GET /products/:id deve retornar apenas o produto com o ID fornecido.
- Os resultados devem ser ordenados de forma crescente pelo campo id.
- Crie testes para garantir a funcionalidade implementada.

### 02 - Crie endpoints para listar vendas

- O endpoint GET /sales deve retornar todas as vendas cadastradas.
- O endpoint GET /sales/:id deve retornar apenas a venda com o ID fornecido.
- Os resultados devem ser ordenados de forma crescente pelo campo saleId e, em caso de empate, pelo campo productId.
- Utilize JOINs para buscar dados de mais de uma tabela, se necessário.

### 03 - Crie endpoint para cadastrar produtos

- O endpoint POST /products deve permitir o cadastro de novos produtos.
- Os produtos enviados devem ser salvos na tabela products do banco de dados.
- O corpo da requisição deve conter o nome do produto.

### 04 - Crie validações para o cadastro de produtos

- O endpoint de cadastro de produtos deve retornar mensagens de erro para requisições com dados inválidos.
- As validações devem ser realizadas antes de acessar o banco de dados.

### 05 - Crie endpoint para cadastrar vendas

- O endpoint POST /sales deve permitir o cadastro de novas vendas.
- As vendas enviadas devem ser salvas nas tabelas sales e sales_products do banco de dados.
- Deve ser possível cadastrar a venda de vários produtos através da mesma requisição.

### 06 - Crie validações para o cadastro de vendas

- O endpoint de cadastro de vendas deve retornar mensagens de erro para requisições com dados inválidos.

### 07 - Crie endpoint para atualizar um produto

- O endpoint PUT /products/:id deve permitir a atualização de um produto existente.
- Apenas o produto com o ID presente na URL deve ser atualizado.
- O corpo da requisição deve conter o novo nome do produto.

### 08 - Crie endpoint para deletar um produto

- O endpoint DELETE /products/:id deve permitir a exclusão de um produto existente.
- Apenas o produto com o ID presente na URL deve ser deletado.

### Requisitos Bônus

### 09 - Crie endpoint para deletar uma venda

- O endpoint DELETE /sales/:id deve permitir a exclusão de uma venda existente.
- Apenas a venda com o ID presente na URL deve ser deletada.

### 10 - Crie endpoint para atualizar a quantidade de um produto em uma venda

- O endpoint /sales/:saleId/products/:productId/quantity deve permitir a atualização da quantidade de um produto em uma venda existente.
- Apenas a quantidade do produto com o productId na venda com o saleId fornecido deve ser atualizada.
- O corpo da requisição deve conter a nova quantidade do produto.

### 11 - Crie endpoint para pesquisar produtos

- O endpoint GET /products/search deve permitir a pesquisa de produtos por nome.
- Deve retornar um array de produtos que contenham o termo de busca no nome.
- Caso o query param q esteja vazio, deve retornar todos os produtos.
- Caso nenhum produto satisfaça a busca, deve retornar um array vazio.

## Conclusão

O projeto Store Manager oferece uma solução completa para gerenciamento de produtos e vendas em uma loja virtual. Utilizando Node.js, Express.js e MySQL, o projeto demonstra eficiência e segurança no armazenamento e manipulação de informações. Com a implementação dos requisitos bônus, o Store Manager se torna ainda mais robusto e capaz de atender às necessidades de gestão de estoque e vendas de qualquer loja.
