import React, { useEffect, useState } from 'react'
import { Input, Button, FormItem, FormContainer, Radio, Select, Alert } from 'components/ui'
import { Field, Form, Formik, FieldArray, getIn,useFormikContext } from 'formik'
import * as Yup from 'yup'
import type { FieldProps } from 'formik'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiMinus } from 'react-icons/hi'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { actionCreateOrder } from 'actions/order.actions';
import { useLocation, useNavigate } from 'react-router-dom'
import { actionGetUserByPhone } from 'actions/customer.action'



const options = [
    { value: '6558f60ea41e1a28ef2d83ab', label: 'customer two' },
    { value: '6553b099e61059e4f605b2f2', label: 'customer one' },
    { value: 'bar', label: 'Bar' },
]

const validationSchema = Yup.object().shape({
    cust_name: Yup.string().required('Họ và Tên không được bỏ trống!'),
    // cust_phone: Yup.string().required('Số điện thoại không được bỏ trống!'),
    address: Yup.string().required('Địa chỉ không được bỏ trống!'),
    order_type: Yup.string().required('Chọn loại giao hàng!'),
    cust_phone: Yup.string().required('Please select one!'),

    // fee_ship: Yup.number().required('Nhập phí giao hàng!'),
    products: Yup.array().of(
        Yup.object().shape({
            product_name: Yup.string().required('Nhập tên sản phẩm!'),
            product_price: Yup.string().required('Nhập giá!'),
            quantity: Yup.string().required('Nhập số lượng!'),
        })
    ),
})

const fieldFeedback = (form, name) => {
    const error = getIn(form.errors, name)
    const touch = getIn(form.touched, name)
    return {
        errorMessage: error || '',
        invalid: typeof touch === 'undefined' ? false : error && touch,
    }
}


const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});


