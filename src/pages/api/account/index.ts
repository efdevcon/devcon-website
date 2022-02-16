import { NextApiRequest, NextApiResponse } from 'next'
import { UserAccountRepository } from "server/repositories/UserAccountRepository"
import { withSessionRoute } from "server/withIronSession"
import { UserAccount } from 'types/UserAccount'

const repo = new UserAccountRepository()

export default withSessionRoute(async function route(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method, '/api/account')
    
    if (req.method === 'GET') {
        return get(req, res)
    }

    if (req.method === 'PUT') {
        return put(req, res)
    }

    if (req.method === 'DELETE') {
        return del(req, res)
    }
})

async function get(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await repo.findOne(req.session.userId)
        if (data) {
            return res.status(200).send({ code: 200, message: '', data: data })
        }
    } catch (e) {
        console.error(e)
    }

    return res.status(500).send({ code: 500, message: 'Unable to get user account.' })
}

async function put(req: NextApiRequest, res: NextApiResponse) {
    try {
        const paramId: string = JSON.stringify(req.params.id)
        const userId: string = JSON.stringify(req.session.userId)
        const account = req.body?.account as UserAccount

        if (!account) {
            return res.status(400).send({ code: 400, message: 'User account not provided.' })
        }

        if (paramId !== userId) {
            return res.status(405).send({ code: 405, message: 'Not allowed to update user account.' })
        }

        if (paramId === userId) {
            const updated = await repo.update(paramId, account)
            if (updated) {
                return res.status(200).send({ code: 200, message: 'OK' })
            }

            return res.status(404).send({ code: 404, message: 'User account not found.' })
        }
    } catch (e) {
        console.error(e)
    }

    return res.status(500).send({ code: 500, message: 'Unable to update user account.' })
}

async function del(req: NextApiRequest, res: NextApiResponse) {
    try {
        const paramId: string = JSON.stringify(req.params.id)
        const userId: string = JSON.stringify(req.session.userId)

        if (paramId !== userId) {
            return res.status(405).send({ code: 405, message: 'Not allowed to delete user account.' })
        }

        if (paramId === userId) {
            const deleted = await repo.delete(paramId)
            if (deleted) {
                req.session.destroy()
                return res.status(200).send({ code: 200, message: 'OK' })
            }

            return res.status(404).send({ code: 404, message: 'User account not found.' })
        }
    } catch (e) {
        console.error(e)
    }

    return res.status(500).send({ code: 500, message: 'Unable to delete user account.' })
}
