# SteamVerde - App de Vendas de Jogos

Uma loja virtual de games desenvolvida em React Native com Expo.

## Sobre o Projeto

SteamVerde é um aplicativo mobile para venda de jogos digitais. O app permite cadastrar produtos, gerenciar um carrinho de compras e navegar por um catálogo de jogos.

## Tecnologias Utilizadas

- **React Native** com Expo
- **React Navigation** para navegação
- **React Native Paper** para componentes de UI (Material Design)
- **AsyncStorage** para persistência local
- **Context API** para gerenciamento de estado

## Funcionalidades

### Etapa 1 - Telas & Navegação 
-  Tela Splash com animações
-  Login simulado
-  Home com atalhos principais
-  Formulário de cadastro/edição de produtos
-  Tela de detalhe do produto
-  Sistema de carrinho de compras
-  Tela de perfil do usuário
-  Navegação completa entre telas

## Como Rodar

### Pré-requisitos
- Node.js 
- npm ou yarn
- Expo CLI instalado globalmente
- Aplicativo Expo Go no celular (para testar) Obs.: Precisa estar na mesma rede do wifi ou no cabo

### Instalação

1. Clone o repositório:

git clone <url-do-repositorio>
cd steamverde

2. Instale as dependências:

npm install

3. Inicie o projeto:

npx expo start --tunnel

4. Use o aplicativo Expo Go para escanear o QR Code que aparece no terminal ou navegador.

## Estrutura do Projeto

steamverde/
├── src/
│   ├── model/                 # Modelos de dados (Usuario, Jogo, Carrinho, Pedido)
│   ├── view/                  # Telas da aplicação
│   │   ├── TelaSplash.jsx    # Tela inicial animada
│   │   ├── Login.jsx         # Tela de autenticação
│   │   ├── Home.jsx          # Dashboard principal
│   │   ├── components/       # Componentes reutilizáveis
│   │   │   ├── navigator/    # Sistema de navegação
│   │   │   ├── authProvider/ # Contextos (Auth, Carrinho)
│   │   │   ├── forms/        # Formulários
│   │   │   └── common/       # Componentes comuns
│   │   ├── jogos/           # Telas de produtos
│   │   ├── carrinho/        # Tela do carrinho
│   │   └── perfil/          # Tela do usuário
│   ├── service/             # Lógica de negócio e DAOs
│   └── utils/               # Hooks e utilitários
├── assets/                  # Recursos estáticos
└── App.js                   # Arquivo principal


## Funcionalidades Principais

- **Navegação fluida** entre todas as telas
- **Cadastro de produtos** com validação completa
- **Carrinho de compras** funcional
- **Interface moderna** com Material Design
- **Animações** na tela splash
- **Feedback visual** para todas as ações


##  Desenvolvedor

Gabriel Martins Virginio - Desenvolvimento Mobile


**SteamVerde** - Sua loja de games virtual favorita!