import ApiService from './ApiService'
import axios from "axios";

export async function apiSignIn(data) {
    console.log('-------apiSignIn has work-------', data)
    return ApiService.fetchData({
        url: '/delivery-service/user/login',
        method: 'post',
        data,
    })
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
        data,
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}

export async function apiListStore() {
    return ApiService.fetchData({
        url: '/delivery-service/store/stores',
        method: 'get'
    })
}

