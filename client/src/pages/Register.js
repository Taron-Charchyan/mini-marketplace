import React, {useState} from 'react';
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../store/thunk/authThunks";
import Loader from "../components/Loader";
import {Link, useNavigate} from "react-router-dom";
import styles from "../assets/css/Auth.module.css";


function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.register);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.warn("Passwords don't match");
        }

        dispatch(register(formData));
        navigate("/");
    };

    if (loading) return <Loader/>;

    return (
        <div className={styles["auth-page"]}>
            <div className={styles["auth-card"]}>
                <form className={styles["auth-form"]} onSubmit={handleSubmit}>
                    <h2>Create Account</h2>
                    <p className={styles["subtitle"]}>Join our community today</p>

                    <div className={styles["input-group"]}>
                        <input name="name" placeholder="Full Name" type="text" onChange={handleChange} required/>
                    </div>

                    <div className={styles["input-group"]}>
                        <input name="email" placeholder="Email Address" type="email" onChange={handleChange} required/>
                    </div>

                    <div className={styles["input-group"]}>
                        <input name="password" placeholder="Password" type="password" onChange={handleChange} required/>
                    </div>

                    <div className={styles["input-group"]}>
                        <input name="confirmPassword" placeholder="Confirm Password" type="password"
                               onChange={handleChange} required/>
                    </div>

                    <select
                        className={styles["auth-select"]}
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>

                    <button type="submit" className={styles["auth-submit-btn"]}>Register</button>

                    <p className={styles["auth-footer"]}>
                        Already have an account? <Link replace to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;