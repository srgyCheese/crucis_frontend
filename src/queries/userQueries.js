import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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

export const useUsers = () =>
  useInfiniteQuery({
    queryKey: ['users'],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get(`/users`, {
        params: {
          page: pageParam
        }
      })

      return data
    },
    getNextPageParam: (lastPage, pages) => lastPage.meta.current_page + 1
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

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await api.delete(`/users/${id}`)

      queryClient.invalidateQueries(['users'])

      return data
    }
  })
}