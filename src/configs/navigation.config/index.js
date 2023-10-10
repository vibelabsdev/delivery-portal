import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from "constants/navigation.constant";

import { ADMIN, STORE } from 'constants/roles.constant'

const navigationConfig = [{
        key: "home",
        path: "/home",
        title: "Trang chủ",
        translateKey: "nav.home",
        icon: "home",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    {
        key: "delivery_store",
        path: "/delivery-store",
        title: "Danh Sách Cửa Hàng",
        translateKey: "nav.delivery_store",
        icon: "collapseMenu",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    {
        key: "collapseMenu",
        path: "",
        title: "Collapse Menu",
        translateKey: "nav.collapseMenu.collapseMenu",
        icon: "collapseMenu",
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [{
                key: "collapseMenu.item1",
                path: "/delivery-order/wait",
                title: "Collapse menu item 1",
                translateKey: "nav.collapseMenu.item1",
                icon: "",
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: "collapseMenu.item2",
                path: "/delivery-order/delivering",
                title: "Collapse menu item 2",
                translateKey: "nav.collapseMenu.item2",
                icon: "",
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: "collapseMenu.item3",
                path: "/delivery-order/success",
                title: "Collapse menu item 2",
                translateKey: "nav.collapseMenu.item3",
                icon: "",
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: "collapseMenu.item4",
                path: "/delivery-order/partial_success",
                title: "Collapse menu item 2",
                translateKey: "nav.collapseMenu.item4",
                icon: "",
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: "collapseMenu.item5",
                path: "/delivery-order/fail",
                title: "Collapse menu item 2",
                translateKey: "nav.collapseMenu.item5",
                icon: "",
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: "collapseMenu.item6",
                path: "/delivery-order/cancel",
                title: "Collapse menu item 2",
                translateKey: "nav.collapseMenu.item6",
                icon: "",
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: "collapseMenu.item7",
                path: "/delivery-order/delay",
                title: "Collapse menu item 2",
                translateKey: "nav.collapseMenu.item7",
                icon: "",
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
   
];

export default navigationConfig;