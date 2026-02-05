import React, {useState} from 'react';
import Loader from "../components/Loader";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../store/thunk/authThunks";
import {Link, useNavigate} from "react-router-dom";
import "../assets/css/auth.css"

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.login);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
        navigate("/");
    }

    if (loading) return <Loader />;

    return (
        <div className="auth-page">
            <div className="auth-card">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Welcome Back</h2>
                    <p className="subtitle">Please enter your details</p>

                    <div className="input-group">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-submit-btn">Sign In</button>

                    <p className="auth-footer">
                        Don't have an account? <Link replace to="/register">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;