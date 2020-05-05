import { useLocation } from "react-router-dom";

export function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search)
}

export function updateOrAppendQuery(currentQuery: string, param: string, value: string): string {
  if(currentQuery.length > 0) {
    if(currentQuery.includes(param)) {
      return currentQuery.replace(RegExp(`${param}=\\w*`), `${param}=${value}`)
    }
    else {
      return `${currentQuery}&${param}=${value}`
    }
  }

  return `?${param}=${value}`
}