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

### Etapa 2 - CRUD & Persistência
-  Operações CRUD completas para jogos
-  Persistência local com AsyncStorage
-  Validações em tempo real
-  Sistema de busca integrado
-  Tratamento de erros robusto
-  Loading states e feedback visual

### Etapa 3 - Listagem, Busca e Filtros
-  FlatList otimizada para performance
-  Busca por texto (nome, categoria, desenvolvedor, descrição)
-  Filtros por categoria (10 categorias disponíveis)
-  Filtro por faixa de preço (min/max)
-  Ordenação múltipla (nome A-Z/Z-A, preço crescente/decrescente)
-  Ação rápida de adicionar ao carrinho na lista
-  Interface recolhível de filtros para economia de espaço

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


## Como os Filtros Foram Implementados

### Arquitetura do Sistema de Filtros

1. **Componente FiltroJogos** (`src/view/components/common/FiltroJogos.jsx`)
   - Interface recolhível para economia de espaço
   - Chips selecionáveis para categorias
   - Inputs de faixa de preço com validação
   - Botões de ordenação (nome A-Z/Z-A, preço ↑/↓)
   - Estado local com aplicação em lote

2. **Lógica de Filtragem** (`TelaListaJogos.jsx`)
   ```javascript
   const aplicarFiltrosEOrdenacao = (jogosBase, termoBusca, filtrosAtivos) => {
     // 1. Filtra por texto de busca
     // 2. Filtra por categorias selecionadas
     // 3. Filtra por faixa de preço
     // 4. Aplica ordenação escolhida
     return jogosProcessados;
   }
   ```

3. **Performance Otimizada**
   - useEffect com dependências específicas
   - Filtragem em memória (sem chamadas de API)
   - FlatList para renderização eficiente
   - Estado reativo com atualizações instantâneas

### Funcionalidades Principais

- **Navegação fluida** entre todas as telas
- **Cadastro de produtos** com validação completa
- **Carrinho de compras** funcional
- **Sistema de filtros avançado** com múltiplos critérios
- **Busca inteligente** por múltiplos campos
- **Interface moderna** com Material Design
- **Animações** na tela splash
- **Feedback visual** para todas as ações
- **Persistência local** com AsyncStorage


##  Desenvolvedor

Gabriel Martins Virginio - Desenvolvimento Mobile


**SteamVerde** - Sua loja de games virtual favorita!