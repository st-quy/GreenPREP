import Header from '@pages/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
