import React, { useEffect } from 'react'
import {
    Input,
    Button,
    Checkbox,
    FormItem,
    FormContainer,
    Alert,
} from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'

const validationSchema = Yup.object().shape({
    phone: Yup.string().required('Vui lòng nhập số điện thoại!'),
    password: Yup.string().required('Vui lòng nhập mật khẩu!'),
    rememberMe: Yup.bool(),
})

const SignInForm = (props) => {
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',
    } = props

    const [message, setMessage] = useTimeOutMessage()
    const dispatch = useDispatch();

    const [ dataRes, setDataRes ] = useState([])

    const { signIn } = useAuth()

    const onSignIn = async (values, setSubmitting) => {
        const { phone, password } = values
        setSubmitting(true)     
        
        // const result = await authLogin(values)
        // console.log('---result--', result)
        const result = await signIn({ phone, password })
        if (result.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                // Remove this initial value
                initialValues={{
                    phone: '',
                    password: '',
                    rememberMe: true,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignIn(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Số điện thoại"
                                invalid={errors.phone && touched.phone}
                                errorMessage={errors.phone}
                            >
                                <Field
                                    type="string"
                                    autoComplete="off"
                                    name="phone"
                                    placeholder="Số điện thoại"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Mật khẩu"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Mật khẩu"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <div className="flex justify-between mb-6">
                                <Field
                                    className="mb-0"
                                    name="rememberMe"
                                    component={Checkbox}
                                    children="Ghi nhớ tài khoản"
                                />
                                <ActionLink to={forgotPasswordUrl}>
                                    Quên mật khẩu à?
                                </ActionLink>
                            </div>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                            </Button>
                            {/* <div className="mt-4 text-center">
                                <span>Don't have an account yet? </span>
                                <ActionLink to={signUpUrl}>Sign up</ActionLink>
                            </div> */}
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignInForm
