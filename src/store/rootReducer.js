import { combineReducers } from 'redux'
import theme from './theme/themeSlice'
import auth from './auth'
import base from './base'
import locale from './locale/localeSlice'
import store from './delivery_store/storeSlice'
import order from './delivery_order/orderSlice'
import dashboardState from './delivery_dashboard/dashboardStateSlice'
import dashboard from './delivery_dashboard/dashboardSlice'
import role from './role/roleSlice'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        auth,
        base,
        locale,
        store,
        order,
        dashboardState,
        dashboard,
        role,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}

export default rootReducer
