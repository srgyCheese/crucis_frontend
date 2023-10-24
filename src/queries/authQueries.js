import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '~/lib/axios'
import { useOptimisticQueryUpdate } from '../helpers/useOptimisticQueryUpdate'

export const useLogin = () =>
  useMutation({
    mutationFn: async body => {
      const { data } = await api.post('/login', body)

      return data
    }
  })

export const useRegister = () =>
  useMutation({
    mutationFn: async body => {
      const { data } = await api.post('/register', body)

      return data
    }
  })

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    enabled: false,
    queryFn: async () => {
      const { data } = await api.get('/profile')

      return data
    }
  })

export const useLogout = () =>
  useMutation({
    mutationFn: async () => {
      const { data } = await api.delete('/logout')

      return data
    }
  })


export const useEditProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body) => {
      const { data } = await api.put(`/profile`, body)

      queryClient.setQueryData(['profile'], data)
      queryClient.setQueryData(['users', data.id], data)

      return data
    }
  })
}