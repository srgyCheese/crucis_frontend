import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from '~/lib/axios'

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

export const usePosts = () =>
  useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get('/posts', {
        params: {
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
    queryKey: ['posts', id],
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
