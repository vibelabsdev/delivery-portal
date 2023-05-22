import React from 'react'
import { Input, Button, FormItem, FormContainer, Radio } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { actionCreateStore } from 'actions/store.actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name Required'),
    phone: Yup.string().required('Phone Required'),
    address: Yup.string().required('Address Required'),
    radio: Yup.string().required('Please select one!'),
})

const StoreFormValidation = () => {
    const notify = () => toast("Store Register Successfully!");

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
                                label="Store Name"
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Store Name"
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
                                            <Radio value={'active'}>Active</Radio>
                                            <Radio value={'blocked'}>Blocked</Radio>
                                        </Radio.Group>
                                    )}
                                </Field>
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

export default StoreFormValidation

