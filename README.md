# Portal de Notícias

API desenvolvida com Express.js para o trabalho da disciplina de Programação e Técnicas para Aplicações Servidor 3. O projeto consiste em um portal de notícias simples, que permite publicar notícias, editá-las dentro de um prazo, comentá-las e pesquisá-las por texto.

Desenvolvido por: Enzo Fuso Paschoalim e Pedro Bumbieris Travaim

## Executando o projeto

Instale as dependências e inicie o servidor:

npm install
node src/server.js

Por padrão, o servidor utiliza a porta 3000. Portanto, as rotas estão disponíveis em http://localhost:3000.

Observação: atualmente, os dados são armazenados apenas em memória (arrays). Por isso, sempre que o servidor é reiniciado, todas as informações são perdidas. Pretende-se substituir esse armazenamento pelo MongoDB futuramente.

## Entidades

- **Autor**: pessoa responsável por escrever as notícias.
- **Postagem**: a notícia em si, que pertence a um autor e possui uma categoria.
- **Comentário**: mensagem deixada por um leitor em uma postagem.

Dessa forma, um autor pode ter várias postagens, e cada postagem pode ter vários comentários.

## Regras de negócio

O sistema garante o cumprimento de duas regras, indo além do simples armazenamento e leitura de dados:

1. **Prazo de edição**: após a publicação, a notícia só pode ser editada nos primeiros 30 minutos. Passado esse prazo, a API recusa a edição.
2. **Categoria única**: toda notícia deve ter exatamente uma categoria. Não é permitido enviar uma lista de categorias.

## Endpoints

### Postagens

**Listar ou buscar por texto**

GET /postagens
GET /postagens?busca=prefeito

**Buscar uma postagem específica**

GET /postagens/:id

**Criar**

POST /postagens

Envie no corpo da requisição:

{
"titulo": "Novo prefeito eleito",
"conteudo": "A cidade elegeu ontem seu novo prefeito.",
"categoria": "Política",
"autorId": 1
}

Retorna o status 201 com a postagem criada. Caso algum campo esteja ausente, ou a categoria seja enviada como lista, retorna o status 400.

**Editar**

PUT /postagens/:id

O corpo é o mesmo do exemplo acima, mas é possível enviar apenas os campos que se deseja alterar. Se já tiverem se passado mais de 30 minutos desde a publicação, retorna o status 403.

**Apagar**

DELETE /postagens/:id

Retorna o status 204 (sem corpo) em caso de sucesso.

### Autores

**Listar**

GET /autores

**Buscar um autor específico**

GET /autores/:id

**Criar**

POST /autores

{
"nome": "Enzo Fuso",
"email": "enzo@email.com"
}

**Editar**

PUT /autores/:id

{
"nome": "Enzo Fuso Paschoalim"
}

**Apagar**

DELETE /autores/:id

### Comentários

**Listar (ou filtrar por postagem)**

GET /comentarios
GET /comentarios?postagemId=1

**Criar**

POST /comentarios

{
"postagemId": 1,
"autor": "Maria",
"texto": "Ótima notícia!"
}

A criação só é permitida se a postagem referenciada existir. Caso contrário, retorna o status 404.

**Apagar** (para fins de moderação)

DELETE /comentarios/:id

## Erros

Os erros são sempre retornados no seguinte formato:

{ "erro": "mensagem explicando o que deu errado" }

Os status mais comuns são: 400 (campo ausente ou dado inválido), 404 (recurso não encontrado) e 403 (prazo de edição expirado).