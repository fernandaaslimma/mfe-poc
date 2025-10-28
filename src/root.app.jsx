import React from 'react';
import create from 'zustand';
import Demo from './components/Demo';

// Store local do MFE usando Zustand
const useLocalStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  reset: () => set({ count: 0 })
}));

// Acesso ao estado global do monolito via window (bridge simples)
function useGlobalUser() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const getUser = () => {
      try {
        // Acessa o store global do monolito exposto em window.ibGlobalStore
        const globalState = window?.ibGlobalStore?.getState?.();
        const userInfo = globalState?.userInfo || null;
        setUser(userInfo);
      } catch (_) {
        setUser(null);
      }
    };
    getUser();
    const interval = setInterval(getUser, 2000);
    return () => clearInterval(interval);
  }, []);
  return user;
}

export default function App() {
  const { count, increment, reset } = useLocalStore();
  const user = useGlobalUser();
  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h2>MFE-POC (React 19 + Zustand)</h2>
      <p>Estado local (count): {count}</p>
      <button onClick={increment}>Incrementar</button>
      <button onClick={reset} style={{ marginLeft: 8 }}>Resetar</button>
      <Demo />
      <div style={{ marginTop: 16 }}>
        <h3>Usuário Global (monolito)</h3>
        <pre style={{ background: '#f5f5f5', padding: 12 }}>
{JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}


