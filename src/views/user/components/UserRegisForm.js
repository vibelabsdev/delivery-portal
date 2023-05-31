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
    { value: 'store', label: 'Store' },

]

function validateEmail(value) {
    let error
    if (!value) {
        error = 'Thông tin bắt buộc!'
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

    const { store_name, store_id, store_code } = state; // Read values passed on state
    console.log(store_id);
    console.log(store_code);
    console.log(store_name);
    const notify = () => toast("Đăng ký người dùng thành công!");

    const [pwInputType, setPwInputType] = useState('password')

    const onPasswordVisibleClick = (e) => {
        e.preventDefault()
        setPwInputType(pwInputType === 'password' ? 'text' : 'password')
    }
    console.log(store_id);
    console.log(store_code);
    console.log(store_name);

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
                permission: 'store',
                password: '',
                confirmPassword: '',
                store_code: '',
            
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
                        store_code: store_code,
                    }

                    actionRegisterUser(dataReq)
                    // console.log('------resul-----', result)
                    // if(result.data && result.data === true) {
                    //     notify()
                    // }
                    .then (() => {
                        notify();
                    })

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
                                label="Họ và Tên"
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Vui lòng nhập Họ và Tên"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Số điện thoại"
                                invalid={errors.phone && touched.phone}
                                errorMessage={errors.phone}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="phone"
                                    placeholder="Vui lòng nhập Số điện thoại"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Địa chỉ email"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Vui lòng nhập Địa chỉ email"
                                    component={Input}
                                    validate={validateEmail}
                                />
                            </FormItem>
                            <FormItem
                                label="Địa chỉ"
                                invalid={errors.phone && touched.phone}
                                errorMessage={errors.address}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="address"
                                    placeholder="Vui lòng nhập địa chỉ"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Trạng thái"
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
                                            <Radio value={'active'}>Hoạt động</Radio>
                                            <Radio value={'blocked'}>Tạm khoá</Radio>
                                        </Radio.Group>
                                    )}
                                </Field>
                            </FormItem>
                            {/* <FormItem
                                label="Phân quyền"
                                invalid={errors.select && touched.select}
                                errorMessage={errors.select}
                            > */}
                                {/* <Field name="permission">
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
                                </Field> */}
                            {/* </FormItem> */}
                            <FormItem
                                label="Mật khẩu"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    type={pwInputType}
                                    suffix={passwordVisible}
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Vui lòng nhập Mật khẩu"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Xác nhận mật khẩu"
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
                                    placeholder="Vui lòng xác nhận lại mật khẩu"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem>
                                <div className="flex gap-2">
                                    <Button type="reset" onClick={resetForm}>
                                        Nhập lại
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        loading={isSubmitting}
                                    >
                                        Đăng ký
                                    </Button>
                                </div>
                            </FormItem>
                        </FormContainer>
                        <ToastContainer />
                    </Form>
                )
            }}
        </Formik>
    )
}

export default UserRegisForm

