import React, { useState, useEffect } from 'react';
import { Button, Table, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PreviewModal from './Modal/ModalAdminPreview';
import DeleteModal from './Modal/ModalAdminDeleteProduct';
import { getProductByCategoryApi, deleteProductByIdApi } from '../../../service/ApiService';
import ModalAdminUpdateProduct from './Modal/ModalAdminUpdatePoruduct';

const AdminAddProduct = () => {
    const params = useParams();
    const [dataProduct, setDataProduct] = useState([]);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false); // State for Update Modal
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAdminGetProductByCategory = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getProductByCategoryApi(params.category);
            setDataProduct(response.data);
        } catch (error) {
            setError("Error fetching products by category.");
            console.error("Error fetching products by category:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.category) {
            handleAdminGetProductByCategory();
        }
    }, [params.category]);

    const handlePreview = (product) => {
        setSelectedProduct(product);
        setShowPreviewModal(true);
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedProduct) return;
        setLoading(true);
        setError(null);
        try {
            const response = await deleteProductByIdApi(selectedProduct._id);
            if (response.errorCode === 0) {
                handleAdminGetProductByCategory();
                setShowDeleteModal(false);
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            setError("Error deleting the product.");
            console.error("Error deleting product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setShowUpdateModal(true); // Open Update Modal
    };

    const handleUpdateSuccess = () => {
        handleAdminGetProductByCategory(); // Refresh the product list
    };

    return (
        <div>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataProduct && dataProduct.length > 0 ? (
                            dataProduct.map((item, index) => (
                                <tr key={`table-product-${index}`}>
                                    <td>{item._id}</td>
                                    <td>{item.category}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <Button
                                            className="btn btn-secondary mx-1"
                                            onClick={() => handlePreview(item)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            className="btn btn-danger mx-1"
                                            onClick={() => handleDelete(item)}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            className="btn btn-primary mx-1"
                                            onClick={() => handleUpdate(item)}
                                        >
                                            Update
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No products found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            <PreviewModal
                show={showPreviewModal}
                onHide={() => setShowPreviewModal(false)}
                product={selectedProduct}
            />
            <DeleteModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                product={selectedProduct}
                onDelete={handleDeleteConfirm}
            />
            <ModalAdminUpdateProduct
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                product={selectedProduct}
                onUpdateSuccess={handleUpdateSuccess} // Callback to refresh the product list
            />
        </div>
    );
};

export default AdminAddProduct;
