import { FC } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Page1/components/Header';
import Carousel from 'react-bootstrap/Carousel';


import './index.css'

const HomePage: FC = () => {



    return (
        <>
            <Header />
            {/*<BreadCrumbs crumbs={[{ label: ROUTE_LABELS.HOME }]} />*/}
            <div className="welcome text-center">
                <h1>Добро пожаловать на главную страницу сайта!</h1>
                {/* Optional: Add a subtitle or description */}
                <h2 className="d-md-block">На нашем сайте Вы можете без труда оформить необходимую визу в РФ!</h2>
                <Carousel interval={null}>
                    <Carousel.Item>
                        <img src="/front/1.jpg"  alt="First slide" />
                        <Carousel.Caption>
                            <h3>Туристическая виза</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/front/2.jpg"  alt="Second slide" />
                        <Carousel.Caption>
                            <h3>Учебная виза</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/front/5.jpg" alt="Third slide" />
                        <Carousel.Caption>
                            <h3>Транзитная виза</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/front/8.jpg" alt="Fourth slide" />
                        <Carousel.Caption>
                            <h3>Деловая виза</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </>
    );
};

export default HomePage


