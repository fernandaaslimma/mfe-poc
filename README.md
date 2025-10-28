# MFE-POC (React 19 + Zustand + single-spa)

## 📋 Resumo
POC de Micro Frontend usando tecnologias modernas (React 19, Zustand) que demonstra:
- Estado local próprio (Zustand)
- Acesso ao estado global do monolito (userInfo)
- Uso de componentes do pacote `react-bocombbm-components`
- Integração com single-spa

## 🚀 Instalação e Execução

### 1. Instalar dependências
```bash
cd C:\GIT\mfe-poc
npm install
```

### 2. Executar o MFE
```bash
npm start
```
- Servidor: http://localhost:9001
- Bundle: http://localhost:9001/bocombbm-mfe-poc.js

### 3. Executar o Root (C:\GIT\root)
```bash
cd C:\GIT\root
npm install
npm start
```

### 4. Executar o Monolito (se necessário)
```bash
cd C:\GIT\ib-monolito
npm start
```

## 🔗 Integração

### Root Config (C:\GIT\root)
- **import.json**: Registra `mfe-poc` → http://localhost:9001/bocombbm-mfe-poc.js
- **bocombbm-root-config.js**: Registra aplicação na rota `/poc`

### Menu do Monolito
- Adicionado item "Teste > POC" apontando para `/poc`

### Bridge de Estado Global
- **Monolito**: Expõe `window.ibGlobalStore` (Redux-Zero store)
- **MFE**: Lê `window.ibGlobalStore.getState().userInfo` a cada 2s

## 🏗️ Arquitetura

### Estado Local (Zustand)
```javascript
const useLocalStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  reset: () => set({ count: 0 })
}));
```

### Estado Global (Bridge)
```javascript
function useGlobalUser() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const getUser = () => {
      const globalState = window?.ibGlobalStore?.getState?.();
      const userInfo = globalState?.userInfo || null;
      setUser(userInfo);
    };
    getUser();
    const interval = setInterval(getUser, 2000);
    return () => clearInterval(interval);
  }, []);
  return user;
}
```

## 📦 Dependências

### Principais
- **React 19**: Framework principal
- **Zustand 4.5.2**: Gerenciamento de estado local
- **single-spa**: Micro frontend framework
- **react-bocombbm-components**: Componentes do monolito (via tgz)

### Build
- **Webpack 5**: Bundle SystemJS
- **Babel**: Transpilação ES6+ e JSX

## 🧪 Teste da POC

1. Acesse o root config
2. Navegue para "Teste > POC"
3. Verifique:
   - ✅ Contador local funcionando (Zustand)
   - ✅ Dados do usuário global aparecendo
   - ✅ Componentes do pacote tgz carregando
   - ✅ React 19 funcionando

## 📝 Observações

- **Externals**: react, react-dom, single-spa, single-spa-react
- **Porta**: 9001 (configurável no webpack.config.js)
- **CORS**: Habilitado para desenvolvimento
- **Hot Reload**: Suportado via webpack-dev-server

## 🔧 Troubleshooting

### userInfo não aparece
- Verifique se `window.ibGlobalStore` está exposto no monolito
- Confirme se o usuário está logado no monolito

### Componentes não carregam
- Verifique se o pacote tgz está instalado corretamente
- Confirme se os componentes existem no pacote

### Rota não funciona
- Verifique se o root config está registrando corretamente
- Confirme se o import-map está apontando para a URL correta
