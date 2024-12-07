import Header from "../Page1/components/Header"
import Table from 'react-bootstrap/Table';
import { api } from '../../api'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Button from "react-bootstrap/Button"
const AppsListPage = () => {
    const [apps, setApps] = useState<any>()
    const { user } = useSelector((state: any) => state.auth);
    useEffect(() => {
        const fetchdata = async () => {
            //const {data} =  await api.appsApi.appsApiRead(id.toString());
            api.appsApi.appsApiList().then((response) => {
                console.log(response.data)
                setApps(response.data)
            }).catch(() => {
                console.error("Error fetching data:");
            })
        }

        let id = setTimeout(fetchdata, 2000);
        return () => clearTimeout(id)
    }, [apps]);


    return (
        <>
            <Header />

            {apps &&
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>id</th>
                            <th>Статус</th>
                            <th>Дата создания</th>
                            <th>Дата формирования</th>
                            <th>Дата завершения</th>
                            {user.is_staff &&
                                <th>Создатель</th>
                            }
                            <th>Модератор</th>
                            <th>Итог</th>
                        </tr>
                    </thead>
                    <tbody>

                        {apps.map((app, index) => (
                            <tr key={app.id}> {/* Use app.id as a unique key */}
                                <td>{index + 1}</td> {/* Display the index + 1 for a 1-based index */}
                                <td>{app.id}</td> {/* Display app ID */}
                                <td>{app.status}</td> {/* Display app status */}
                                <td>{new Date(app.creation_date).toLocaleString()}</td> {/* Format creation date */}
                                <td>{new Date(app.formation_date).toLocaleString()}</td> {/* Format formation date */}
                                <td>{app.completion_date ? new Date(app.completion_date).toLocaleString() : 'N/A'}</td>
                                {user.is_staff &&
                                    <td>{app.creator}</td>
                                }
                                <td>{app.moderator}</td> {/* Format completion date or show 'N/A' */}
                                <td>{app.total}</td> {/* Format completion date or show 'N/A' */}
                                {user.is_staff && app.status==="Сформирована" && (
                                    <td><Button variant="success">Завершить</Button></td>)
                                }
                            </tr>
                        ))}
                    </tbody>
                </Table>}
        </>
    )
}

export default AppsListPage;