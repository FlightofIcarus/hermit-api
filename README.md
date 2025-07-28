# hermit-api

Esta é uma API RESTful desenvolvida em Node.js com TypeScript, projetada para um sistema básico de controle de informações e gerenciamento de jogos. Ela permite a criação de cadastros de jogadores (CRUD completo), gerenciamento de partidas (criação, entrada, saída, início e finalização), e o registro de pontuações por jogador em cada partida. Esta API faz parte de um teste de avaliação para a vaga de desenvolvedor backend na Hermit Crab.
___

## Visão Geral da Arquitetura

A arquitetura do projeto segue um modelo em camadas, com uma organização de pastas que reflete a separação de responsabilidades. Embora tenha inspirações iniciais no padrão MVC (Model-View-Controller), ela expande essa abordagem com camadas específicas para uma maior modularidade e clareza.

### Principais Tecnologias e Ferramentas Utilizadas:

Linguagem: TypeScript

Ambiente de Execução: Node.js

Framework Web: Express.js

ORM (Object-Relational Mapper): Sequelize

Banco de Dados: SQLite3

Autenticação/Autorização: bcryptjs para hashing de senhas.

Documentação da API: Swagger (swagger-jsdoc e swagger-ui-express)

CORS: cors

Testes: Jest e ts-jest

Ferramentas de Desenvolvimento: tsx para execução de TypeScript em tempo real, ESLint para linting.

### A estrutura de pastas é dividida da seguinte forma:

src/controllers/: Responsáveis por receber e coordenar as requisições HTTP, atuando como a interface entre as solicitações do cliente e a lógica de negócios.

src/services/: Contém a lógica de negócios principal da aplicação, orquestrando as operações e garantindo a correta execução das regras de negócio, independentemente da forma como a requisição chega.

src/repositories/: Abstrai a lógica de interação com o banco de dados. Cada repositório é responsável por operações CRUD (Create, Read, Update, Delete) para uma entidade específica, garantindo que a camada de serviço não precise se preocupar com os detalhes de persistência.

src/models/: Define as entidades do domínio, Data Transfer Objects (DTOs) e interfaces que representam a estrutura dos dados, incluindo os modelos do Sequelize para mapeamento objeto-relacional.

src/routes/: Define os endpoints da API e associa-os aos métodos dos controladores correspondentes.

src/validators/: Responsáveis por validar os dados de entrada das requisições, garantindo a integridade e conformidade dos dados antes que cheguem à lógica de negócios.

src/views/: Gerencia as DTOs (Data Transfer Objects) para entrada e saída, formatando os dados conforme necessário para a comunicação com o cliente ou outras camadas.

src/config/: Contém as configurações gerais da aplicação, incluindo a inicialização do banco de dados.

src/swagger.config.ts: Configuração da documentação da API utilizando Swagger.

O ponto de entrada da aplicação é o arquivo index.ts. O projeto também utiliza tsconfig.json para as configurações do TypeScript, package.json para metadados e dependências, e jest.config.js para as configurações de testes unitários.

### Comunicação dos Componentes:

A comunicação na Hermit API é realizada em dois níveis distintos:

Comunicação Cliente-Servidor: Os clientes interagem com a API através de requisições HTTP, utilizando verbos HTTP apropriados (GET, POST, PUT, DELETE) e URLs específicas para os recursos. As requisições podem incluir parâmetros e queries para filtrar ou especificar os dados.

Comunicação Interna entre Camadas: A interação dentro da própria aplicação segue um fluxo bem definido por chamadas de método:

Uma requisição HTTP chega ao servidor.

O Controller (src/controllers/) recebe a requisição, valida os dados (utilizando src/validators/) e invoca o método apropriado no Service.

O Service (src/services/) executa a lógica de negócio, podendo invocar métodos no Repository.

O Repository (src/repositories/) interage com o banco de dados (via Sequelize e SQLite3), buscando ou persistindo dados.

Os dados são retornados do Repository para o Service.

O Service processa a resposta e a retorna para o Controller.

O Controller formata a resposta (utilizando src/views/) e a envia de volta como resposta HTTP ao cliente.
____

## Padrões de Arquitetura e Design Utilizados

A arquitetura da Hermit API incorpora diversos padrões e princípios de design para garantir a modularidade, manutenibilidade e escalabilidade:

Padrão de Arquitetura em Camadas (com inspiração MVC): A divisão clara das responsabilidades em controllers, services, repositories e models estabelece uma arquitetura em camadas, onde cada camada tem um papel bem definido, promovendo a separação de interesses.

Repository Pattern: O diretório src/repositories/ encapsula a lógica de acesso a dados, provendo uma abstração sobre o armazenamento de persistência (SQLite3 via Sequelize). Isso facilita a troca do banco de dados ou ORM no futuro sem impactar as camadas superiores.

Service Layer Pattern: A existência da camada src/services/ centraliza a lógica de negócio complexa, desacoplando-a dos controladores e repositórios. Isso aumenta a coesão da lógica de negócio e permite sua reutilização.

Princípio da Responsabilidade Única (SRP - Single Responsibility Principle): Há um esforço em dividir as responsabilidades por cada camada e arquivo, o que facilita a manutenção e compreensão do código. Observação: Aspecto que ainda cabe refatoração e melhorias.

