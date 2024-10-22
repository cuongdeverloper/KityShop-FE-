import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateProductByProductId } from '../../../../service/ApiService';

const ModalAdminUpdateProduct = ({ show, onHide, product, onUpdateSuccess }) => {
    // Use optional chaining to prevent accessing properties of null/undefined
    const [name, setName] = useState(product?.name || '');
    const [category, setCategory] = useState(product?.category || '');
    const [price, setPrice] = useState(product?.price || '');
    const [description, setDescription] = useState(product?.description || '');
    const [sizes, setSizes] = useState(product?.sizes || []); // Array of size objects
    const [colors, setColors] = useState(product?.colors || []);
    const [salesPercent, setSalesPercent] = useState(product?.salesPercent || 0);
    const [previewImages, setPreviewImages] = useState(product?.previewImages || []);
    const [productImages, setProductImages] = useState(product?.productImages || []);

    // Watch for product changes and update state accordingly
    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setCategory(product.category || '');
            setPrice(product.price || '');
            setDescription(product.description || '');
            setSizes(product.sizes || []);
            setColors(product.colors || []);
            setSalesPercent(product.salesPercent || 0);
            setPreviewImages(product.previewImages || []);
            setProductImages(product.productImages || []);
        }
    }, [product]);

    const addNewSize = () => {
        setSizes([...sizes, { size: '', quantity: 0 }]); // Add an empty size with 0 quantity
    };

    const updateSizeQuantity = (index, field, value) => {
        const updatedSizes = sizes.map((sizeItem, i) =>
            i === index ? { ...sizeItem, [field]: value } : sizeItem
        );
        setSizes(updatedSizes);
    };

    const removeSize = (index) => {
        setSizes(sizes.filter((_, i) => i !== index));
    };

    const handleUpdate = async () => {
        try {
            const updatedProduct = {
                name,
                category,
                price,
                description,
                sizes,
                colors,
                salesPercent,
                previewImages,
                productImages,
            };
            
            let response = await updateProductByProductId(product._id, updatedProduct);
            console.log('Update Response:', response);
            toast.success('Product updated successfully!');
            onUpdateSuccess(); // Callback after successful update
            onHide(); // Close modal
        } catch (error) {
            toast.error("Failed to update product. Please try again.");
            console.error("Error updating product:", error);
        }
    };

    // Return early if the product is null or undefined
    if (!product) {
        return null;
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formProductName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductCategory" className="mt-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductPrice" className="mt-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter product price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductDescription" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter product description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    {/* Sizes Management */}
                    <Form.Group controlId="formProductSizes" className="mt-3">
                        <Form.Label>Sizes and Quantities</Form.Label>
                        {sizes.map((sizeItem, index) => (
                            <Row key={index} className="align-items-center mb-2">
                                <Col xs={4}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Size (e.g. S, M, L)"
                                        value={sizeItem.size}
                                        onChange={(e) => updateSizeQuantity(index, 'size', e.target.value)}
                                    />
                                </Col>
                                <Col xs={4}>
                                    <Form.Control
                                        type="number"
                                        placeholder="Quantity"
                                        value={sizeItem.quantity}
                                        onChange={(e) => updateSizeQuantity(index, 'quantity', e.target.value)}
                                    />
                                </Col>
                                <Col xs={4}>
                                    <Button variant="danger" onClick={() => removeSize(index)}>Remove</Button>
                                </Col>
                            </Row>
                        ))}
                        <Button variant="secondary" onClick={addNewSize}>
                            Add New Size
                        </Button>
                    </Form.Group>

                    {/* Other fields */}
                    <Form.Group controlId="formProductColors" className="mt-3">
                        <Form.Label>Colors</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter colors (comma-separated)"
                            value={colors.join(', ')}
                            onChange={(e) => setColors(e.target.value.split(',').map(color => color.trim()))}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductSalesPercent" className="mt-3">
                        <Form.Label>Sales Percent</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter sales percent"
                            value={salesPercent}
                            onChange={(e) => setSalesPercent(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductPreviewImages" className="mt-3">
                        <Form.Label>Preview Images</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter preview image URLs (comma-separated)"
                            value={previewImages.join(', ')}
                            onChange={(e) => setPreviewImages(e.target.value.split(',').map(img => img.trim()))}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductImages" className="mt-3">
                        <Form.Label>Product Images</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product image URLs (comma-separated)"
                            value={productImages.join(', ')}
                            onChange={(e) => setProductImages(e.target.value.split(',').map(img => img.trim()))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Update Product
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAdminUpdateProduct;
