import React, { lazy } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
// const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));


// utilities routing
const Users = Loadable(lazy(() => import('views/utilities/Users')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const AccountSetting = Loadable(lazy(() => import('views/accountsetting')));
const UpdateProfile = Loadable(lazy(() => import('views/updateprofile')));
// import { setUser, resetUser } from '../store/actions';
// import { useDispatch } from 'react-redux';

// ==============================|| MAIN ROUTING ||============================== //

// const dispatch = useDispatch();
// dispatch(setUser(user));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'users',
      element: <Users />
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'accountsetting',
      element: <AccountSetting />
    },
    {
      path: 'updateprofile',
      element: <UpdateProfile />
    }
  ]
};

// function MainRoutes() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route index element={<DashboardDefault />} />
//           <Route path="dashboard" element={<DashboardDefault />} />
//           <Route path="categories" element={<UtilsTypography />} />
//           <Route path="movies" element={<UtilsColor />} />
//           <Route path="utils">
//             <Route path="util-shadow" element={<UtilsShadow />} />
//           </Route>
//           <Route path="icons">
//             <Route path="tabler-icons" element={<UtilsTablerIcons />} />
//             <Route path="material-icons" element={<UtilsMaterialIcons />} />
//           </Route>
//           <Route path="sample-page" element={<SamplePage />} />
//           <Route path="accountsetting" element={<AccountSetting />} />
//           <Route path="updateprofile" element={<UpdateProfile />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default MainRoutes;
