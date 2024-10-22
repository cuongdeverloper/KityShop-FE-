import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { UpdateUserApi } from "../../service/ApiService";
import { toast } from "react-toastify";
import { doLogin } from "../../redux/action/userAction";
import Particles1 from "../Particles bg/ParticlesTemples1";

const ProfileManage = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    const getDataUser = useSelector(state => state.user.account);

    const [id, setId] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login if not authenticated
        } else {
            // Initialize state with user data
            setId(getDataUser.id || '');
            setFullname(getDataUser.name || '');
            setEmail(getDataUser.email || '');
            setGender(getDataUser.gender || '');
            setRole(getDataUser.role || '');
            setPhoneNumber(getDataUser.phoneNumber || '');
        }
    }, [isAuthenticated, navigate, getDataUser]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await UpdateUserApi(id, email, fullname, role, gender, phoneNumber);
            if (res.EC === 0) {
                toast.success(res.MC);
                dispatch(doLogin(res));
                return;
            }
        } catch (err) {
            console.error('Error updating user:', err);
            setError('Failed to update user information. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ProfileManage-container container" style={{ position: 'relative' }}>
            <div className="ProfileManage-container-parti" style={{ position: 'absolute', zIndex: 1 }}>
                <Particles1 />
            </div>
            <div className="ProfileManage-body container-fluid" style={{ position: 'relative', zIndex: 100, marginTop: '100px', width: '70%' }}>
                <form onSubmit={handleUpdate}>
                    <MDBRow className="mb-4">
                        <MDBCol>
                            <MDBInput
                                id="fullname"
                                label="Full Name"
                                value={fullname}
                                onChange={(event) => setFullname(event.target.value)}
                                required
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-4">
                        <MDBCol>
                            <MDBInput
                                id="email"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-4">
                        <MDBCol>
                            <MDBInput
                                id="gender"
                                label="Gender"
                                value={gender}
                                onChange={(event) => setGender(event.target.value)}
                                required
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-4">
                        <MDBCol>
                            <MDBInput
                                id="role"
                                label="Role"
                                value={role}
                                disabled
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-4">
                        <MDBCol>
                            <MDBInput
                                id="phone"
                                label="Phone Number"
                                value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                                required
                            />
                        </MDBCol>
                    </MDBRow>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <MDBBtn type="submit" block disabled={loading}>
                        {loading ? 'Updating...' : 'Update Information'}
                    </MDBBtn>
                </form>
            </div>
        </div>
    );
};

export default ProfileManage;
