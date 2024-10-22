import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const ModalAddUser = (props) => {
    const { show, setShow,onAdd } = props;
    const [userData, setUserData] = useState({
        profileImage: "",
        name: "",
        role: "User",  // Default value
        phoneNumber: "",
        sex: "Male",   // Default value
        password: "",
        email: "",
    });
    const [imagePreview, setImagePreview] = useState(null); 

    const handleClose = () => {
        setShow(false);
        // Optionally reset form data
        setUserData({
            profileImage: "",
            name: "",
            role: "User",
            phoneNumber: "",
            sex: "Male",
            password: "",
            email: "",
        });
        setImagePreview(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserData({
                ...userData,
                profileImage: file,
            });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onAdd(userData)
        

     }

    return (
        <div className="ModalAddUser-container">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formProfileImage">
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="profileImage"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <div className="image-preview mt-3">
                                    <img
                                        src={imagePreview}
                                        alt="Profile Preview"
                                        style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                                    />
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                placeholder="Enter user name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={userData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                value={userData.role}
                                onChange={handleChange}
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formSex">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                as="select"
                                name="sex"
                                value={userData.sex}
                                onChange={handleChange}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Add User
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

export default ModalAddUser;
