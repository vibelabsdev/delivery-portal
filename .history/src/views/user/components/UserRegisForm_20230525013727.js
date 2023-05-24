import React, { useState } from 'react'
import { Input, Button, FormItem, FormContainer, Radio, Select } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { actionCreateStore } from 'actions/store.actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'
import { actionRegisterUser } from 'actions/user.actions'

const options = [
    { value: 'ship', label: 'Ship' },
    { value: 'admin', label: 'Admin' },
]

function validateEmail(value) {
    let error
    if (!value) {
        error = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Địa chỉ email không đúng định dạng!'
    }
    return error
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Họ và Tên không được bỏ trống!'),
    phone: Yup.string().required('Số điện thoại không được bỏ trống!'),
    email: Yup.string().required('Địa chỉ email không được bỏ trống!'),
    address: Yup.string().required('Địa chỉ không được bỏ trống!'),
    status: Yup.string().required('Vui lòng chọn trạng thái!'),
    permission: Yup.string().required('Vui lòng chọn quyền!'),
    password: Yup.string().required('Mật khẩu không được bỏ trống!'),
    confirmPassword: Yup.string()
        .required('Xác nhận lại mật khẩu không được bỏ trống!')
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp, vui lòng thử lại!'),
})

const UserRegisForm = ({state}) => {

    const { store_name, store_id } = state; // Read values passed on state

    const notify = () => toast("Đăng ký người dùng thành công!");

    const [pwInputType, setPwInputType] = useState('password')

    const onPasswordVisibleClick = (e) => {
        e.preventDefault()
        setPwInputType(pwInputType === 'password' ? 'text' : 'password')
    }

    const passwordVisible = (
        <span
            className="cursor-pointer"
            onClick={(e) => onPasswordVisibleClick(e)}
        >
            {pwInputType === 'password' ? (
                <HiOutlineEyeOff />
            ) : (
                <HiOutlineEye />
            )}
        </span>
    )

    return (
        <Formik
            initialValues={{
                name: '',
                phone: '',
                address: '',
                status: 'active',
                email: '',
                permission: 'ship',
                password: '',
                confirmPassword: ''
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2))
                    values['phone'] = '0' + values['phone'].toString()
                    const dataReq = {
                        name: values.name,
                        phone: values.phone,
                        password: values.password,
                        store_id: store_id,
                        email: values.email,
                        address: values.address,
                        permission: values.permission,
                        status: values.status,
                    }

                    actionRegisterUser(dataReq)
                    // console.log('------resul-----', result)
                    // if(result.data && result.data === true) {
                    //     notify()
                    // }

                    setSubmitting(false)
                    resetForm()
                }, 400)
            }}
        >
            {({ values, resetForm, touched, errors, isSubmitting }) => {
                return (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Name"
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Name"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Phone"
                                invalid={errors.phone && touched.phone}
                                errorMessage={errors.phone}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="phone"
                                    placeholder="Phone"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Email"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                    validate={validateEmail}
                                />
                            </FormItem>
                            <FormItem
                                label="Address"
                                invalid={errors.phone && touched.phone}
                                errorMessage={errors.address}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="address"
                                    placeholder="Address"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Status"
                                asterisk
                                invalid={errors.status && touched.status}
                                errorMessage={errors.status}
                            >
                                <Field name="status">
                                    {({ field, form }) => (
                                        <Radio.Group
                                            value={values.status}
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val
                                                )
                                            }
                                        >
                                            <Radio value={'active'}>Active</Radio>
                                            <Radio value={'blocked'}>Blocked</Radio>
                                        </Radio.Group>
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                label="Permission"
                                asterisk
                                invalid={errors.select && touched.select}
                                errorMessage={errors.select}
                            >
                                <Field name="permission">
                                    {({ field, form }) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            options={options}
                                            value={options.filter(
                                                (option) =>
                                                    option.value ===
                                                    values.permission
                                            )}
                                            onChange={(option) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    option.value
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                label="Password"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    type={pwInputType}
                                    suffix={passwordVisible}
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Password"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Password"
                                invalid={
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                }
                                errorMessage={errors.confirmPassword}
                            >
                                <Field
                                    type={pwInputType}
                                    suffix={passwordVisible}
                                    autoComplete="off"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem>
                                <div className="flex gap-2">
                                    <Button type="reset" onClick={resetForm}>
                                        Reset
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        loading={isSubmitting}
                                    >
                                        Register
                                    </Button>
                                </div>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default UserRegisForm

