import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PreviewModal = ({ show, onHide, product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    // Inline styles for the paragraph
    const paragraphStyle = {
        cursor: 'pointer',
        color: isHovered ? '#007bff' : 'initial', // Change color on hover
        textDecoration: isHovered ? 'underline' : 'none', // Underline on hover
        transition: 'color 0.3s ease', // Smooth transition
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Preview Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {product && (
                    <div>
                        <p
                            style={paragraphStyle}
                            onClick={() => navigate(`/shop/detail/${product._id}`)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <strong>ID:</strong> {product._id}
                        </p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Name:</strong> {product.name}</p>
                        {/* Add more details as necessary */}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PreviewModal;
