// chat-list-services.ts
import { getListChatListRepository } from "./chat-list-repository";

export type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function getListChatListServices()/* : Promise<ServiceResult<Chat[]>> */ {
  try {
    const { data } = await getListChatListRepository();
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return { success: false, error: message };
  }
}
