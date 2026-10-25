import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'STUDENT'
    });
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        // Strict DBIT Email Domain Validation
        if (!formData.email.trim().toLowerCase().endsWith('@dbit.in')) {
            setError('Access Restricted: Only emails ending with @dbit.in are permitted.');
            return;
        }

        try {
            if (isSignUp) {
                // EXPLICIT REGISTER PAYLOAD
                const response = await axios.post('http://localhost:8080/api/users/register', {
                    name: formData.name,
                    email: formData.email.trim(),
                    password: formData.password,
                    role: formData.role
                });

                if (response.data) {
                    setSuccessMsg('Account created successfully! Switching to Sign In...');
                    setTimeout(() => {
                        setIsSignUp(false);
                        setSuccessMsg('');
                    }, 1500);
                }
            } else {
                // EXPLICIT LOGIN PAYLOAD
                const response = await axios.post('http://localhost:8080/api/users/login', {
                    email: formData.email.trim(),
                    password: formData.password
                });

                if (response.data) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    if (onLoginSuccess) {
                        onLoginSuccess(response.data);
                    }
                }
            }
        } catch (err) {
            const apiError = err.response?.data;
            if (typeof apiError === 'string') {
                setError(apiError);
            } else if (apiError?.message) {
                setError(apiError.message);
            } else {
                setError('Registration failed. Please verify your Spring Boot terminal logs.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>{isSignUp ? 'Campus-Sync Sign Up' : 'Campus-Sync Sign In'}</h2>
                <p style={styles.subText}>Don Bosco Institute of Technology (@dbit.in) Domain Only</p>

                {error && <p style={styles.error}>{String(error)}</p>}
                {successMsg && <p style={styles.success}>{successMsg}</p>}

                <form onSubmit={handleSubmit}>
                    {isSignUp && (
                        <>
                            <div style={styles.inputGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Priyanshu Girap"
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Select Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    style={styles.input}
                                >
                                    <option value="STUDENT">Student</option>
                                    <option value="FACULTY">Faculty</option>
                                    <option value="OFFICE_ADMIN">Office Admin</option>
                                    <option value="CANTEEN_ADMIN">Canteen Admin</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div style={styles.inputGroup}>
                        <label>DBIT Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="yourname@dbit.in"
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            style={styles.input}
                        />
                    </div>

                    <button type="submit" style={styles.button}>
                        {isSignUp ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                <div style={styles.toggleContainer}>
                    <span>
                        {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError('');
                            setSuccessMsg('');
                        }}
                        style={styles.toggleBtn}
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '65vh' },
    card: { width: '380px', padding: '30px', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.15)', backgroundColor: 'var(--bg-main, #fff)', textAlign: 'center' },
    subText: { fontSize: '0.82rem', color: '#666', marginBottom: '15px' },
    inputGroup: { marginBottom: '15px', textAlign: 'left' },
    input: { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' },
    button: { width: '100%', padding: '12px', backgroundColor: 'var(--primary, #007bff)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' },
    error: { color: '#d9534f', fontSize: '0.85rem', marginBottom: '10px', backgroundColor: '#fdf7f7', padding: '8px', borderRadius: '4px' },
    success: { color: '#5cb85c', fontSize: '0.85rem', marginBottom: '10px', backgroundColor: '#f7fdf7', padding: '8px', borderRadius: '4px' },
    toggleContainer: { marginTop: '20px', fontSize: '0.9rem' },
    toggleBtn: { background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontWeight: 'bold', padding: 0 }
};

export default Login;