import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ModalUpdateUser = (props) => {
    const { show, setShow, dataPreview, onUpdate } = props;
    const [userData, setUserData] = useState({
        profileImage: "",
        name: "",
        role:"",
        phoneNumber: "",
        sex: "",
        type: "",
    });

    useEffect(() => {
        setUserData(dataPreview);
    }, [dataPreview]);

    const handleClose = () => {
        setShow(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(userData);
        handleClose();
    };

    return (
        <div className="ModalUpdateUser-container">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formProfileImage">
                            <Form.Label>Profile Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="profileImage"
                                value={userData.profileImage || ""}
                                onChange={handleChange}
                                placeholder="Enter profile image URL"
                            />
                        </Form.Group>

                        <Form.Group controlId="formName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={userData.name || ""}
                                onChange={handleChange}
                                placeholder="Enter user name"
                            />
                        </Form.Group>
                        <Form.Group controlId="form Role">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="text"
                                name="role"
                                value={userData.role || ""}
                                onChange={handleChange}
                                placeholder="Enter role"
                                
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={userData.email || ""}
                                onChange={handleChange}
                                placeholder="Enter email"
                                disabled
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={userData.phoneNumber || ""}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />
                        </Form.Group>

                        <Form.Group controlId="formSex">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                as="select"
                                name="sex"
                                value={userData.sex || ""}
                                onChange={handleChange}
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formType">
                            <Form.Label>Type Login</Form.Label>
                            <Form.Control
                                type="text"
                                name="type"
                                value={userData.type || ""}
                                onChange={handleChange}
                                placeholder="Enter type login"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalUpdateUser;
