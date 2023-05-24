import React, { useEffect, useMemo, useRef } from 'react'
import { Avatar, Badge } from 'components/ui'
import { HiOutlinePencil, HiOutlineTrash, HiOutlineUserAdd } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { selectFilterData, selectListStores, selectListStoresStatus, selectTableData, setTableData } from 'store/delivery_store/storeSlice'
import { DataTable } from 'components/shared'
import { fetchListStore } from 'actions/store.actions'
import {format} from 'date-fns'

const inventoryStatusColor = {
    'active': {
        label: 'Active',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    'blocked': {
        label: 'blocked',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/sales/product-edit/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.id))
    }

    const onCreate = () => {
        console.log('---onCreate has work----', row)
        navigate(`/delivery-user/create`, { state: {store_name: row.name, store_id: row._id} })
    }
    
    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onCreate}
            >
                <HiOutlineUserAdd />
            </span>
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const ProductColumn = ({ row }) => {
    const avatar = row.img ? (
        <Avatar src={row.img} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const StoreTable = () => {

    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(selectTableData)
    // const filterData = useSelector(
    //     (state) => state.salesProductList.data.filterData
    // )
    const filterData = useSelector(selectFilterData)
    const loading = useSelector(selectListStoresStatus)
    
    const data = useSelector(selectListStores)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line 
    }, [pageIndex, pageSize])
    // pageIndex, pageSize, sort
    useEffect(() => {
        if (tableRef) {
            tableRef.current.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        const params = {
            offset : pageIndex*pageSize - pageSize,
            limit : pageSize
        }
        // const offset = pageIndex*pageSize - pageSize
        // const limit = pageSize
        // dispatch(fetchListStore({ offset, limit, sort, query, filterData }))
        dispatch(fetchListStore(params))
    }

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row} />
                },
            },
            {
                header: 'Phone',
                accessorKey: 'phone',
                sortable: true,
            },
            {
                header: 'Address',
                accessorKey: 'address',
                sortable: true,
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const { status } = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <Badge
                                className={
                                    inventoryStatusColor[status].dotClass
                                }
                            />
                            <span
                                className={`capitalize font-semibold ${inventoryStatusColor[status].textClass}`}
                            >
                                {inventoryStatusColor[status].label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Created Time',
                accessorKey: 'created_time',
                cell: (props) => {
                    const { created_time } = props.row.original;
                    const formattedDateTime = format(new Date(created_time * 1000), 'dd/MM/yyyy HH:mm:ss');
                    return <span>{formattedDateTime}</span>
                },
                sortable: true,
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort, sortingColumn) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            {/* <ProductDeleteConfirmation /> */}
        </>
    )
}

export default StoreTable
