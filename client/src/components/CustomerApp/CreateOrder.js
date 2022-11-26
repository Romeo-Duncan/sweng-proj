import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function CreateOrder(props){
    return(
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Create new user account
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body> 
                                    
                    </Modal.Body>
                    
                    <Modal.Footer>                         
                        <Button>Create</Button>
                    </Modal.Footer>
            </Modal>   
        </>
    )
}

export default CreateOrder