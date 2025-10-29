# SteamVerde

Aplicativo mobile de vendas de jogos desenvolvido com React Native e Expo.

## Tecnologias Utilizadas
- React Native
- Expo
- React Navigation
- React Native Paper
- AsyncStorage
- Firebase Authentication

## Estrutura de Pastas
```
steamverde/
├── src/
│   ├── model/              # Modelos de dados
│   ├── service/            # Serviços (autenticação, storage, validação)
│   ├── utils/              # Hooks customizados (carrinho, favoritos, jogos)
│   └── view/               # Telas e componentes
│       ├── components/     # Componentes reutilizáveis
│       ├── carrinho/       # Telas do carrinho
│       ├── favoritos/      # Telas de favoritos
│       ├── jogos/          # Telas de jogos
│       └── perfil/         # Telas de perfil
└── assets/                 # Imagens e ícones
```

## Como Rodar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o projeto:
```bash
npx expo start
```

