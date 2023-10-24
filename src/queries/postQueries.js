import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { produce } from "immer"
import api from '~/lib/axios'
import { useOptimisticQueryUpdate } from "../helpers/useOptimisticQueryUpdate"

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async body => {
      const { data } = await api.post('/posts', body)

      queryClient.invalidateQueries(['posts'])

      return data
    }
  })
}

export const useEditPost = () => {
  const updatePost = useOptimisticQueryUpdate()

  return useMutation({
    mutationFn: async ({ postId, ...body }) => {
      const { data } = await api.put(`/posts/${postId}`, body)
      
      updatePost(['posts'], +postId, () => data)

      return data
    }
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await api.delete(`/posts/${id}`)

      queryClient.invalidateQueries(['posts'])

      return data
    }
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await api.delete(`/comments/${id}`)

      queryClient.invalidateQueries(['comments'])

      return data
    }
  })
}

export const usePosts = (params) =>
  useInfiniteQuery({
    queryKey: params ? ['posts', params] : ['posts'],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get('/posts', {
        params: {
          ...params,
          page: pageParam
        }
      })

      return data
    },
    getNextPageParam: (lastPage, pages) => lastPage.meta.current_page + 1
  })

export const usePostComments = ({ postId }) =>
  useInfiniteQuery({
    queryKey: ['comments', { postId }],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get(`/comments`, {
        params: {
          page: pageParam,
          post_id: postId
        }
      })

      return data
    },
    getNextPageParam: (lastPage, pages) => lastPage.meta.current_page + 1
  })

export const usePost = ({ id }) =>
  useQuery({
    queryKey: ['posts', +id],
    queryFn: async () => {
      const { data } = await api.get(`/posts/${id}`)

      return data
    }
  })

export const useAddComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async body => {
      const { data } = await api.post('/comments', body)

      queryClient.invalidateQueries(['comments'])

      return data
    }
  })
}
