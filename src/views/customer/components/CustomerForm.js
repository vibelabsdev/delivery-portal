import React from 'react'
import { Input, Button, FormItem, FormContainer, Radio, DatePicker } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { actionCreateStore } from 'actions/store.actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actionCreateCustomer } from 'actions/customer.action'
import { useLocation, useNavigate } from 'react-router-dom'


const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên cửa hàng không được bỏ trống!'),
    phone: Yup.string().required('Số điện thoại không được bỏ trống!'),
    street: Yup.string().required('Địa chỉ không được bỏ trống!'),
    ward: Yup.string().required('Địa chỉ không được bỏ trống!'),
    district: Yup.string().required('Địa chỉ không được bỏ trống!'),
    city: Yup.string().required('Địa chỉ không được bỏ trống!'),
    birthday: Yup.date().required('Date Required!').nullable(),
    radio: Yup.string().required('Please select one!'),
})

const CustomerForm = ({state}) => {
    const notify = () => toast("Tạo khách hàng thành công!");
    const { store_name, store_id, store_code, name, customer_phone } = state; // Read values passed on state
    const navigate = useNavigate()

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    return (
        <Formik
            initialValues={{
                name: '',
                phone: customer_phone? customer_phone : '',
                street: '',
                ward: '',
                district: '',
                city: '',
                birthday: null,
                radio: 'active'
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
                        store_id: store_id,
                        address: {
                            city: values.city,
                            district: values.district,
                            ward: values.ward,
                            street: values.street,
                        },
                        status: values.radio,
                        birthday: formatDate(values.birthday),
                    }
                    
                    
                    actionCreateCustomer(dataReq)
                    .then (() => {

                        navigate('/delivery-order/create', {
                                state: {
                                    phone_data: customer_phone,
                                    store_data: store_id,
                                }
                            }
                        )
                        notify()
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
                                label="Tên khách hàng"
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
                                label="Địa chỉ"
                                // invalid={errors.phone && touched.phone}
                                // errorMessage={errors.address}
                            >
                                <div className='grid grid-cols-4 gap-5 mb-0'>

                                    <FormItem
                                        label="Tên đường"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="street"
                                            placeholder="Tên đường"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Phường"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="ward"
                                            placeholder="Phường"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Quận"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="district"
                                            placeholder="Quận"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Thành Phố"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="city"
                                            placeholder="Thành Phố"
                                            component={Input}
                                        />
                                    </FormItem>

                                    {/* <FormItem
                                        label="Địa chỉ"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="address"
                                            placeholder="Địa chỉ"
                                            component={Input}
                                        />
                                    </FormItem> */}
                                </div>
                            </FormItem>
                            <FormItem
                                asterisk
                                label="Ngày sinh"
                                invalid={errors.date && touched.date}
                                errorMessage={errors.date}
                            >
                                <Field name="birthday" placeholder="Date">
                                    {({ field, form }: FieldProps<FormModel>) => (
                                        <DatePicker
                                            field={field}
                                            form={form}
                                            value={values.date}
                                            onChange={(date) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    date
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
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

export default CustomerForm

