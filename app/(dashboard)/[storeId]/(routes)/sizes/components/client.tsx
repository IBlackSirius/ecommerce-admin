"use client"
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { SizeColumn, columns } from './colums'

import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'


interface SizesClientProps {
  data: SizeColumn[]
}

export const SizesClient = ({
  data
}: SizesClientProps) => {
  const params = useParams()
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description='Manage sizes for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey='name'
      />
      <Heading title="API" description='API calls for Sizes' />
      <Separator />
      <ApiList entityIdName='sizeId' entityName='sizes' />
    </>
  )
}

