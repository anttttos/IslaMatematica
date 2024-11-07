// app/layout.tsx
import '../i18n';
import './globals.css';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="es">
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'url("https://img.freepik.com/vector-premium/isla-tropical-dibujos-animados-palmeras-montanas-mar-azul-flores-vides-ilustracion_273525-12.jpg") no-repeat center center fixed',
          backgroundSize: 'cover',
        }}
      >
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '30px',
            borderRadius: '15px',
            maxWidth: '600px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          {children}
        </main>
        <footer
          style={{
            position: 'fixed',
            bottom: '10px',
            left: '10px',
            color: '#ffffff',
            fontSize: '0.8rem',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '5px 10px',
            borderRadius: '5px',
          }}
        >
          &copy; 2024 Isla Matemática
        </footer>
      </body>
    </html>
  );
};

export default Layout;
