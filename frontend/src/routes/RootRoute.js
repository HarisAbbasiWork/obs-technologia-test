import React, { lazy } from 'react';

const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

const RootRoute = {
    path: '/',
    element: <AuthLogin3 />,
}