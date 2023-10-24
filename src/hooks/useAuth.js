import api from '~/lib/axios'
import { useEffect, useState } from 'react'
import { useLogout, useProfile } from '../queries/authQueries'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const useAuth = () => {
  const queryClient = useQueryClient()

  const authQuery = useQuery({
    queryKey: ['auth'],
    placeholderData: {
      token: null,
      isReady: false
    }
  })

  const { token, isReady } = authQuery.data || {}
  const logoutMutation = useLogout()
  const userQuery = useProfile()

  const logout = () => {
    api.defaults.headers.common.Authorization = null
    localStorage.removeItem('token')
    queryClient.setQueryData(['auth'], old => ({
      ...old,
      token: null
    }))
    
    queryClient.setQueryData(['profile'], null)
  }

  const login = async token => {
    try {
      queryClient.setQueryData(['auth'], old => ({
        ...old,
        token: token
      }))

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      api.interceptors.response.use(
        response => response,
        error => {
          if (error.response.status === 401) {
            logout()
          }

          return Promise.reject(error)
        }
      )

      localStorage.setItem('token', token)

      await userQuery.refetch()

      queryClient.setQueryData(['auth'], old => ({
        ...old,
        isReady: true
      }))
    } catch (e) {
      queryClient.setQueryData(['auth'], old => ({
        ...old,
        isReady: true
      }))
    }
  }

  useEffect(() => {
    if (token) {
      return
    }

    const newToken = localStorage.getItem('token')

    if (newToken) {
      login(newToken)
    } else {
      queryClient.setQueryData(['auth'], old => ({
        ...old,
        isReady: true
      }))
    }
  }, [])

  return {
    token,
    isAuthenticated: !!token && !!userQuery.data?.id,
    login,
    logout: () => {
      logoutMutation.mutate(null, {
        onSuccess: logout
      })
    },
    isReady,
    user: userQuery.data,
    isAdmin: userQuery.data ? userQuery.data.role_id === 2 : false
  }
}

export default useAuth