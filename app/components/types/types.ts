export type Chat = {
  id: string,
  name: string,
  online: boolean,
  color_profile: string,
  text_profile: string,
  lastMessage: string,
  lastMessageDate: string,
  typeLastMessage: string,
  unreadMessages: number,
  isLastMessageFromMe: boolean,
  isRead: boolean,
  photo: string
}