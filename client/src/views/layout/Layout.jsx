import { Outlet } from 'react-router-dom';
import NavigationBar from '../../components/navigation-bar/NavigationBar';

const Layout = () => {
  return (
    <div className="layout">
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default Layout;
