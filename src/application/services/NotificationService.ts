import { NotificationDTO } from "../dtos/NotificationDTO";
import { NotificationSocketGateway } from "./NotificationSocketGateway";

export class NotificationService {
  private static _instance: NotificationService;
  private _gateway: NotificationSocketGateway;

  private constructor(gateway: NotificationSocketGateway) {
    this._gateway = gateway;
  }

  // Inicialização obrigatória com o gateway
  public static init(gateway: NotificationSocketGateway) {
    if (!this._instance) {
      this._instance = new NotificationService(gateway);
    }
  }

  public static get instance(): NotificationService {
    if (!this._instance) {
      throw new Error(
        "NotificationService não inicializado. Chame NotificationService.init()."
      );
    }
    return this._instance;
  }

  public send(userId: string, notification: NotificationDTO): void {
    this._gateway.sendNotification(userId, notification);
  }
}
