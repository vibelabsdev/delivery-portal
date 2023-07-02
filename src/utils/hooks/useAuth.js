import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import { apiSignIn, apiSignOut, apiSignUp } from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { authService } from 'services'
import jwt from 'jwt-decode'
import { LocalStorageService } from 'helpers'
import { setRoleUser } from 'store/role/roleSlice'

function useAuth() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const signIn = async (values) => {
        try {
            // const resp = await apiSignIn(values)
            const response = await authService.login(values)
            const resp = await response.json();

            if (resp.status === 1) {
                const { token } = resp.data
                dispatch(onSignInSuccess(token))

                LocalStorageService.setToken(resp.data)
                const user = jwt(token);

                if (user) {
                    // dispatch(
                    //     setUser(
                    //         user || {
                    //             avatar: '',
                    //             name: 'Anonymous',
                    //             phone: '',
                    //             store_id: '',
                    //             permission: 'admin',
                    //             authority: ['USER'],
                    //             email: '',
                    //         }
                    //     )
                    // )
                    // dispatch(setRoleUser(user))

                    localStorage.setItem('role', user.payload.permission)
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)

                navigate(   
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }

            } else {
                return {
                    status: 'failed',
                    message: 'Sai số điện thoại hoặc mật khẩu!' || resp?.msg,
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values) => {
        try {
            const resp = await apiSignUp(values)
            if (resp.data) {
                const { token } = resp.data
                dispatch(onSignInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        // await apiSignOut()
        const response = await authService.logout()
        
        const resp = await response.json();
        // console.log('----response signOut-----', resp)
        if (resp.data === true) {
            handleSignOut()
        }
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
