import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import HomePage from "./pages/HomePage";
import { ROUTES } from "./Routes.tsx";
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const tauri = (window as any).__TAURI__?.tauri;

    if (tauri) {
      const { invoke } = tauri;

     
      invoke('your_command_name', { /* parameters */ })
        .then((response: any) => {
          console.log('Response:', response);
        })
        .catch((error: any) => {
          console.error('Error invoking command:', error);
        });
    } else {
      console.warn('Tn');
    }
  }, []);

  
  /*
  invoke('tauri', { cmd: 'create' })
  .then((response: any) => console.log(response))
  .catch((error: any) => console.log(error));
return () => {
  invoke('tauri', { cmd: 'close' })
    .then((response: any) => console.log(response))
    .catch((error: any) => console.log(error));
}*/
  return (
    <BrowserRouter basename="/front">
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.VISAS} element={<Page1 />} />
        <Route path={`${ROUTES.VISAS}/:id`} element={<Page2 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
