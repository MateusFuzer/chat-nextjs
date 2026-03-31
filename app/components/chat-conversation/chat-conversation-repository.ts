// chat-list-repository.ts
export async function getListChatMessagesRepository() {
  const response = await fetch("/api/chat-messages-list/get");
  if (!response.ok) {
    const {error } = await response.json()
    throw new Error( error.text );
  }

  return response.json();
}
