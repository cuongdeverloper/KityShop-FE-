import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Login.scss';
import { FaBackward, FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner9 } from "react-icons/im";
import { doLogin } from "../../redux/action/userAction";
import Cookies from 'js-cookie'; // Import js-cookie for cookie handling
import { LoginApi } from "../../service/ApiService";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);
    const [exist, setExist] = useState(false);

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); 
        }
    }, [isAuthenticated,navigate]);

    const handleLogin = async () => {
        setIsLoadingLogin(true);
        try {
            let response = await LoginApi(email, password);
            console.log('API response:', response);

            if (response.errorCode === 0) {
                toast.success(response.message);
                // Store tokens in cookies
                Cookies.set('accessToken', response.data.access_token, { expires: 1 });
                Cookies.set('refreshToken', response.data.refresh_token, { expires: 7 });
                dispatch(doLogin(response));

                // Debugging: Log role before navigation
                console.log('User role:', response.data.role);

             
            } else {
                toast.error(response.message || "Login failed, please try again.");
            }
        } catch (error) {
            // Handle errors
            console.error('Login error:', error);
            if (error.response) {
                // Server responded with a status other than 200 range
                if (error.response.status >= 500) {
                    toast.error("Server error, please try again later.");
                } else if (error.response.status >= 400) {
                    toast.error("Invalid credentials, please check your email and password.");
                } else {
                    toast.error("An error occurred, please try again.");
                }
            } else if (error.request) {
                // Request was made but no response was received
                toast.error("Network error, please check your connection and try again.");
            } else {
                // Something else happened in setting up the request
                toast.error("An unexpected error occurred, please try again.");
            }
        } finally {
            setIsLoadingLogin(false);
        }
    };

    const checkExist = () => {
        setExist(email !== '' && password !== '' && confirm);
    };

    useEffect(() => {
        checkExist();
    }, [email, password, confirm]);

    const redirectGoogleLogin = () => {
        window.location.href = "https://kittyshop-be.onrender.com/auth/google";
    };

    return (
        <div className="Login-container">
            <div className='Login-container-parti'></div>
            <div className="Login-body">
                <form>
                    <div className="Login-header">
                        <span onClick={() => navigate('/')}>
                            <FaBackward className="back-icon" /> Go back home
                        </span>
                    </div>
                    <h1 className='form-title'>LOGIN</h1>
                    <div className="Login-body-social mb-3">
                        <div className="div-icon-social btn btn-primary">
                            <a href="#" className="icon-social">
                                <FaFacebookF />
                            </a>
                        </div>
                        <div className="div-icon-social btn btn-secondary">
                            <a href="#" className="icon-social">
                                <FaInstagram />
                            </a>
                        </div>
                        <div className="div-icon-social btn btn-success">
                            <i id='iconGoogle' onClick={redirectGoogleLogin}><FaGoogle /></i>
                        </div>
                    </div>
                    <span>or use your email for registration</span>
                    <div className="Login-body-form mb-2">
                        <div className="form-outline form-input form-email">
                            <label className="form-label" htmlFor="emailForm">Email</label>
                            <input
                                type="text"
                                id="emailForm"
                                placeholder='email'
                                className="form-control input-field"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-outline form-input form-password">
                            <label className="form-label" htmlFor="passwordForm">Password</label>
                            <input
                                type="password"
                                id="passwordForm"
                                placeholder='password'
                                className="form-control input-field"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="exampleCheck1"
                                onChange={() => setConfirm(!confirm)}
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">Confirm the rules</label>
                        </div>
                    </div>
                    <div className="Login-body-buttonSignUp">
                        <button
                            type='button'
                            className='btn-login btn btn-secondary'
                            onClick={handleLogin}
                            disabled={!exist}
                        >
                            {isLoadingLogin && <ImSpinner9 className="loaderIcon" />}
                            LOGIN
                        </button>
                    </div>
                    <div className="Login-body-forgotPassword">
                        <a href='#'>Forgot password</a>
                    </div>
                    <div className="Login-header-donthaveyet">
                        <label onClick={() => navigate('/register')}>Don't have an account yet?</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
