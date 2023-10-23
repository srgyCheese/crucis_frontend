import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { produce } from "immer"
import api from '~/lib/axios'

const useOptimisticUpdate = () => {
  const queryClient = useQueryClient()

  return (queryK, id, changeFn) => {
    queryClient
      .getQueriesData(queryK)
      .forEach(([queryKey, queryData]) => {
        if (!queryData || queryKey[0] !== queryK[0]) {
          return
        }

        if (Number.isInteger(+queryKey[1])) {
          if (+queryKey[1] == id) {
            queryClient.setQueryData(queryKey, changeFn(queryData))
          }

          return
        }

        const nextState = produce(queryData, draft => {
          console.log(queryData);
          draft.pages.forEach(({ data }, pageIndex) => {
            const elementIndex = data.findIndex(
              el => el.id == id
            )

            if (elementIndex !== -1) {
              draft.pages[pageIndex].data[elementIndex] = changeFn(
                draft.pages[pageIndex].data[elementIndex]
              )
            }
          })
        })

        queryClient.setQueryData(queryKey, nextState)
      })
  }
}

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
  const updatePost = useOptimisticUpdate()

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
