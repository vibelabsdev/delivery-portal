import React, { useMemo, Fragment } from 'react'
import { AdaptableCard } from 'components/shared'
import { Table, Avatar } from 'components/ui'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'
import NumberFormat from 'react-number-format'
import isLastChild from 'utils/isLastChild'

const { Tr, Th, Td, THead, TBody } = Table

const ProductColumn = ({ row }) => {

    return (
        <div className="flex">
            <div className="ltr:ml-2 rtl:mr-2">
                <h6 className="mb-2">{row}</h6>
                
            </div>
        </div>
    )
}

const PriceAmount = ({ amount }) => {
    return (
        <NumberFormat
            displayType="text"
            value={(Math.round(amount * 100) / 100).toFixed(2)}
            prefix={'$'}
            thousandSeparator={true}
        />
    )
}

const OrderProducts = ({ data }) => {

    const FormatPrice = (price) => {
        return price.toLocaleString()
    }

    const columns = useMemo(
        () => [
            {
                header: 'Sản phẩm',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row.product_name} />
                },
            },
            {
                header: 'Giá',
                accessorKey: 'price',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{FormatPrice(row.product_price)}</span>
                },
            },
            {
                header: 'Số lượng',
                accessorKey: 'quantity',
            },
        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <AdaptableCard className="mb-4">
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
        </AdaptableCard>
    )
}

export default OrderProducts
