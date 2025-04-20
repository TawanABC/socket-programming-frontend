/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginSchema } from '@/common/schemas';
import * as yup from "yup";
import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch } from '@/states/hook';
import { loginService } from '@/services/userService';
import { login } from '@/states/features/authSlices';
import { setUser } from '@/states/features/userSlice';
import { useRouter } from "next/navigation";
import { socket } from '@/utils/instances';

export default function LoginForm() {
    type formSchema = yup.InferType<typeof loginSchema>;

    const [isError, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    // const loggedInUser = {
    //     email: "dummy@gmail.com",
    //     password: "abc1234"
    // }
    const initialValues = {
        email: "",
        password: ""
    };

    const dispatch = useAppDispatch();
    const handleSubmit = async (
        values: formSchema,
        actions: FormikHelpers<formSchema>,
    ) => {
        try {
            console.log(values);
            const { user, token } = await loginService(values);
            console.log("data after login", user, "token", token);
            if (token) {
                console.log("in token");
                dispatch(login(token));
                dispatch(setUser(user));
                actions.resetForm();
                router.push("/home");
                socket.connect()
            }
        } catch (err) {
            console.error(err);
            setError(true);
        }
    };

    return (
        // <div>LoginForm</div>
        <div className="flex min-h-screen items-center justify-center">
            <div className="m-auto w-full max-w-lg rounded-md bg-white p-6 shadow-sm">
                <h1 className='flex flex-row text-3xl font-bold items-center justify-center'>Sign In</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit as any}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-4" autoComplete="off">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    email
                                </label>
                                <Field
                                    type='email'
                                    name='email'
                                    placeholder="Enter your email"
                                    required
                                    className={`bg-white text-black input input-bordered border-blue-700 w-full ${errors.email && touched.email
                                        ? "input-error"
                                        : "input-primary"
                                        }`}
                                />
                                <ErrorMessage
                                    name='email'
                                    component="p"
                                    className="text-xs text-red-500"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    Password
                                </label>
                                <div className='relative'>
                                    <Field

                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name='password'
                                        placeholder='Enter your password'
                                        required
                                        className={`bg-white input input-bordered border-blue-700 w-full ${errors.email && touched.email
                                            ? "input-error"
                                            : "input-primary"
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePassword}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>
                                </div>
                                <ErrorMessage
                                    name='password'
                                    component="p"
                                    className="text-xs text-red-500"
                                />
                            </div>

                            {isError && (
                                <span className="text-error">
                                    Wrong email or password!
                                </span>
                            )}
                            <div className="flex items-center justify-center py-1">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full rounded-2xl px-4 py-3 text-white focus:outline-none ${isSubmitting
                                        ? "cursor-not-allowed bg-gray-400"
                                        : "bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
                                        }`}
                                >
                                    Login
                                </button>
                            </div>
                            <div className='flex flex-row space-x-3'>
                                <div>{`Don't have an account?`}</div>
                                <Link className='underline hover:cursor-pointer hover:text-blue-700'
                                    href="/signup"
                                >Sign Up</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
