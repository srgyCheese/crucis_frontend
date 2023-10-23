import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from '~/lib/axios'

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async body => {
      const { data } = await api.post('/posts/=', body)

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