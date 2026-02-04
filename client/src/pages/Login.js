import React, {useState} from 'react';
import Loader from "../components/Loader";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })


    if (loading) return <Loader />;

    return (
        <div className="auth-page">
            <div className="auth-card">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Welcome Back</h2>
                    <p className="subtitle">Please enter your details</p>

                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={e => setFormData({...formData, password: e.target.value})}
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