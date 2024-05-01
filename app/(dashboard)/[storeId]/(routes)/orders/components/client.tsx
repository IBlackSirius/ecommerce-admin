"use client"
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { OrderColumn, columns } from './colums'

import React from 'react'
import { DataTable } from '@/components/ui/data-table'


interface OrderClientProps {
  data: OrderColumn[]
}

export const OrderClient = ({
  data
}: OrderClientProps) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description='Manage orders for your store'
      />
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey='products'
      />
    </>
  )
}

