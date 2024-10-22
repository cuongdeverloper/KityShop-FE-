import { useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap"

const ModalPreviewUser = (props) => {
    const { show, setShow, dataPreview } = props;
    const handleClose = () => {
        setShow(false);
    };
    useEffect(()=>{

    },[dataPreview])
    return (
        <div className="ModalPreviewUser-container">

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Previw</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={dataPreview.profileImage} alt="User Preview" style={{height:'200px',objectFit:'cover'}}/>
                        <Card.Body>
                            <Card.Title>UserName:{dataPreview.name}</Card.Title>
                            <Card.Text>
                                <label>Email: {dataPreview.email}</label>
                                <label>PhoneNumber:{dataPreview.phoneNumber}</label>
                                <label>Gender:{dataPreview.sex}</label><br/>
                                <label>TypeLogin:{dataPreview.type}</label>
                            </Card.Text>

                            {/* <Button variant="primary">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}
export default ModalPreviewUser