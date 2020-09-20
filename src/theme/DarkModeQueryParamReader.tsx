import { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { parse } from 'qs'

export default function DarkModeQueryParamReader({ location: { search } }: RouteComponentProps): null {  

  useEffect(() => {
    if (!search) return
    if (search.length < 2) return

    const parsed = parse(search, {
      parseArrays: false,
      ignoreQueryPrefix: true
    })

    const theme = parsed.theme

    if (typeof theme !== 'string') return

  }, [search])

  return null
}
