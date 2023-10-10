import React, { useEffect, useMemo, useRef } from "react";
import { Avatar, Badge } from "components/ui";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { FiPackage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import useThemeClass from "utils/hooks/useThemeClass";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import { DataTable } from "components/shared";
// import { fetchListOrderByStatus } from "actions/order.actions";
import {
    selectFilterData,
    selectListOrderStatus,
    selectListOrders,
    selectTableData,
    setTableData,
} from "store/delivery_order/orderSlice";
import { fetchListOrderByStatus } from "actions/order.actions";
import { format } from "date-fns";

const inventoryStatusColor = {
    success: {
        label: "giao thành công",
        dotClass: "bg-green-600",
        textClass: "text-green-600",
    },
    wait: {
        label: "Chờ giao",
        dotClass: "bg-blue-500",
        textClass: "text-blue-500",
    },
    delivering: {
        label: "đang giao",
        dotClass: "bg-yellow-500",
        textClass: "text-yellow-500",
    },
    fail: {
        label: "giao thất bại",
        dotClass: "bg-red-500",
        textClass: "text-red-500",
    },
    partial_success: {
        label: "giao một phần",
        dotClass: "bg-green-600",
        textClass: "text-green-600",
    },
    cancel: {
        label: "đã huỷ",
        dotClass: "bg-gray-500",
        textClass: "text-gray-500",
    },
    delay: {
        label: "đơn hẹn",
        dotClass: "bg-gray-500",
        textClass: "text-gray-500",
    },
};

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch();
    const { textTheme } = useThemeClass();
    const navigate = useNavigate();

    // const onEdit = () => {
    //     navigate(`/delivery-order/detail/${row.id}`);
    // };
    const onDetail = () => {
        console.log('------onDetail has work-----', row._id)
        navigate(`/delivery-order/detail`, {
            state: {
            //   store_name: row.name,
              order_id: row._id,
            //   store_code: row.store_code,
            },
        });
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true));
        dispatch(setSelectedProduct(row.id));
    };

    return ( 
        < div className = "flex justify-end text-lg" >
            < span className = { `cursor-pointer p-2 hover:${textTheme}` }
                onClick = { onDetail } 
            >
            < HiOutlinePencil />
            </span>{" "} <span className = "cursor-pointer p-2 hover:text-red-500"
                onClick = { onDelete } >
            <HiOutlineTrash />
            </span>{" "} 
        </div>
    );
};

const ProductColumn = ({ row }) => {
    const avatar = row.img ? ( 
        <Avatar src = { row.img } />
        ) : ( 
            <Avatar icon = {< FiPackage />}/>
        );

    return ( 
        <div className = "flex items-center" > { " " } { avatar } { " " } 
            <span className = { `ml-2 rtl:mr-2 font-semibold` } > { row.name } </span>{" "} 
        </div>
    );
};

const OrderTable = ({ status }) => {
    const tableRef = useRef(null);

    const dispatch = useDispatch();

    const { pageIndex, pageSize, sort, query, total } =
    useSelector(selectTableData);
    // const filterData = useSelector(
    //     (state) => state.salesProductList.data.filterData
    // )
    const filterData = useSelector(selectFilterData);
    const loading = useSelector(selectListOrderStatus);

    const data = useSelector(selectListOrders);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [pageIndex, pageSize, status]);
    // pageIndex, pageSize, sort
    useEffect(() => {
        if (tableRef) {
            tableRef.current.resetSorting();
        }
    }, [filterData]);

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }), [pageIndex, pageSize, sort, query, total]
    );

    console.log(total);
    const fetchData = () => {
        const params = {
            offset: pageIndex * pageSize - pageSize,
            limit: pageSize,
            status: status,
        };
        // const offset = pageIndex*pageSize - pageSize
        // const limit = pageSize
        // dispatch(fetchListStore({ offset, limit, sort, query, filterData }))
        dispatch(fetchListOrderByStatus(params));
    };
    console.log(fetchData);
    const columns = useMemo(
        () => [{
                header: "Tên Khách Hàng",
                accessorKey: "cust_name",
                sortable: true,
            },
            {
                header: "Số điện thoại",
                accessorKey: "cust_phone",
                sortable: true,
            },
            {
                header: "Phí giao hàng",
                accessorKey: "fee_ship",
                cell: (props) => {
                    const { fee_ship } = props.row.original;
                    const formatFee = fee_ship.toLocaleString();
                    return <span> { formatFee } </span>;
                },
                sortable: true,
            },
            {
                header: "Tổng số tiền",
                accessorKey: "total_amount",
                cell: (props) => {
                    const { total_amount } = props.row.original;
                    const formatAmount = total_amount.toLocaleString();
                    return <span> { formatAmount } </span>;
                },
                sortable: true,
            },

            {
                header: "Địa chỉ",
                accessorKey: "address",
                sortable: true,
            },
            {
                header: "Trạng thái",
                accessorKey: "status",
                cell: (props) => {
                    const { status } = props.row.original;
                    return ( 
                        <div className = "flex items-center gap-2" >
                            <Badge className = { inventoryStatusColor[status].dotClass }/>{" "} 
                            <span className = { `capitalize font-semibold ${inventoryStatusColor[status].textClass}` }>
                            { inventoryStatusColor[status].label } { " " } 
                            </span>{" "} 
                        </div>
                    );
                },
            },
            {
                header: "Thời gian khởi tạo",
                accessorKey: "created_time",
                cell: (props) => {
                    const { created_time } = props.row.original;
                    const formattedDateTime = format(
                        new Date(created_time * 1000),
                        "dd/MM/yyyy HH:mm:ss"
                    );
                    return <span > { formattedDateTime } </span>;
                },
                sortable: true,
            },
            {
                header: "",
                id: "action",
                cell: (props) => <ActionColumn row = { props.row.original } />,
            },
        ], []
    );

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData);
        newTableData.pageIndex = page;
        dispatch(setTableData(newTableData));
    };

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData);
        newTableData.pageSize = Number(value);
        newTableData.pageIndex = 1;
        dispatch(setTableData(newTableData));
    };

    const onSort = (sort, sortingColumn) => {
        const newTableData = cloneDeep(tableData);
        newTableData.sort = sort;
        dispatch(setTableData(newTableData));
    };

    return ( 
        <>
            <
            DataTable ref = { tableRef }
            columns = { columns }
            data = { data }
            skeletonAvatarColumns = {
                [0] }
            skeletonAvatarProps = {
                { className: "rounded-md" } }
            loading = { loading }
            pagingData = { tableData }
            onPaginationChange = { onPaginationChange }
            onSelectChange = { onSelectChange }
            onSort = { onSort }
            />{" "} { /* <ProductDeleteConfirmation /> */ } { " " } 
        </>
    );
};

export default OrderTable;