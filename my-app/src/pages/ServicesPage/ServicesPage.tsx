import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchVisas from '../../slices/actions/fetchvisas';
import { uploadImage } from '../../slices/pictureSlice';// импортируйте ваше асинхронное действие
import { deleteService, editService, addVisa } from '../../slices/serviceSlice';
import { RootState, AppDispatch } from '../../store'; // импортируйте корневой тип состояния
import Header from "../Page1/components/Header"
import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
const servicePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { services, loading, error } = useSelector((state: RootState) => state.service); // Получение данных из состояния
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [reload, setReload] = useState(false); // State to trigger useEffect
    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedVisa, setSelectedVisa] = useState<any>(null); // You can define a proper type here
    const [newVisa, setNewVisa] = useState({ type: '', price: 0, status: '' }); // State for new visa form

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]); // Save the selected file
        }
    };

    const handleUpload = async (id: string) => {
        if (!selectedFile) {
            alert("Пожалуйста, выберите изображение для загрузки");
            return;
        }

        try {
            await dispatch(uploadImage({ id, file: selectedFile })).unwrap() // Dispatch the thunk and wait for it to complete
            alert("Изображение успешно загружено!");
            setReload(prev => !prev);
        } catch (error) {
            console.error("Ошибка при загрузке изображения:", error);
            alert("Произошла ошибка при загрузке изображения.");
        }

    };
    useEffect(() => {
        dispatch(fetchVisas());
        console.log("hahah") // Получение виз при загрузке компонента
    }, [reload]);


    const delClick = (id: string) => {
        dispatch(deleteService(id));
        console.log("da")
        setReload(prev => !prev);
    }

    // Modal handling
    const handleShow = (visa: any) => {
        setSelectedVisa(visa); // Set the selected visa to the state
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedVisa(null); // Reset selected visa
    };

    const handleSave = () => {
        if (selectedVisa) {
            dispatch(editService({
                id: selectedVisa.pk,
                formData: {
                    type: selectedVisa.type,
                    price: selectedVisa.price,
                    status: selectedVisa.status,
                }
            })).unwrap()
                .then(() => {
                    //alert("Сервис успешно обновлён!");
                    setReload(prev => !prev);
                    handleClose();
                })
                .catch((error) => {
                    console.error("Ошибка при редактировании сервиса:", error);
                    alert("Произошла ошибка при редактировании сервиса.");
                });
        }
    };

    const handleShowAdd = () => {
        setNewVisa({ type: '', price: 0, status: '' }); // Reset fields for new visa
        setShowModal(true);
    };

    const handleSaveAdd = () => {
        // Dispatch action to add a new visa
        // Assuming you have an addService action to handle this
        dispatch(addVisa(newVisa)).unwrap()
            .then(() => {
                setReload(prev => !prev);
                handleClose();
            })
            .catch((error) => {
                console.error("Ошибка при добавлении визы:", error);
                alert("Произошла ошибка при добавлении визы.");
            });
    };


    return (
        <>
            <Header />
            <div style={{ display: "flex", justifyContent: "center" }}>

                <Table bordered hover size="sm" className="mt-4" style={{ width: "70%" }}>
                    <thead>
                        <tr style={{ alignContent: "center" }}>
                            <th style={{ verticalAlign: 'middle', fontSize: '20px', textAlign: "center" }}>Картинка</th>
                            <th style={{ verticalAlign: 'middle', fontSize: '20px', textAlign: "center" }}>Тип</th>
                            <th style={{ verticalAlign: 'middle', fontSize: '20px', textAlign: "center" }}>Цена</th>
                            <th style={{ verticalAlign: 'middle', fontSize: '20px', textAlign: "center" }}>Создатель</th>
                            <th style={{ verticalAlign: 'middle', fontSize: '20px', textAlign: "center" }}>Статус</th>
                            <th></th>
                            <th style={{ verticalAlign: 'middle', textAlign: "center" }} ><Button variant="primary" onClick={handleShowAdd}>Добавить визу</Button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((visa) => (
                            <tr key={visa.pk}>
                                <td style={{ verticalAlign: 'middle', fontSize: '20px', textAlign: "center" }}>
                                    <a href={visa.url || "http://127.0.0.1:9000/test/default_.png"} target="_blank" rel="noopener noreferrer" >
                                        <img className="serv_pic" src={visa.url || "http://127.0.0.1:9000/test/default_.png"} style={{ width: '170px', height: '170px', objectFit: 'cover', borderRadius: '12px' }} />
                                    </a>
                                </td>
                                <td style={{ verticalAlign: 'middle', fontSize: '20px', textAlign: "center" }}>{visa.type}</td>
                                <td style={{ verticalAlign: 'middle', fontSize: '20px', textAlign: "center", color: "#ffc107" }}>{visa.price}</td>
                                <td style={{ verticalAlign: 'middle', fontSize: '20px', textAlign: "center" }}>{visa.creator || 'Нет описания'}</td>
                                <td style={{ verticalAlign: 'middle', fontSize: '20px', textAlign: "center" }}>{visa.status}</td>


                                <td style={{ verticalAlign: 'middle', fontSize: '20px', textAlign: "center" }}><Button variant="success" onClick={() => handleShow(visa)}>Редактировать</Button></td>
                                <td style={{ verticalAlign: 'middle', fontSize: '20px', textAlign: "center" }}><Button variant="danger" onClick={() => delClick(visa.pk.toString())}>Удалить</Button></td>

                            </tr>
                        ))}

                    </tbody>
                </Table>
            </div>
            {/* Modal for editing visa */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedVisa ? 'Редактировать визу' : 'Добавить визу'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedVisa ? (
                        <Form>
                            <Form.Group controlId="formType">
                                <Form.Label>Тип</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedVisa.type}
                                    onChange={(e) => setSelectedVisa({ ...selectedVisa, type: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPrice">
                                <Form.Label>Цена</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={selectedVisa.price}
                                    onChange={(e) => setSelectedVisa({ ...selectedVisa, price: +e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formStatus">
                                <Form.Label>Статус</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedVisa.status}
                                    onChange={(e) => setSelectedVisa({ ...selectedVisa, status: e.target.value })}
                                />
                            </Form.Group>
                               {/*<input type="file" accept="image/*" onChange={handleFileChange} />*/}
                        <Form.Group>
                            <Form.Label>Выберите изображение</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        <Button onClick={() => handleUpload(selectedVisa.pk.toString())}>Добавить изображение</Button>
                        </Form>
                    ) : (
                        <Form>
                            <Form.Group controlId="formType">
                                <Form.Label>Тип</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newVisa.type}
                                    onChange={(e) => setNewVisa({ ...newVisa, type: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPrice">
                                <Form.Label>Цена</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={newVisa.price}
                                    onChange={(e) => setNewVisa({ ...newVisa, price: +e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formStatus">
                                <Form.Label>Статус</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newVisa.status}
                                    onChange={(e) => setNewVisa({ ...newVisa, status: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={selectedVisa ? handleSave : handleSaveAdd}>
                        {selectedVisa ? 'Сохранить' : 'Добавить'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default servicePage;