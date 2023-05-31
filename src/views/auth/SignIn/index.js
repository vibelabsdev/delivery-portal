import React from 'react'
import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Hệ thống quản lý cửa hàng và đơn hàng!</h3>
                <p className="flex items-center justify-center">Vui lòng đăng nhập để bắt đầu!</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
