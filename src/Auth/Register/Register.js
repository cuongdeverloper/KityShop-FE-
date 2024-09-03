import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.scss';
import { FaBackward } from "react-icons/fa";
import { toast } from "react-toastify";
import { RegisterApi } from "../../service/ApiService";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('Admin'); // Default role
    const [sex, setSex] = useState('Male');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const navigate = useNavigate();

    const validateForm = () => {
        setIsFormValid(
            email !== '' &&
            password !== '' &&
            password === confirmPassword &&
            name !== '' &&
            phoneNumber !== ''
        );
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleRegister = async () => {
        setIsLoading(true);
        try {
            let response = await RegisterApi(email, password, name, role, sex, phoneNumber, profileImage); 
            if (response.errorCode === 0) {
                toast.success('Registration successful!');
                navigate('/login');
            } else {
                toast.error(response.message || 'Registration failed.');
            }
        } catch (error) {
            toast.error('An error occurred during registration.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="Register-container">
            <div className='Register-container-parti'></div>
            <div className="Register-body">
                <form>
                    <div className="Register-header">
                        <span onClick={() => navigate('/')}>
                            <FaBackward className="back-icon" /> Go back home
                        </span>
                    </div>
                    <h1 className='form-title'>REGISTER</h1>
                    <div className="Register-body-form mb-2">
                        <div className="form-outline form-input">
                            <label className="form-label" htmlFor="nameForm">Name</label>
                            <input
                                type="text"
                                id="nameForm"
                                placeholder='Name'
                                className="form-control input-field"
                                value={name}
                                onChange={(e) => { setName(e.target.value); validateForm(); }}
                            />
                        </div>
                        <div className="form-outline form-input">
                            <label className="form-label" htmlFor="emailForm">Email</label>
                            <input
                                type="email"
                                id="emailForm"
                                placeholder='Email'
                                className="form-control input-field"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); validateForm(); }}
                            />
                        </div>
                        <div className="form-outline form-input">
                            <label className="form-label" htmlFor="passwordForm">Password</label>
                            <input
                                type="password"
                                id="passwordForm"
                                placeholder='Password'
                                className="form-control input-field"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); validateForm(); }}
                            />
                        </div>
                        <div className="form-outline form-input">
                            <label className="form-label" htmlFor="confirmPasswordForm">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPasswordForm"
                                placeholder='Confirm Password'
                                className="form-control input-field"
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); validateForm(); }}
                            />
                        </div>
                        <div className="form-outline form-input">
                            <label className="form-label" htmlFor="phoneForm">Phone Number</label>
                            <input
                                type="text"
                                id="phoneForm"
                                placeholder='Phone Number'
                                className="form-control input-field"
                                value={phoneNumber}
                                onChange={(e) => { setPhoneNumber(e.target.value); validateForm(); }}
                            />
                        </div>
                        <div className="form-outline form-input" hidden>
                            <label className="form-label" htmlFor="roleForm">Role</label>
                            <select
                                id="roleForm"
                                className="form-control input-field"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                <option value="Guest">Guest</option>
                            </select>
                        </div>
                        <div className="form-outline form-input">
                            <label className="form-label" htmlFor="sexForm">Sex</label>
                            <select
                                id="sexForm"
                                className="form-control input-field"
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-outline form-input">
                            <label className="form-label" htmlFor="profileImageForm">Profile Image</label>
                            <input
                                type="file"
                                id="profileImageForm"
                                className="form-control input-field"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                    <div className="Register-body-buttonSignUp">
                        <button
                            type='button'
                            className='btn-register btn btn-primary'
                            onClick={handleRegister}
                            disabled={!isFormValid}
                        >
                            {isLoading && <span className="loader"></span>}
                            REGISTER
                        </button>
                    </div>
                    <div className="Register-header-login">
                        <label onClick={() => navigate('/login')}>Already have an account? Log in</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
