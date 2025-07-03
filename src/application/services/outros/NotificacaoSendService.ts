import { INotificacaoRepository } from "@/domain/repositories/outros/INotificacaoRepository";
import { gerarUUID } from "@/shared/utils/gerarUUID";
import { NotificacaoSocketGateway } from "./NotificacaoSocketGateway";
import { Notificacao } from "@/domain/entities/outros/Notificacao";
import { NotificacaoEnviarDTO } from "@/application/dtos/outros/NotificacaoEnviarDTO";

export class NotificacaoSendService {
  private static _instance: NotificacaoSendService;

  private constructor(
    private _gateway: NotificacaoSocketGateway,
    private _repository: INotificacaoRepository
  ) {}

  // Inicialização obrigatória com o gateway
  public static init(
    gateway: NotificacaoSocketGateway,
    repository: INotificacaoRepository
  ) {
    if (!this._instance) {
      this._instance = new NotificacaoSendService(gateway, repository);
    }
  }

  public static get instance(): NotificacaoSendService {
    if (!this._instance) {
      throw new Error(
        "NotificacaoSendService não inicializado. Chame NotificacaoSendService.init()."
      );
    }
    return this._instance;
  }

  public send(notification: NotificacaoEnviarDTO): void {
    const newNotification: Notificacao = {
      id: gerarUUID(),
      descricao: notification.descricao,
      tipo: notification.tipo,
      titulo: notification.titulo,
      lida: false,
      dataEnvio: new Date(),
    };
    this._repository.inserir(newNotification);
    this._gateway.sendNotification(newNotification);
  }
}
