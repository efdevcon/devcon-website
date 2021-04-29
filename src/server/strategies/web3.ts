import { Request, Response, NextFunction } from 'express';
import Web3Strategy from 'passport-web3';

const onAuth = (address: string, done: any) => {
  try {
    // Find User Profile
    // const user = addresses.find(i => i === address);
    const user = address

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
    next()
  } else {
    res.status(401).send({ code: 401, message: `Not authorized.` });
  }
}
