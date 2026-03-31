// chat-list-services.ts

import { getListChatMessagesRepository } from "./chat-conversation-repository";

export type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function getListChatMessagesServices()/* : Promise<ServiceResult<Chat[]>> */ {
  try {
    const { data } = await getListChatMessagesRepository();
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return { success: false, error: message };
  }
}
