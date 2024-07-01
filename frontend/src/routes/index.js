import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import { useSelector } from 'react-redux';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const isAuth = useSelector((state) => state.user.auth);
  console.log(isAuth, 'isAuth');

  return useRoutes([MainRoutes, AuthenticationRoutes]);
}
