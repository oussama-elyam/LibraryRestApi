import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React , { useEffect, useState }from 'react';
import { Button, Modal, ModalTitle} from 'react-bootstrap'
import axios from 'axios'

const Dictionnaire = () => {
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
    const [titre, settitre] = useState("")
    const [prix, setprix] = useState("")
    const [nbrExpl, setnbrExpl] = useState("")
    const [auteur, setauteur] = useState("")
    const [disponible, setdisponible] = useState("")
    const [langue, setlangue] = useState("")

    const GetDictionnaireData = () => {
        //here we will get all employee data
        const url = 'http://localhost:8080/dictionnaire/listeDictionnaire'
         axios.get(url)
            .then(response => {
                const result = response.data;
                
                if (response.status !== 200) {
                    console.log('111111111111111111111111111')
                    console.log(result)
                    console.log(response.status)
                    console.log(response.statusText)
                 }
                else {
                    console.log('222222222222222222222222')

                    setData(result)
                    console.log(result)
                }
            })
            .catch(err => {
                console.log('333333333333333333333')
                console.log(err.response)
            })
    }

    const handleSubmite = () => {
        const url = 'http://localhost:8080/dictionnaire/addDictionnaire'
        const Credentials = { titre, prix, nbrExpl, auteur, disponible, langue }
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
        GetDictionnaireData();
    }, [])
    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                        Ajouter un Dictionnaire
                    </Button>
                    
                </div>
                <div>
                <InputGroup className="w-50">
                  
        <Button variant="outline-secondary" id="button-addon1">
          Search by id
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
                                <th>titre</th>
                                <th>prix</th>
                                <th>nbrExpl</th>
                                <th>auteur</th>
                                <th>disponible</th>
                                <th>langue</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.titre}</td>
                                    <td>{item.prix}</td>
                                    <td>{item.nbrExpl}</td>
                                    <td>{item.auteur}</td>
                                    <td>{item.disponible}</td>
                                    <td>{item.langue}</td>
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
                        <Modal.Title>Carte Dictionnaire</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.titre} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.prix} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.nbrExpl} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.auteur} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.disponible} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.langue} readOnly />
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
                        <Modal.Title>Modifier un Dictionnaire</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => settitre(e.target.value)} placeholder="titre" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setprix(e.target.value)} placeholder="prix" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setnbrExpl(e.target.value)} placeholder="nbrExpl" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setauteur(e.target.value)} placeholder="auteur" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setdisponible(e.target.value)} placeholder="disponible" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setlangue(e.target.value)} placeholder="langue" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>submit</Button>
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

export default Dictionnaire;