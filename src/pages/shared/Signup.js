import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
// import useToken from '../hooks/useToken';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import SmallSpinner from '../../components/SmallSpinner';

const Signup = () => {
    const { createUser, updateUser, googleSignIn, setLoading, loading } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signupError, setSignupError] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [token] = useToken(userEmail);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from])


    const handleSignup = data => {
        setSignupError('');
        const role = data.role ? data.role : 'buyer';
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('user created')
                const userInfo = {
                    displayName: data.name
                }
                //update user profile 
                updateUser(userInfo)
                    .then(result => {
                        saveUserToDb(data.name, data.email, role);
                    })
                    .catch(error => { })
            })
            .catch(error => {
                console.error(error)
                setSignupError(error.message);
                setLoading(false);
            })
    }

    // saving registered users to database
    const saveUserToDb = (name, email, role = 'buyer', isVerified = false) => {
        const user = { name, email, role, isVerified };
        fetch('https://phone-kinun-server-nazmulrony.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUserEmail(email);
            })
    }
    //handle google sign in
    const handleGoogleSingIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);
                saveUserToDb(user.displayName, user.email);
            })
            .catch(error => {
                setSignupError(error.message);
                setLoading(false);
            })
    }

    return (
        <div className='p-4'>
            <div className='mx-auto py-6 border max-w-md px-6 rounded-xl bg-light shadow-lg shadow-black/10'>
                <h3 className='text-xl text-ruby font-semibold text-center'>Sign Up</h3>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="form-control w-full">
                        <label className="label">Name</label>
                        <input
                            type="name"
                            {...register("name", {
                                required: 'Name is required'
                            })}
                            placeholder="Enter Your Name"
                            className="input input-bordered w-full "
                        />
                        {errors.name && <p className='mt-1 text-sm text-red-600'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            placeholder="Enter Email"
                            className="input input-bordered w-full "
                        />
                        {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full my-2">
                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least six characters long' },
                                pattern: {
                                    value: /^(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must include at least one number and one special character.'
                                }
                            })}
                            placeholder="Enter Password"
                            className="input input-bordered w-full "
                        />
                        {errors.password && <p className='mt-1 text-sm text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <div className="form-control w-full my-6 gap-1 " >
                        <label >Select User Type</label>
                        <div className=' flex gap-1'>
                            <input
                                {...register('role')}
                                type="radio"
                                value='buyer'
                                id='buyer'
                                className='radio radio-primary'
                            />
                            <label htmlFor="buyer">Buyer</label>
                        </div>
                        <div className=' flex gap-1'>
                            <input
                                {...register('role')}
                                type="radio"
                                value='seller'
                                id='seller'
                                className='radio radio-primary'
                            />
                            <label htmlFor="seller">Seller</label>
                        </div>
                    </div>
                    {
                        signupError && <p className='text-red-600 mb-1 text-sm'>{signupError}</p>
                    }
                    <button type='submit' className='btn btn-primary w-full'>{loading ? <SmallSpinner /> : 'Sign Up'}</button>
                </form>
                <p className='text-center text-sm my-3'>Already have an account? <Link to="/login" className=' text-primary'>Login</Link></p>
                <div className="divider">OR</div>
                <button
                    onClick={handleGoogleSingIn}
                    className='btn btn-outline btn-primary w-full'>
                    <FaGoogle className='text-xl mr-2' />
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Signup;