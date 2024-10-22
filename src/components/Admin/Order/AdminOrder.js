import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Ensure you have this imported for cookie handling
import { apiAdmGetAllOrders, apiAdmUpdateOrder } from '../../../service/ApiService';
import { Table, Button, Form, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateError, setUpdateError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await apiAdmGetAllOrders();
                console.log(response);
                setOrders(response.orders);
            } catch (err) {
                setError('Failed to fetch orders.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await apiAdmUpdateOrder(orderId, { status: newStatus });
            toast.success(response.message)
            // Update the orders state to reflect the new status
            setOrders(prevOrders => 
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            setUpdateError('Failed to update order status.');
            console.error('Error updating order:', error);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">All Orders</h1>
            {updateError && <Alert variant="danger">{updateError}</Alert>}
            <Table striped bordered hover responsive>
    <thead className="table-light">
        <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Total Amount</th>
            <th>Day to Ship</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {orders.map((order) => (
            <tr key={order._id}>
                <>
                    <td>{order._id}</td>
                    <td>{order.user._id}</td>
                    <td>{order.address}</td>
                    <td>{order.phoneNumber}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>{new Date(order.dayToShip).toLocaleDateString()}</td>
                    <td>{order.status}</td>
                    <td>
                        <Form.Select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </Form.Select>
                    </td>
                </>
            </tr>
        ))}
    </tbody>
</Table>

        </div>
    );
};

export default AdminOrder;
