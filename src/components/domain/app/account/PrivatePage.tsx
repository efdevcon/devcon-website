import { useAccountContext } from "context/account-context"
import { useRouter } from "next/router"
import { Component } from "react"

export const PrivatePage = (props: any) => {
    const router = useRouter()
    const accountContext = useAccountContext()
    const loggedIn = !!accountContext.account
  
    if (!loggedIn && accountContext.loading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
  
    if (!loggedIn && location?.pathname !== `/app/login`) {
        router.push('/app/login' + location?.search)
        return null
    }
  
    return props.children || <Component {...props} />
  }
  