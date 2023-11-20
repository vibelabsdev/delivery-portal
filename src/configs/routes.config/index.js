import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: React.lazy(() => import('views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: React.lazy(() => import('views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: React.lazy(() => import('views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: React.lazy(() =>
            import('views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: React.lazy(() =>
            import('views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: React.lazy(() =>
            import('views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },
    {
        key: 'menu.stores',
        path: '/delivery-store',
        component: React.lazy(() =>
            import('views/store')
        ),
        authority: [],
    },
    {
        key: 'menu.orders',
        path: `/delivery-order/:status`,
        component: React.lazy(() => import('views/order')),
        authority: [],
    },
    {
        key: 'menu.store-create',
        path: `/delivery-store/create`,
        component: React.lazy(() => import('views/create-store')),
        authority: [],
    },
    {
        key: 'menu.user-create',
        path: `/delivery-user/create`,
        component: React.lazy(() => import('views/user')),
        authority: [],
    },
    {
        key: 'menu.order-create',
        path: `/delivery-order/create`,
        component: React.lazy(() => import('views/order/create-order')),
        authority: [],
    },
    {
        key: 'menu.order-detail',
        path: `/delivery-order/detail`,
        component: React.lazy(() => import('views/order/order-detail')),
        authority: [],
    },
    {
        key: 'menu.customer-create',
        path: `/delivery-customer/create`,
        component: React.lazy(() => import('views/customer/create-customer')),
        authority: [],
    },
    {
        key: 'menu.customer',
        path: '/delivery-customer',
        component: React.lazy(() =>
            import('views/customer')
        ),
        authority: [],
    },
]
