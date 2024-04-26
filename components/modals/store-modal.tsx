"use client"
import { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(1),
})

export const StoreModal = () => {
  const storeModal = useStoreModal()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      setLoading(true)

      const { data } = await axios.post('/api/stores', values)

      window.location.assign(`/${data.id}`)

    } catch (error) {
      toast.error("Deu errado irmão")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="create store"
      description="add a new store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-4 pb-4">
          <Form
            {...form}
          >
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='E-Commerce'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant={'outline'}
                  onClick={storeModal.onClose}>
                  Cancel
                </Button>
                <Button disabled={loading} type='submit'>Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}