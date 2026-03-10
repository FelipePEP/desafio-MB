# Table of contents

- [Executando o projeto](#item01)
  - [Instalando as dependências](#item02)
  - [Executando comando integrado](#item03)  
- [Front](#item04)
  - [Arquitetura](#item05)
  - [Requisitos funcionais](#item06)
  - [Validação e feedback](#item07)
  - [Melhorias](#item08)
- [Back](#item09)
  - [Ãrquitetura](#item10)
  - [Validação de dados](#item11)
  - [Melhorias](#item12)

Neste arquivo está tudo que é preciso ler para executar, testar e implementar melhorias neste projeto de avaliação. 

<a id="item01"></a>
# 1 - Executando o projeto
 
 Antes de qualquer coisa é preciso deixar alguns comandos básicos para quem desejar executar o projeto.

<a id="item02"></a>
- ## Instalando as dependências

É preciso instalar o node js e o npm para iniciar o processo

```
npm install
```

<a id="item03"></a>
- ## Executando comando integrado

Após a instalação do npm-run-all é possível rodar os 2 projetos com um único comando:

```
npm run start
```

<a id="item04"></a>
- # Front

Parte do desafio constava em desenvolver um front em Vue JS, sem bibliotecas de estilo e componentes.

<a id="item05"></a>
- ## Arquitetura

A estrutura de pastas adota o padrão amplamente utilizado no mercado Angular (core / shared / features), adaptado ao ecossistema Vue. Essa arquitetura favorece escalabilidade, separação de responsabilidades e reuso de código.

```
src/
├── core/               # Serviços singleton e infraestrutura da aplicação
│   ├── http/           # Abstração das requisições HTTP (apiFetch)
│   └── utils/          # Utilitários globais (tratamento de URL, resposta, erros e feedback)
├── shared/             # Código reutilizável entre diferentes features
│   └── components/     # Componentes genéricos (mbButton, mbInput)
├── features/           # Módulos de negócio organizados por domínio
│   └── registration/   # Feature de cadastro
│       ├── components/ # Componentes específicos da feature (DynamicForm, DynamicInput)
│       └── views/      # Páginas da feature (registrationPage)
├── router/             # Configuração central de rotas
├── styles/             # Estilos globais e variáveis de pré-processador
└── assets/             # Recursos estáticos (imagens, ícones)
```

**Princípios da arquitetura:**
- **core**: tudo que é instanciado uma única vez na aplicação — comunicação HTTP, utilitários globais. Não depende de nenhuma feature.
- **shared**: componentes e utilitários reutilizáveis entre múltiplas features. Não conhece nenhuma feature específica.
- **features**: cada subpasta agrupa tudo que pertence a um domínio de negócio (componentes, views, serviços locais), facilitando evolução e eventual lazy-loading.


<a id="item06"></a>
- ## Requisitos funcionais

Foram previstas 4 etapas para a usabilidade do formulario deste projeto. Pensando em mostrar mais do meu repertório técnico decidi tomar algumas estrategias diferentes.

- Formulários dinamicos: Na segunda etapa eu utilizei 2 componentes dinamicos que permite uma escaliabilidade enorme dos fomrulários, uma vez que ele é alimentado por um html da API. Basta enviar o html do form com seus inputs que o DynamicForm irá instanciar tantos DynamicInputs quantos forem necessários.
- Abstração da camada de requisições HTTP para reuso e simplificação das chamadas feitas com fetch e o tratamento das respostas, try catch e feedback.
- Lógica condicional: Ao invés de criar um componente para as demais etapas ou usar watches/computeds, optei por usar verificações simples de etapa e assim tornar o codigo mais simples para aprendizado e manutenção de profissionais menos experientes.


<a id="item07"></a>
- ## Validação e feedback

Como não foi permitido o uso de typescript e bibliotecas de terceiros, não cheguei a criar classes nem usar badges, barras, notificações nem nada do tipo. Entendendo a necessidade holistica de oferecer feedback do estado da aplicação, eu usei alerts normais do navegador e abstrai esse processo de mensagens de erro e sucesso de operação para a camada utilitária. 

<a id="item08"></a>
- ## Melhorias

Alem de utilizar bibliotecas e frameworks para facilitar o trabalho, gostaria de citar algumas melhorias menos obvias que eu adotaria. Apesar de não achar comum o requisito de consumir um endpoint para receber um html (sem SSR) eu invistiria tempo em componentes dinamizados para extrair o máximo do potencia desse Html do backend. Também aplicaria algum padrão de CSS como o BEM para melhorar as coisas, mas os estsilos escopados nos componentes ajudam a mitigar o problema. Pensando em futuro, também abstrairia o vue para um arquivo  bootstrap e segregaria o que fosse código independente dele, para uma possível mudança de framework.

<a id="item09"></a>
# Back

Parte do desafio constava em desenvolver um back com Node JS, sem bibliotecas, SSR, Banco de Dados e Overengineering.

<a id="item10"></a>
- ## Arquitetura

As pastas foram criadas para manter uma organização e controle de responsabilidades da api.
- Controllers: Agrupar todos os orquestradores que controlam o fluxo de execução do processamento das requisições.
- Middleware:  Reune todo tipo de arquivo que precisa ficar entre o cliente e o servidor por questões de reuso, teste e organização. Agem como umm homem no meio.
- Routes: Arquivo pequeno que comporta as rotas da aplicação e as regras que serão observadas pelos middlewares de validação e segurança


<a id="item11"></a>
- ## Validação de dados

A validação foi feita atraves do validador do express, com  uma lógica simples e funcional que é executada pelos middleweares assim que eles recebem as requisiçóes.

<a id="item12"></a>
- ## Melhorias

A principio eu implementaria uma camada de services e repositories para concluir todo o fluxo de acesso e persistência de Dados. Faria algum aprofundamento no desacoplamento de camadas para deixá-las menos dependentes de si, como sugere a clean archtecture. Também melhoraria as validações e máscaras para os inputs como documentos,  telefones e email. 

