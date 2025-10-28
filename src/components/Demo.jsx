import React from 'react';
import { Header, Button } from 'react-bocombbm-components';

export default function Demo() {
  return (
    <div style={{ marginTop: 24 }}>
      <Header />
      <div style={{ marginTop: 16 }}>
        <Button onClick={() => alert('Componente do pacote tgz funcionando!')}>
          Testar Componente
        </Button>
      </div>
    </div>
  );
}


