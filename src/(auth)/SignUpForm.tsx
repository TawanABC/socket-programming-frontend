import { signUpSchema } from '@/common/schemas';
import * as yup from "yup";
import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

export default function SignUpForm() {
    type formSchema = yup.InferType<typeof signUpSchema>;
    // const [isError, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)
    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };
    const toggleConfirmPassword = () => {
        setshowConfirmPassword((prev) => !prev);
    };
    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    };


    const handleSubmit = async (
        values: formSchema,
        actions: FormikHelpers<formSchema>,
    ) => {
        try {
            console.log(values);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="m-auto w-full max-w-lg rounded-md bg-white p-6 shadow-sm">
                <h1 className='flex flex-row text-3xl font-bold items-center justify-center'>Create new account</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={signUpSchema}
                    onSubmit={handleSubmit as any}
                >
                    {({ isSubmitting, errors, touched, setFieldValue }) => (
                        <Form className="space-y-4" autoComplete="off">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    Email
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
                                    Username
                                </label>
                                <Field
                                    type='text'
                                    name='username'
                                    placeholder="Enter your username"
                                    required
                                    className={`bg-white text-black input input-bordered border-blue-700 w-full ${errors.email && touched.email
                                        ? "input-error"
                                        : "input-primary"
                                        }`}
                                />
                                <ErrorMessage
                                    name='username'
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
                                        name='confirmPassword'
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
                                    name='confirmPassword'
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
                                            showConfirmPassword ? "text" : "password"
                                        }
                                        name='password'
                                        placeholder='Confirm your password'
                                        required
                                        className={`bg-white input input-bordered border-blue-700 w-full ${errors.email && touched.email
                                            ? "input-error"
                                            : "input-primary"
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPassword}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                                    >
                                        {showConfirmPassword ? (
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

                            <div className="flex items-center justify-center py-1">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full rounded-2xl px-4 py-3 text-white focus:outline-none ${isSubmitting
                                        ? "cursor-not-allowed bg-gray-400"
                                        : "bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
                                        }`}
                                >
                                    Sign Up
                                </button>
                            </div>
                            <div className='flex flex-row space-x-3'>
                                <div>{`Already have an account?`}</div>
                                <Link className='underline hover:cursor-pointer hover:text-blue-700'
                                    href="/login"
                                >Sign In</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}