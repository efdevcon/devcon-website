import { Request, Response, NextFunction } from 'express';
import Web3Strategy from 'passport-web3';

const addresses = ['0x0b046f9e580ffe534ebae659d1fce83928793ff6', '0x791c398792a43de1519147c0103815693181fc45']

const onAuth = (address: string, done: any) => {
  try {
    const user = addresses.find(i => i === address);

    if (user) {
      done(null, user);
    }
    else {
      done(null, false, { message: 'User not found.' })
    }
  }
  catch (e) {
    console.error(e)
    done(new Error('Unexpected error.'))
  }
};

export const web3Strategy = new Web3Strategy(onAuth);

export const serializeUser = (user: any, done: any) => {
  // return uuid, adress 
  done(null, user);
}

export const deserializeUser = (user: any, done: any) => {
  // get profile info, based on uuid, address 
  done(null, user);
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => { 
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.status(401).send({ code: 401, message: `Not authorized.` });
  }
}
