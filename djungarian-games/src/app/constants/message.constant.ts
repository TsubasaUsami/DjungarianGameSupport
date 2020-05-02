/**
 * メッセージID
 */
export enum MessageId {
  /** 予期せぬエラーが発生しました。 */
  MSG_ID_0001,
}

export interface IMessage {
  id: MessageId;
  level: 'success' | 'info' | 'warning' | 'error';
  text: string;
}

export const MessageList: IMessage[] = [
  { id: MessageId.MSG_ID_0001, level: 'error', text: 'MESSAGE.MSG_ID_0001' },
];
