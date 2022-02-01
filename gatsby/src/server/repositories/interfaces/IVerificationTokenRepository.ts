import { VerificationToken } from 'src/types/VerificationToken'
import { IRepository } from './IRepository'

export interface IVerificationTokenRepository extends IRepository<VerificationToken> {
    findValidVerificationToken(identifier: string, nonce: number): Promise<VerificationToken | undefined>
}
