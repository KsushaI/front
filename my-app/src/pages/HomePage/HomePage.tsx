import { FC } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Page1/components/Header'

import './index.css'

const HomePage: FC = () => {
    return (
        <>
            <Header />
            {/*<BreadCrumbs crumbs={[{ label: ROUTE_LABELS.HOME }]} />*/}
            <div className="welcome">
                <h1>Добро пожаловать на главную страницу сайта!</h1>
                <h2>На нашем сайте Вы можете без труда оформить необходимую визу в РФ!</h2>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</h3>
                <h3>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis</h3>
                <h3>nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</h3>
                <h3>consequat. Duis aute irure dolor in reprehenderit in voluptate</h3>
                <h3>velit esse cillum dolore eu fugiat nulla pariatur.</h3>
                <h3>Excepteur sint occaecat cupidatat non proident,</h3>
                <h3>sunt in culpa qui officia deserunt</h3>
                <h3>mollitanim id est laborum.</h3>
            </div>
        </>
    );
};

export default HomePage