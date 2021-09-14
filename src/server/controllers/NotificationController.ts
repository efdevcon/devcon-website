import { Request, Response } from 'express'
import webPush from 'web-push';
import { PushNotification } from 'src/types/PushNotification'
import { INotificationRepository } from '../repositories/interfaces/INotificationRepository'
import { IUserAccountRepository } from '../repositories/interfaces/IUserAccountRepository'

require('dotenv').config();

webPush.setVapidDetails(
  'mailto:devcon-website@ethereum.org',
  process.env.VAPID_PUBLIC,
  process.env.VAPID_PRIVATE
);

export class NotificationController {
  private _repository: INotificationRepository
  private _userRepository: IUserAccountRepository

  constructor(repository: INotificationRepository, userRepository: IUserAccountRepository) {
    this._repository = repository
    this._userRepository = userRepository

    setInterval(() => {
      this.flushNotifications()
    }, 1000 * 3600);
  }

  private async unsubscribe(userID: string) {
    await this._userRepository._model.findOneAndUpdate({ _id: userID }, { $unset: { push_notification: 1 }}, { upsert: true }); // Remove upsert when accounts are ready; need to create a dummy user to persist the subscription to for now
  }

  private async subscribe(userID: string, subscription: any ) {
    try {
      await this._userRepository._model.findOneAndUpdate({ _id: userID }, { $set: { push_notification: subscription }}, { upsert: true }); // Remove upsert when accounts are ready; need to create a dummy user to persist the subscription to for now
    } catch(e) {
      console.error(e, 'Subscription failed');

      throw e;
    }
  }

  private async sendMessage(userID: string, subscription: any) {
    try {
      webPush.sendNotification(subscription, 'Hello from NotificationController');

      console.log('Push Application Server - Notification sent to ' + subscription.endpoint);
    } catch(e) {
      console.error(e, 'Send Message Failed - Cancelling subscription');

      this.unsubscribe(userID);
    }
  }

  private async flushNotifications() {

  }

  public async createNotification(req: Request, res: Response) {
    try {
      await this._repository.create({ content: { title: 'Testing PWA Push notifications', message: 'Lorem ipsum message body etc' }, global: true });

      res.status(200).send({ code: 200, message: 'OK', data: 'Subscribed' })
    } catch (e) {
      console.error(e)
      res.status(500).send({ code: 500, message: 'Yikes' })
    }
  }

  public async createSubscription(req: Request, res: Response) {
    // const userID = req.user as any;

    console.log(req.user, req.body, 'req user/body');

    res.status(200).send({ code: 200, message: 'OK', data: 'Subscribed' })

    // try {
    //   // await this._userRepository.create({ _id: 'test1234' });
    //   // await this._repository.update({ _id: 'test1234' }, req.body);

    //   res.status(200).send({ code: 200, message: 'OK', data: 'Subscribed' })
    // } catch (e) {
    //   console.error(e)
    //   res.status(500).send({ code: 500, message: 'Yikes' })
    // }
  }
}
