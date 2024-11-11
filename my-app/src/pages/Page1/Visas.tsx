import Header from './components/Header'
import Container from './components/Container'
import './index.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react'
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import BreadCrumbs from "../components/BreadCrumbs"
import { useNavigate } from "react-router-dom";
import {Visa, VisasResult, getVisaByPrice} from '../modules/Api'
import { VISAS_MOCK } from "../modules/mock";
/*
export interface Card {
    pk: number;
    type: string;
    url: string;
    price: string;
}
export interface VisasResult {
    //resultCount: number;
    hello: string;
    services: Card[];
    number_of_services: string;
}

const getVisaByPrice = async (price = ''): Promise<VisasResult> => {
    return fetch(`http://127.0.0.1:8000/visas_api/?visa_price=${price}`)
        .then((response) => response.json())
        //.catch(() => ({  services: [] }))
        .catch(() =>  {
            const searchPrice = parseFloat(price);
        if (isNaN(searchPrice)) {
            return { services: [] }; 
        }
        return {
            services: VISAS_MOCK.services.filter((item) => {
                return item.price <= searchPrice; 
            })
        };
    })
}
*/

const Visas = () => {
    const [searchValue, setSearchValue] = useState('')

    const [loading, setLoading] = useState(false)

    const [Visa, setVisa] = useState<Visa[]>([])

    const navigate = useNavigate()

    const handleSearch = async () => {
        await setLoading(true)
        const { services } = await getVisaByPrice(searchValue)
        await setVisa(services)
        await setLoading(false)
        console.log(services)
    }

    useEffect(() => {
        const fetchVisas = async () => {
            setLoading(true);
            const { services } = await getVisaByPrice(); // Fetch all visas without price filter
            setVisa(services);
            setLoading(false);
        };
        fetchVisas();
    }, []); // Empty dependency array to run only once on mount

    return (
        <>
            <Header />
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.VISAS }]} />
            <div className="form-container">
                <Form>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                //name="visa_price"
                                placeholder="Поиск по цене"
                                value={searchValue}
                                onChange={(event => setSearchValue(event.target.value))}
                                className=" mr-sm-2"
                            //
                            />
                        </Col>
                        <Col xs="auto">
                            <Button variant="outline-warning" type="submit" disabled={loading} onClick={handleSearch} >Поиск</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className='space'>
                <p className="main_title">Визы</p>
                <p className="direction">Выберите визу:</p>
                {!loading &&
                    (!Visa.length /* Проверка на существование данных */ ? (
                        <div>
                            <h1 className="not-found">К сожалению, пока ничего не найдено :(</h1>
                        </div>) : (
                        <div className='custom-container'><Container Visa={Visa} navigate={navigate} /></div>
                    )
                    )}
            </div>
        </>
    )
}
export default Visas

