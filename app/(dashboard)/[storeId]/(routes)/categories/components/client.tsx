"use client"
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { CategoryColumn, columns } from './colums'

import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'


interface CategoryClientProps {
  data: CategoryColumn[]
}

export const CategoryClient = ({
  data
}: CategoryClientProps) => {
  const params = useParams()
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description='Manage categories for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
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
      <Heading title="API" description='API calls for Categories' />
      <Separator />
      <ApiList entityIdName='categoryId' entityName='categories' />
    </>
  )
}

