import { useMutation, useQuery } from '@tanstack/react-query'
import api from '~/lib/axios'

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

export const useUser = () =>
  useQuery({
    queryKey: ['user'],
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
