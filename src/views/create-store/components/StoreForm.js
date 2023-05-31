import React from 'react'
import { Input, Button, FormItem, FormContainer, Radio } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { actionCreateStore } from 'actions/store.actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên cửa hàng không được bỏ trống!'),
    phone: Yup.string().required('Số điện thoại không được bỏ trống!'),
    address: Yup.string().required('Địa chỉ không được bỏ trống!'),
    radio: Yup.string().required('Please select one!'),
})

const StoreFormValidation = () => {
    const notify = () => toast("Tạo cửa hàng thành công!");

    return (
        <Formik
            initialValues={{
                name: '',
                phone: '',
                address: '',
                radio: 'active'
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2))
                    
                    values['phone'] = '0' + values['phone'].toString()
                    actionCreateStore(values)
                    .then (() => {
                        notify()
                    })
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
                                label="Tên cửa hàng"
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Tên cửa hàng"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Số diện thoại"
                                invalid={errors.phone && touched.phone}
                                errorMessage={errors.phone}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="phone"
                                    placeholder="Số điện thoại"
                                    component={Input}
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
                                    placeholder="Địa chỉ"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Trạng thái"
                                asterisk
                                invalid={errors.radio && touched.radio}
                                errorMessage={errors.radio}
                            >
                                <Field name="status">
                                    {({ field, form }) => (
                                        <Radio.Group
                                            value={values.radio}
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
                                        Khởi tạo
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

export default StoreFormValidation

