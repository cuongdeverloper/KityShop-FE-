import { Button, Modal } from "react-bootstrap";

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete, onDelete } = props;

    const handleClose = () => {
        setShow(false);
    };

    const handleDelete = () => {
        onDelete(dataDelete);
        handleClose();
    };

    return (
        <div className="ModalDeleteUser-container">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete the user "{dataDelete.name}"?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalDeleteUser;
