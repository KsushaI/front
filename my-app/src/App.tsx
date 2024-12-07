import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage"
import AuthorizationPage from "./pages/AuthorizationPage"
import AccountPage from "./pages/AccountPage"
import TrollyPage from "./pages/TrollyPage"
import AppsListPage from "./pages/AppsListPage"
import ServicesPage from "./pages/ServicesPage"
import { ROUTES } from "./Routes.tsx";
import { useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
//const {invoke} = (window as any).__TAURI__.tauri;
function App() {
  useEffect(() => {
    /*const tauri = (window as any).__TAURI__?.tauri;

    if (tauri) {
      const { invoke } = tauri;

     
      invoke('your_command_name', { parameters })
        .then((response: any) => {
          console.log('Response:', response);
        })
        .catch((error: any) => {
          console.error('Error invoking command:', error);
        });
    } else {
      console.warn('Tn');
    }*/
      invoke('tauri', { cmd: 'create' })
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
    return () => {
      invoke('tauri', { cmd: 'close' })
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error));
    }
  }, []);



return (
  <BrowserRouter basename="/front">
    <Routes>
      <Route path={ROUTES.HOME} index element={<HomePage />} />
      <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
      <Route path={ROUTES.AUTH} element={<AuthorizationPage />} />
      <Route path={ROUTES.VISAS} element={<Page1 />} />
      <Route path={ROUTES.TROLLY} element={<TrollyPage />} />
      <Route path={`${ROUTES.TROLLY}/:id`} element={<TrollyPage />} />
      <Route path={`${ROUTES.VISAS}/:id`} element={<Page2 />} />
      <Route path={`${ROUTES.ACC}/:id`} element={<AccountPage />} />
      <Route path={ROUTES.APPS} element={<AppsListPage />} />
      <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
    </Routes>
  </BrowserRouter>
)
}

export default App
