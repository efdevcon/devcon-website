import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { IUserAccountRepository } from '../repositories/interfaces/IUserAccountRepository';

export class UserController {
  private _repository: IUserAccountRepository

  constructor(repository: IUserAccountRepository) {
    this._repository = repository
  }

  public async Nonce(req: Request, res: Response) {
    try {
      const nonce = Math.floor(Math.random() * (99999 - 10000) ) + 10000;
      const data = `Sign this message to prove you have access to this wallet. This won't cost you anything.\n\nSecurity code (you can ignore this): ${nonce}`

      req.session.nonce = data;
      res.status(200).send({ code: 200, message: '', data: data });
    } catch (e) {
      console.error(e)
      res.status(500).send({ code: 500, message: `Internal server error` });
    }
  }

  public async Login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('web3', (error, user, info) => {
      if (error || !user) {
        res.status(400).send({ code: 400, message: info.message ?? `Bad request` });
      } else {
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.status(200).send({ code: 200, message: '', data: user });
        });
      }
    })(req, res, next);
  }

  public async Logout(req: Request, res: Response) {
    try {
      req.logout();
      res.status(200).send({ code: 200, message: 'Logout successful'});
    } catch (e) {
      console.error(e)
      res.status(500).send({ code: 500, message: `Internal server error` });
    }
  }

  public async Profile(req: Request, res: Response) {
    try {
      const data = await this._repository.findOne(req.user)

      res.status(200).send({ code: 200, message: '', data: data });
    }
    catch (e) {
      console.error(e)
      res.status(500).send({ code: 500, message: `Couldn't fetch profile` });
    }
  }
}
