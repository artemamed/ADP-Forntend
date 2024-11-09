import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './error-page';
import SideBar from './components/SideBar';
import Login from './pages/auth/Login';
import PublicRoute from './PublicRoute';
import Home from './pages/Home';
import ProtectedRoute from './ProtectedRoute';
import SettingsSidebar from './pages/settings/Sidebar';
import ProfileChanges from './pages/settings/profile-changes';
import Appearance from './pages/settings/Appearance';
import Profile from './pages/profile';
import Clients from './pages/clients';
import OperatorUsers from './pages/teams/Operators';
import MarketingUsers from './pages/teams/marketing';
import Products from './pages/catalog/products';
import SubCategories from './pages/catalog/sub-categories';
import Categories from './pages/catalog/categories';
import CompanyProfile from './pages/clients/company/profile';
import AddNewCompany from './pages/clients/company/add-new-company';

const router = createBrowserRouter([
  {
    element: <ProtectedRoute to={'/auth/login'} replace={true} />,
    children: [
      {
        path: '/',
        element: <SideBar />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: 'dashboard',
            element: <Home />,
          },
          {
            path: 'clients',
            element: <Clients />,
          },
          {
            path: 'clients/company/profile/:serialCode',
            element: <CompanyProfile />,
          },
          {
            path: 'clients/company/add-new-company',
            element: <AddNewCompany />,
          },
          {
            path: 'teams/operators',
            element: <OperatorUsers />,
          },
          {
            path: 'teams/marketing',
            element: <MarketingUsers />,
          },
          {
            path: 'catalog/categories',
            element: <Categories />,
          },
          {
            path: 'catalog/sub-categories',
            element: <SubCategories />,
          },
          {
            path: 'catalog/products',
            element: <Products />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: '/settings',
            element: <SettingsSidebar />,
            children: [
              {
                path: '',
                element: <Appearance />,
              },
              {
                path: 'profile-changes',
                element: <ProfileChanges />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute to={'/auth/login'} replace={true} />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
    ],
  },
]);
export default router;