const OrderForm = ({state}) => {

    const navigate = useNavigate()
    // const refFeeship = useRef();
    const [message, setMessage] = useTimeOutMessage()

    const { store_name, store_id, store_code, name, phone_data, store_data } = state; // Read values passed on state
    const notify = () => toast("tạo đơn thành công!");

    const [ totalAmount, setTotalAmount ] = useState(0)
    const [ feeShip, setFeeShip ] = useState(0)
    const [ customers, setCustomers ] = useState([])
    // const { setFieldValue } = useFormikContext();
    const [ phone, setPhone ] = useState('')

    useEffect(() => {

        if(phone_data && store_data) {
            const dataReq = {
                phone: phone_data,
                store_id: store_data,
            }
            actionGetUserByPhone(dataReq).then(response => {
                
                const newCustomer = response?.data?.customers.map(obj => ({
                    [`value`]: obj.phone,
                    [`label`]: obj.phone,
                    [`address`]: obj.address,
                    [`name`]: obj.name,
                    [`_id`]: obj._id,
                  }));
                  
                setCustomers(newCustomer)
                
            })
        }
    }, [])
    

    const handleChangeProd = (index, products) => {
        
        let totalPrice = 0
        if (products && products.length > 0) {
            products.map((item) => {
                if(item.product_name != '' && item.product_price != '' && item.quantity !='')
                {
                    totalPrice = totalPrice + item.product_price * item.quantity
                }
            })
            setTotalAmount(totalPrice)
        }
    }
    const handleChangeFeeShip = (event) => {
        // refFeeship.current.value = event.target.value
        const feeShipValue = event.target.value

        setFeeShip(event.target.value)
       
    }   

    const total = parseFloat(totalAmount) + parseFloat(feeShip)

    const handleChangePhoneNumber = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '')

        if(inputValue.length >= 6) {
            const dataReq = {
                phone: inputValue,
                store_id: store_id,
            }
            actionGetUserByPhone(dataReq).then(response => {
                
                const newArrayObjects = response?.data?.customers.map(obj => ({
                    [`value`]: obj.phone,
                    [`label`]: obj.phone,
                    [`address`]: obj.address,
                    [`name`]: obj.name,
                    [`_id`]: obj._id,
                  }));
                  
                setCustomers(newArrayObjects)
                
                if(newArrayObjects.length === 0 && inputValue.length == 10 ) {
                    setPhone(inputValue)
                }
            })
            
        }
        
    }

    const handleCreateCustomer = () => {
        navigate(   
            '/delivery-customer/create',
            {
                state: {
                  phone: phone,
                },
            }
        )
    }
    
    return (
        <>
        <Formik
            initialValues={{
                cust_name: '',
                // cust_phone: '',
                address: '',
                name: name,
                cust_phone: '',
                
                store_code: store_code,
                products: [],
                order_type: ''
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                setSubmitting(true)
                if (values.products.length < 1) {

                    setMessage('đơn hàng phải có ít nhất một sản phẩm!')
                    setSubmitting(false)
                }else {
                    setTimeout(() => {
                        
                        const dataReq = {
                            cust_name: values.cust_name,
                            cust_phone: values.cust_phone,
                            store_id: store_id,
                            user_id: store_id,
    
                            address: values.address,
                            store_code: store_code, 
                            product_list: values.products,
                            total_amount: parseFloat(totalAmount),
    
                            fee_ship: parseFloat(feeShip),
                            order_type: values.order_type,
                            extract: {},
                            status: "wait",
                            customer_id: values.cust_id,
                        }

                        actionCreateOrder(dataReq).then(() => {
                            navigate(   
                                '/delivery-order/wait'
                            )
                        })
                        
                        // .then (() => {
                        //     notify();

                        // })

                        setSubmitting(false)
                        resetForm()
                    }, 400)
                }
                
            }}
        >
            {({ values, resetForm, touched, errors, isSubmitting, setFieldValue }) => {
                const products = values.products
                return (
                    <Form>
                        <FormContainer>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    {/* <FormItem
                                        label="Số điện thoại"
                                        invalid={errors.cust_phone && touched.cust_phone}
                                        errorMessage={errors.cust_phone}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="cust_phone"
                                            placeholder="Vui lòng nhập Số điện thoại"
                                            component={Input}
                                        />
                                    </FormItem> */}
                                    <div className='flex flex-row'>
                                        <FormItem
                                            asterisk
                                            label="Số điện thoại"
                                            invalid={errors.cust_phone && touched.cust_phone}
                                            errorMessage={errors.cust_phone}
                                            className='w-full'
                                        >
                                            
                                                <Field name="cust_phone">
                                                    {({ field, form }: FieldProps<FormModel>) => (
                                                        <Select
                                                            field={field}
                                                            form={form}
                                                            options={customers}
                                                            value={customers.filter(
                                                                (option) =>
                                                                    option.value ===
                                                                    values.cust_phone
                                                            )}
                                                            onInputChange={
                                                                handleChangePhoneNumber
                                                                } 
                                                            onChange={(option) => {
                                                                setFieldValue('cust_id', option._id)
                                                                setFieldValue('cust_name', option.name)
                                                                setFieldValue('address', option.address.street + ' ' + option.address.ward + ' ' + option.address.district + ' ' + option.address.city)
                                                                setFieldValue('isDisabled', true);
                                                                form.setFieldValue(
                                                                    field.name,
                                                                    option?.value
                                                                    )
                                                                }
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                                
                                        </FormItem>
                                        <div className={ customers.length > 0 ? `hidden` : `justify-center items-center flex ml-[32px]`}>
                                            <a 
                                                className='cursor-pointer h-[42px] w-auto px-[20px] flex items-center bg-blue-500 text-white rounded-md' 
                                                onClick={handleCreateCustomer}
                                            >
                                                Thêm
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <div className='hidden'>
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="cust_id"
                                            component={Input}
                                            disabled
                                        />
                                    </div>
                                    <FormItem
                                        label="Họ và Tên"
                                        invalid={errors.cust_name && touched.cust_name}
                                        errorMessage={errors.cust_name}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="cust_name"
                                            placeholder="Vui lòng nhập Họ và Tên"
                                            component={Input}
                                            disabled={values.isDisabled}
                                        />
                                    </FormItem>
                                    
                                    <FormItem
                                        label="Địa chỉ giao hàng"
                                        invalid={errors.address && touched.address}
                                        errorMessage={errors.address}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="address"
                                            placeholder="Vui lòng nhập địa chỉ"
                                            component={Input}
                                            disabled={values.isDisabled}
                                        />
                                    </FormItem>
                                </div>
                                <div>
                                    <FormItem
                                        label="Tên cửa hàng"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="name"
                                            component={Input}
                                            disabled
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Mã cửa hàng"
                                        
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="store_code"
                                            component={Input}
                                            disabled
                                        />
                                    </FormItem>
                                </div>
                            </div>
                            {/* <AddProduct /> */}
                            <Form className='mb-[60px]'>
                                <FormContainer layout="inline">
                                    <div>
                                        <div className="mb-10">
                                            <h5 className="mb-4">Sản phẩm</h5>
                                            
                                        </div>
                                        <FieldArray 
                                            name="products"
                                            
                                        >
                                            {({ form, remove, push }) => (
                                                <div>
                                                    {products && products.length > 0
                                                        ? products.map((_, index) => {
                                                            const nameFeedBack =
                                                                fieldFeedback(
                                                                    form,
                                                                    `products[${index}].product_name`
                                                                )
                                                                fieldFeedback(
                                                                    form,
                                                                    `products[${index}].product_price`
                                                                )
                                                                fieldFeedback(
                                                                    form,
                                                                    `products[${index}].quantity`
                                                                )

                                                            return (
                                                                <div key={index} onChange={handleChangeProd(index, products)}>
                                                                        <FormItem
                                                                            label="Tên sản phẩm"
                                                                            invalid={
                                                                                nameFeedBack.invalid
                                                                            }
                                                                            errorMessage={
                                                                                nameFeedBack.errorMessage
                                                                            }
                                                                        >
                                                                            <Field
                                                                            
                                                                                invalid={
                                                                                    nameFeedBack.invalid
                                                                                }
                                                                                className="w-[300px]"
                                                                                placeholder="Nhập tên sản phẩm"
                                                                                name={`products[${index}].product_name`}
                                                                                type="text"
                                                                                component={
                                                                                    Input
                                                                                }
                                                                            />
                                                                        </FormItem>
                                                                    <FormItem
                                                                        label="Đơn giá"
                                                                        
                                                                    >
                                                                        <Field
                                                                            
                                                                            placeholder="Nhập đơn giá"
                                                                            name={`products[${index}].product_price`}
                                                                            type="text"
                                                                            component={
                                                                                Input
                                                                            }
                                                                        />
                                                                    </FormItem>
                                                                    <FormItem
                                                                        label="Số lượng"
                                                                    >
                                                                        <Field
                                                                            
                                                                            placeholder="Nhập số lượng"
                                                                            name={`products[${index}].quantity`}
                                                                            type="number"
                                                                            component={
                                                                                Input
                                                                            }
                                                                        />
                                                                    </FormItem>
                                                                    <Button
                                                                        shape="circle"
                                                                        size="sm"
                                                                        icon={
                                                                            <HiMinus />
                                                                        }
                                                                        onClick={() =>{
                                                                            remove(
                                                                                index
                                                                            )
                                                                            
                                                                        }}
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                        : null}
                                                    <div>
                                                        <Button
                                                            type="button"
                                                            className="ltr:mr-2 rtl:ml-2"
                                                            onClick={() => {
                                                                push({
                                                                    product_name: '',
                                                                    product_price: '',
                                                                    quantity: '',
                                                                })
                                                                
                                                            }}
                                                        >
                                                            Thêm sản phẩm
                                                        </Button>
                                                    
                                                    </div>
                                                </div>
                                            )}
                                        </FieldArray>
                                    </div>
                                </FormContainer>
                            </Form>
                            
                            <div className='w-[50%]'>
                                <FormItem
                                    label="Phí giao hàng"
                                    // invalid={errors.fee_ship && touched.fee_ship}
                                    // errorMessage={errors.fee_ship}
                                >
                                    <Field
                                        type="number"
                                        name="fee_ship"
                                        autoComplete="off"
                                        placeholder="Nhập phí giao hàng"
                                        component={Input}
                                        onChange={handleChangeFeeShip}
                                    />
                                </FormItem>

                                <div className='mb-[24px] flex flex-col gap-y-3'>
                                    <h5>Thành tiền</h5>
                                    <p>Tổng tiền hàng: {VND.format(totalAmount)}</p>

                                    <p>Phí giao hàng: {VND.format(feeShip)}</p>
                                    <p>Tổng cộng: {VND.format(total)}</p>

                                    
                                </div>

                                <FormItem
                                    label="Loại giao"
                                    
                                    invalid={errors.order_type && touched.order_type}
                                    errorMessage={errors.order_type}
                                >
                                    <Field name="order_type">
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
                                                <Radio value="normal">Giao thường</Radio>
                                                <Radio value="express">Giao hoả tốc</Radio>
                                            </Radio.Group>
                                        )}
                                    </Field>
                                </FormItem>
                            </div>
                            
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
                                        Tạo đơn hàng
                                    </Button>
                                </div>
                            </FormItem>
                        </FormContainer>
                        <ToastContainer />
                    </Form>
                )
            }}
        </Formik>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
        </>
    )
}

export default OrderForm

