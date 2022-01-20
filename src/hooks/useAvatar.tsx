import makeBlockie from "ethereum-blockies-base64"
import { useEffect } from "react"
import { useAccountContext } from "src/context/account-context"
import { getDefaultProvider } from "src/utils/web3"
import { useActiveAddress } from "./useActiveAddress"
import defaultImage from 'src/assets/images/account_circle.png'
import { useSessionStorage } from "./useSessionStorage"

const defaultValue = { name: '', url: defaultImage }

export function useAvatar() {
    const context = useAccountContext()
    const activeAddress = useActiveAddress()
    const [avatar, setAvatar] = useSessionStorage(activeAddress, defaultValue)

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
    }, [activeAddress])

    return avatar
}
