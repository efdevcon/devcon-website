import { useAccountContext } from 'src/context/account-context'

export const useActiveAddress = (): string => {
  const context = useAccountContext()

  if (!context.account) {
    return ''
  }

  if (context.account.activeAddress) {
    return context.account.activeAddress
  }

  if (context.account.addresses.length > 0) {
    return context.account.addresses[0]
  }

  if (context.account.email) {
    return context.account.email
  }

  return ''
}
