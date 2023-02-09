# driven-pratica-games

* **Atividade prática: Testando os games** do aluno Luiz Cláudio F. Fernandez, Turma 8 da Driven.

## Instruções para rodar localmente

* Certifique-se de ter o [Git](https://git-scm.com/), [Node](https://nodejs.org/en/) (ou [NVM](https://github.com/nvm-sh/nvm)) e [PostgreSQL](https://www.postgresql.org/download/) instalados e configurados.

* Baixe ou clone o projeto na sua máquina local.

* Certifique-se de que o servidor do PostgreSQL esteja rodando.

* Na raiz do projeto, instale as dependências necessárias com o comando:

    ```
    npm i
    ```

    ou

    ```
    npm install
    ```

* Crie um arquivo `.env` preenchendo as variáveis com os devidos ajustes baseados na sua configuração local:

    * A conexão com o banco exige uma configuração semelhante a:

        ```
        DATABASE_URL = postgres://<usuario>:<senha>@localhost:5432/<banco>?schema=public
        ```

        onde `<usuario>` e `<senha>` são o usuário e senha do seu ambiente local; `<banco>` é um nome qualquer que você queira usar; e assumindo que o Postgres esteja rodando na porta padrão (5432);

    * Uma variável opcional é a:

        ```
        PORT = <porta>
        ```

        onde `<porta>` é a porta desejada para que aplicação rode. Caso essa variável não seja especificada, por padrão, será feita a tentativa de conexão na porta 5000.

* Crie a estrutura do seu banco de dados de desenvolvimento com o comando:

    ```
    npx dotenv -e .env npx prisma migrate dev --jobs postgres-init
    ```

* Rode o projeto no ambiente de desenvolvimento com o comando:

    ```
    npm run dev
    ```

* Um servidor local estará rodando por padrão na porta 5000 ao ser retornada a mensagem:

    ```
    Server running on port 5000
    ```

## Instruções para testar localmente

* Crie um arquivo `.env.test` preenchendo as variáveis com os devidos ajustes baseados na sua configuração local de maneira semelhante ao que foi nas instruções anteriores, mas com outro nome de banco. Uma sugestão é inserir o sufixo `_test` no nome escolhido para o banco que será criado para testes, com a variável resultando em algo semelhante a:

    ```
    DATABASE_URL = postgres://<usuario>:<senha>@localhost:5432/<banco>_test?schema=public
    ```

* Crie a estrutura do seu banco de dados de testes com o comando:

    ```
    npx dotenv -e .env.test npx prisma migrate dev --jobs postgres-init
    ```

* Teste o projeto com o comando:

    ```
    npm test
    ```
