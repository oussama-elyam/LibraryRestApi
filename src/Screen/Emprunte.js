import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React , { useEffect, useState }from 'react';
import { Button, Modal, ModalTitle} from 'react-bootstrap'
import axios from 'axios'

const Emprunte = () => {
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

    //Define here local state that store the for[ Data
    const [id_document, setId_document] = useState("")
    const [date_emprute, setDate_emprunt] = useState("")
    const [date_retour, setDate_retour] = useState("")
    const [titre_document, setTitre_document] = useState("")
    const [prenom_adherent, setPrenom_adherent] = useState("")
    const [id_adherent, setId_adherent] = useState("")


    const GetEmprunteData = () => {
        //here we will get all employee data
        const url = 'http://localhost:8080/emprunte/listeEmprunte'
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
        const url = 'http://localhost:8080/Emprunte/addEmprunte'
        const Credentials = { id_document, }
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
        GetEmprunteData();
    }, [])
    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                        Ajouter un Emprunte
                    </Button>
                    
                </div>
             
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Date_emprunte</th>
                                <th>Tate_retoure</th>
                                <th>titre de document</th>
                                <th>Prenom adherent</th>
                                <th>Action</th>
                                
                             

                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.date_emprunt}</td>
                                    <td>{item.date_retoure}</td>
                                    <td>{item.document.titre}</td>
                                    <td>{item.adherent.prenom}</td>
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
                        <Modal.Title>Carte Emprunte</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>

                            <div className='form-group'>
                                <input type="text" className='form-control' value={'Id : '+RowData.id} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={'Date emprunte : '+RowData.date_emprunt} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={'Date retour : '+RowData.date_retoure} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={'titre document : '+RowData.document.titre} readOnly />
                            </div>
                            <div className='form-group mt-3'>           
                                <input type="text" className='form-control' value={'Nom adherent : '+RowData.adherent.nom} readOnly />
                            </div>
                            <div className='form-group mt-3'>           
                                <input type="text" className='form-control' value={'Prenom adherent : '+RowData.adherent.prenom} readOnly />
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
                        <Modal.Title>Ajouter un Emprunte</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => setId_document(e.target.value)} placeholder="id_document" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setId_adherent(e.target.value)} placeholder="id_adherent" />
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

export default Emprunte;