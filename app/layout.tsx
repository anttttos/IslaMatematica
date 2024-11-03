// app/layout.tsx
import '../i18n'; // Importa la configuración de i18n
import './globals.css';
import { ReactNode } from 'react';
import Header from '../components/Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <footer style={{ textAlign: 'center', padding: '10px', background: '#f4f4f4' }}>
          &copy; 2024 Isla Matemática
        </footer>
      </body>
    </html>
  );
};

export default Layout;
