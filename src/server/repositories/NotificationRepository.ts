import { PushNotification } from 'types/PushNotification'
import { BaseRepository } from './BaseRepository'
import { INotificationRepository } from './interfaces/INotificationRepository'

export class NotificationRepository extends BaseRepository<PushNotification> implements INotificationRepository {
  constructor() {
    super('Notification')
  }
}
