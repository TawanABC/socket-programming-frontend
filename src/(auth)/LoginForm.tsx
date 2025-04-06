import { loginSchema } from '@/common/schemas';
import * as yup from "yup";
import React from 'react'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';

export default function LoginForm() {
    type formSchema = yup.InferType<typeof loginSchema>;

    const loggedInUser = {
        email: "dummy@gmail.com",
        password: "abc1234"
    }
    const initialValues = {
        email: "",
        password: ""
    };


    const handleSubmit = async (
        values: formSchema,
        actions: FormikHelpers<formSchema>,
    ) => {
        try {
            console.log(values);
            // const data = {
            //     ...values,
            //     userId: loggedInUser?.userId,
            // };

            // const { user } = await updateUser({ user: data });

            // dispatch(setUser(user));
            // setShowSubmitPopup(true);
            // setTimeout(() => {
            //     setShowSubmitPopup(false);
            // }, 3000);

            // router.refresh();

        } catch (err) {
            console.error(err);
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
                    {({ isSubmitting, errors, touched, setFieldValue }) => (
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
                                <Field
                                    type='password'
                                    name='password'
                                    placeholder='Enter your password'
                                    required
                                    className={`bg-white input input-bordered border-blue-700 w-full ${errors.email && touched.email
                                        ? "input-error"
                                        : "input-primary"
                                        }`}
                                />
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