Injeção de Dependência (DI - Dependency Injection): O projeto utiliza injeção de dependência através da instanciação das classes, onde as dependências (como services em controllers, ou repositories em services) são passadas no momento da criação da instância, evitando que as classes criem suas próprias dependências e facilitando testes unitários.

Factory Pattern: Um padrão Factory é empregado para simplificar a instanciação da cadeia de dependências:

Instanciando os repositórios (recebendo os modelos do Sequelize), depois instanciando os serviços (injetando os repositórios correspondentes), e, finalmente, criando os controladores (injetando os serviços necessários). Essa abordagem centralizada ajuda a "diminuir a poluição" no código de inicialização e orquestração das dependências.

Configuração Centralizada: A configuração e inicialização do banco de dados são centralizadas em um arquivo separado dentro de src/config/, promovendo a organização e fácil manutenção das configurações de ambiente.
___________

## ⚙️ Instruções para Rodar o Projeto Localmente
Siga os passos abaixo para configurar e executar a Hermit API em seu ambiente local.

Pré-requisitos:

Node.js: Versão 20.12.2 ou superior. Você pode baixá-lo em nodejs.org.

npm (gerenciador de pacotes do Node.js): Geralmente vem instalado com o Node.js.

Git: Para clonar o repositório. Você pode baixá-lo em git-scm.com.

Instalação:

Clonar o Repositório:
Você pode clonar o projeto usando o Git com o comando:

```
Bash

git clone https://github.com/FlightofIcarus/hermit-api.git
```

Alternativamente, você pode baixar o ZIP do repositório diretamente pelo botão "Code" no GitHub.

Navegar até o Diretório do Projeto:

```
Bash

cd hermit-api
```

Instalar Dependências:
Instale todas as dependências do projeto listadas no package.json:

```
Bash

npm install
```

Configuração do Ambiente:

Variáveis de Ambiente: Este projeto não utiliza um arquivo .env para configurações. Todas as configurações relevantes são gerenciadas diretamente no código, em particular na pasta src/config/. Embora o uso de .env seja uma prática comum e recomendada para ambientes de produção, não é necessário para a execução local deste projeto.

Banco de Dados: A inicialização e configuração do banco de dados (SQLite3) são tratadas automaticamente por um arquivo específico dentro da pasta src/config/. Não são necessários comandos de migração manuais.

Executando o Projeto:

Modo de Desenvolvimento:
Para iniciar a API em modo de desenvolvimento (com tsx para recarga automática ao salvar arquivos):

```
Bash

npm run dev
```

Modo de Produção:
Para compilar e iniciar a API (ideal para ambientes de produção, se fosse ser colocar "online" realmente.):

```
Bash

npm run build
npm start
```

Acessando a API:

A API estará disponível localmente em: http://localhost:3000

Atenção: Certifique-se de que nenhuma outra aplicação esteja utilizando a porta 3000 em sua máquina, pois isso causará um conflito.

Documentação Swagger:
A documentação interativa da API pode ser acessada através do Swagger UI em:
http://localhost:3000/api-docs
Não é necessário fornecer credenciais básicas para acessar a documentação do Swagger.

Outros Scripts Úteis:

npm test: Executa os testes unitários configurados com Jest. Atenção: Atualmente, este comando apresentará falhas, pois uma esteira de testes completa ainda não foi implementada para o projeto.

npm run lint: Executa o linter (ESLint) para verificar a conformidade do código com as regras de estilo.

npm run build: Compila o código TypeScript para JavaScript.
____

## Tempo Gasto e Maiores Dificuldades

Este projeto foi desenvolvido com um prazo total de até 7 dias. Contudo, a dedicação não pôde ser integral devido a questões de saúde, resultando em dois dias de indisposição total e dois dias com disponibilidade reduzida. O trabalho efetivo na solução ocorreu nos dias Terça-feira, Quarta-feira, Sábado e Domingo. Estima-se que cerca de 4 a 6 horas de trabalho efetivo foram dedicadas na Quarta-feira e Sábado, enquanto na Terça-feira e Domingo a dedicação foi de aproximadamente 6 a 10 horas.

Além do desafio pessoal de ter adoecido durante o período, as maiores dificuldades técnicas e desafios enfrentados foram:

Mapeamento e Desenho de Entidades e Relações: Houve uma dificuldade inicial em traduzir o design conceitual das entidades e suas relações para uma representação sistêmica precisa.

Tipagem com Sequelize e Implementação Geral: A utilização do ORM Sequelize, juntamente com o SQLite para persistência local, apresentou desafios na tipagem de todo o sistema. Não foi possível criar todos os types e interfaces desejados, o que, embora não impeça o funcionamento da API, gera algumas reclamações de erro por falta de tipagem completa.

Adesão aos Princípios RESTful: Lembrar e aplicar estritamente todos os parâmetros que definem uma API como RESTful (e não apenas REST) foi um desafio. Isso incluiu o mapeamento correto de rotas (URLs) e o uso adequado dos verbos HTTP.

Para superar esses desafios, a estratégia adotada foi o recurso extensivo a leituras e documentações. Isso incluiu a busca por artigos, melhores práticas e diferentes visões de outros desenvolvedores. Especificamente, a documentação do próprio Sequelize foi amplamente consultada para garantir as melhores formas de estabelecer as associações (relações entre modelos). Similarmente, longas pesquisas em artigos sobre o design de APIs RESTful foram realizadas para aprofundar o entendimento sobre os parâmetros essenciais e o mapeamento de URLs.
