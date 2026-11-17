export interface ClientService {
  exists(clientId: string): Promise<boolean>;
}