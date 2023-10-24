import { useQueryClient } from "@tanstack/react-query"
import { produce } from "immer"

export const useOptimisticQueryUpdate = () => {
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