// chat-list-repository.ts
export async function getListChatMessagesRepository() {
  const response = await fetch("/api/chat-messages-list/get");

  if (!response.ok) {
    throw new Error(`Erro ao buscar conversas: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
