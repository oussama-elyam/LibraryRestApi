import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React , { useEffect, useState }from 'react';
import { Button, Modal, ModalTitle} from 'react-bootstrap'
import axios from 'axios'

const Adherent = () => {
    const [Data, setData] = useState([]);

    //for view model
    const [RowData, SetRowData] = useState([])
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = () => { SetViewShow(true) }
    const hanldeViewClose = () => { SetViewShow(false) }

    //FOr Add New Data Model
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }

    //Define here local state that store the form Data
    const [nom, setnom] = useState("")
    const [prenom, setprenom] = useState("")
    const [adresse, setadresse] = useState("")
    const [cin, setcin] = useState("")
    const [dateNaissance, setdate] = useState("")

    const GetAdherentData = () => {
        //here we will get all employee data
        const url = 'http://localhost:8080/adherent/listeAdherent'
         axios.get(url)
            .then(response => {
                const result = response.data;
                
                if (response.status !== 200) {
                    console.log(result)
                    console.log(response.status)
                    console.log(response.statusText)
                 }
                else {
                    setData(result)
                    console.log(result)
                }
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    const handleSubmite = () => {
        const url = 'http://localhost:8080/adherent/addAdherent'
        const Credentials = { nom, prenom, adresse, cin, dateNaissance }
        axios.post(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        GetAdherentData();
    }, [])
    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                        Ajouter un adherent
                    </Button>
                    
                </div>
                <div>
                <InputGroup className="w-50">
                  
        <Button variant="outline-secondary" id="button-addon1">
          Search by cin
        </Button>
        <Form.Control
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

                </div>
                <p></p>
                
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Adresse</th>
                                <th>CIN</th>
                                <th>Date_naissance</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nom}</td>
                                    <td>{item.prenom}</td>
                                    <td>{item.adresse}</td>
                                    <td>{item.cin}</td>
                                    <td>{item.date_naiss}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(item)) }}>View</Button>|
                                        <Button size='sm' variant='warning' >Edit</Button>|
                                        <Button size='sm' variant='danger' >Delete</Button>|
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

             {/* View Modal */}
             <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Carte adhérent</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.nom} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.prenom} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.adresse} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.cin} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.date_naiss} readOnly />
                            </div>
                            
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            {/* Modal for submit data to database */}
            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Ajouter un adherent</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => setnom(e.target.value)} placeholder="Nom" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setprenom(e.target.value)} placeholder="Prenom" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setadresse(e.target.value)} placeholder="Adresse" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setcin(e.target.value)} placeholder="CIN" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="date" className='form-control' onChange={(e) => setdate(e.target.value)} placeholder="Date de naissance" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Ajouter adherent</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Fermer</Button>
                    </Modal.Footer>
                </Modal>
            </div>


           
        </div>
    );
};

export default Adherent;