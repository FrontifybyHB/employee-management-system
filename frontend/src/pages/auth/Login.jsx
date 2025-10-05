import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../utils/api';

const Login = () => {
    const [formData, setFormData] = useState({
        email: localStorage.getItem('userEmail') || '',
        password: '',
    });
    const [rememberMe, setRememberMe] = useState(localStorage.getItem('rememberMe') === 'true');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const response = await api.post('/auth/login', {
                ...formData,
                rememberMe
            });

            // Save remember me preference if checked
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('userEmail', formData.email);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('userEmail');
            }

            dispatch(loginSuccess(response.data));

            // Redirect based on user role
            if (response.data.user.isAdmin && response.data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/employee');
            }
        } catch (err) {
            dispatch(loginFailure(err.response?.data?.message || 'Login failed'));
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-600">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div>
                    {/* <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
                        EMS
                    </h1> */}
                    <h2 className="text-2xl font-semibold text-center text-gray-800">
                        Login
                    </h2>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded text-center text-sm">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>

                        <Link
                            to="/forgot-password"
                            className="text-sm text-teal-600 hover:text-teal-500"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit" fullWidth>
                        Login
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-teal-600 hover:text-teal-500 font-medium">
                            Register here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;