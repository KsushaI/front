import Header from './components/Header'
import Container from './components/Container'
import './index.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react'
import { ROUTE_LABELS } from "../../Routes";
import BreadCrumbs from "../components/BreadCrumbs"
import { useNavigate } from "react-router-dom";
import { Visa, getVisaByPrice } from '../modules/Api'
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredVisas, selectFilteredVisas } from '../../slices/visasSlice';
import { setSearchValue } from '../../slices/searchSlice';

const Visas = () => {

    const searchValue = useSelector((state: any) => state.search.value);
    const [loading, setLoading] = useState(false)
    const [randomX, setRandomX] = useState(0); // State for the random number x
    const [exponent, setExponent] = useState(0); // State for exp(x)
    const [Visa, setVisa] = useState<Visa[]>([])
    //const [num, setNum] = useState(0);
    const filteredVisas = useSelector(selectFilteredVisas); // Get filtered visas from the store
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        await setLoading(true)
        const { services } = await getVisaByPrice(searchValue)
        await setVisa(services)
        dispatch(setFilteredVisas(services));
        await setLoading(false)
        console.log(services)
    }

    /*useEffect(() => {
        const fetchVisas = async () => {
            setNum(5);
            setLoading(true);
            const { services } = await getVisaByPrice(); 
            setVisa(services);
            setLoading(false);
        };
        fetchVisas();
    }, []); */


    useEffect(() => {
        if (filteredVisas.length > 0) {
            // If there are filtered visas, use them
            setVisa(filteredVisas);
        } else {
            // Otherwise, fetch the default visas
            const fetchVisas = async () => {
                setLoading(true);
                const { services } = await getVisaByPrice();
                setVisa(services);
                dispatch(setFilteredVisas(services)); // Save to Redux
                setLoading(false);
            };
            fetchVisas();
        }

        const randomNumber = Math.floor(Math.random() * 20); // random number [0,10]
        setRandomX(randomNumber);
        setExponent(Math.exp(randomNumber)); //exp(x)

    }, []); 

    return (
        <>
            <Header />
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.VISAS }]} />
            <p>Exp({randomX}) = {exponent}</p>
            <div className="form-container">
                <Form>
                    <Row className="row">
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                //name="visa_price"
                                placeholder="Поиск по цене"
                                value={searchValue}
                                onChange={(event) => dispatch(setSearchValue(event.target.value))}
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

