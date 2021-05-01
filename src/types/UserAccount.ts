export interface UserAccount {
    _id?: any
    username?: string
    email?: string
    addresses: Array<string>
    disabled: boolean
    created: Date
}