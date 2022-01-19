import makeBlockie from "ethereum-blockies-base64"
import { getDefaultProvider } from "ethers"
import { useEffect, useState } from "react"
import { useAccountContext } from "src/context/account-context"
import { useActiveAddress } from "./useActiveAddress"

const defaultValue = { name: '', url: '' }

export function useAvatar() {
    const context = useAccountContext()
    const activeAddress = useActiveAddress()
    const [avatar, setAvatar] = useState(defaultValue)

    useEffect(() => {
        async function getAvatar() { 
            if (!context.account) {
                setAvatar(defaultValue)
                return
            }
            
            const provider = context.provider ?? getDefaultProvider()
            const name = await provider.lookupAddress(activeAddress)
            if (!name) {
                setAvatar({
                    name: activeAddress,
                    url: makeBlockie(activeAddress)
                })
                return
            }
        
            const resolver = await provider.getResolver(name)
            const ensAvatar = await resolver?.getAvatar()
            if (ensAvatar?.url) {
                setAvatar({
                    name: name,
                    url: ensAvatar.url
                })
            } else {
                setAvatar({
                    name: activeAddress,
                    url: makeBlockie(activeAddress)
                })
            } 
        }

        getAvatar()
    }, [context.provider, activeAddress])

    return avatar
}
