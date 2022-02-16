import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiHandler } from "next"
import { SESSION_CONFIG } from "utils/server"

export function withSessionRoute(handler: NextApiHandler) {
    return withIronSessionApiRoute(handler, SESSION_CONFIG)
}