import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';

// const Login3 = lazy(() => import('./pages/auth/login3'));

const Dashboard = lazy(() => import('./pages/dashboard'));

const Login3 = lazy(() => import('./pages/auth/login3'));
const Error = lazy(() => import('./pages/404'));

const LogoWebsite = lazy(() => import('./pages/logoWebsite'));

import Layout from './layout/Layout';
import HeroImages from './pages/heroImages';
import paths from './constant/paths';
import HeaderManager from './pages/mainLayout/header-manager/header-manager';
import FooterManager from './pages/mainLayout/footer-manager/footer-manager';
import MainLayout from './pages/mainLayout/MainLayout';
import { CheckAuth, ProtectedRoute, RejectedRoute } from './routes/RouteCheck';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <main className='App relative'>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<CheckAuth />} />
        <Route path='/' element={<RejectedRoute />}>
          <Route
            path={paths.login.link}
            element={
              <Suspense fallback={<Loading />}>
                <Login3 />
              </Suspense>
            }
          />
        </Route>
        <Route path='/' element={<ProtectedRoute />}>
          <Route path='/*' element={<Layout />}>
            <Route path={paths.dashboard.link} element={<Dashboard />} />
            <Route path={paths.section_hero.link} element={<HeroImages />} />
            <Route path={paths.section_partners.link} element={<HeroImages />} />
            <Route path={paths.section_subscribe.link} element={<HeroImages />} />
            <Route path={paths.main_layout.link} element={<MainLayout />} />

            <Route path={paths.header.link} element={<HeaderManager />} />
            <Route path={paths.footer.link} element={<FooterManager />} />
            <Route path={paths.logo_website.link} element={<LogoWebsite />} />

            <Route path='*' element={<Navigate to='/404' replace />} />
          </Route>
        </Route>
        <Route
          path='/404'
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
