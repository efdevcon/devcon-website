import makeBlockie from "ethereum-blockies-base64"
import { useEffect } from "react"
import { useAccountContext } from "src/context/account-context"
import { getDefaultProvider } from "src/utils/web3"
import { useActiveAddress } from "./useActiveAddress"
import defaultImage from 'src/assets/images/account_circle.png'
import { useSessionStorage } from "./useSessionStorage"
import { isEmail } from "src/utils/validators"

const defaultValue = { type: '', name: '', url: defaultImage, status: 'Loading' }

export function useAvatar() {
    const context = useAccountContext()
    const activeAddress = useActiveAddress()
    const [avatar, setAvatar] = useSessionStorage(activeAddress, defaultValue)

    useEffect(() => {
        async function getAvatar() {
            if (!activeAddress) {
                setAvatar({...defaultValue, status: 'Loading'})
                return
            }
            
            const item = window.sessionStorage.getItem(activeAddress)
            if (item) { 
                const avatar = JSON.parse(item)
                setAvatar(avatar)
                return
            }

            if (isEmail(activeAddress)) {
                setAvatar({
                    type: 'EMAIL',
                    name: activeAddress,
                    url: makeBlockie(activeAddress),
                    status: 'Connected'
                })
                return
            }
            
            const provider = context.provider ?? getDefaultProvider()
            const name = await provider.lookupAddress(activeAddress)
            if (!name) {
                setAvatar({
                    type: 'ETHEREUM',
                    name: activeAddress,
                    url: makeBlockie(activeAddress),
                    status: 'Connected'
                })
                return
            }

            const resolver = await provider.getResolver(name)
            const ensAvatar = await resolver?.getAvatar()
            if (ensAvatar?.url) {
                setAvatar({
                    type: 'ETHEREUM',
                    name: name,
                    url: ensAvatar.url,
                    status: 'Connected'
                })
            } else {
                setAvatar({
                    type: 'ETHEREUM',
                    name: activeAddress,
                    url: makeBlockie(activeAddress),
                    status: 'Connected'
                })
            }
        }

        getAvatar()
    }, [activeAddress])

    return avatar
}
