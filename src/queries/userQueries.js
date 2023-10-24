import { useMutation, useQuery } from "@tanstack/react-query"
import api from '../lib/axios'
import { useOptimisticQueryUpdate } from "../helpers/useOptimisticQueryUpdate"

export const useUser = ({ id }) =>
  useQuery({
    queryKey: ['users', +id],
    queryFn: async () => {
      const { data } = await api.get(`/users/${id}`)

      return data
    }
  })

export const useEditUser = () => {
  const updatePost = useOptimisticQueryUpdate()

  return useMutation({
    mutationFn: async ({ userId, ...body }) => {
      const { data } = await api.put(`/users/${userId}`, body)

      updatePost(['users'], +userId, () => data)

      return data
    }
  })
}