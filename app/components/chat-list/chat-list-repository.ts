// chat-list-repository.ts
export async function getListChatListRepository() {
  const response = await fetch("/api/chat-list/get-all");

  if (!response.ok) {
    throw new Error(`Erro ao buscar chats: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
