import { WEBSOCKET_URL } from "../../../../config";


class Socket {
  protected websocketBaseURL: string = WEBSOCKET_URL;
  private socket: WebSocket | null;
  id: string;

  constructor() {
    this.socket = null;
    this.id = "";
  }

  connect(path: string): void {
    const url = `${this.websocketBaseURL}${path}`

    if (!this.socket) {
      this.socket = new WebSocket(url);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  send(message: any): void {
    if (this.socket) {
      this.socket.send(JSON.stringify(message));
    }
  }

  on(eventName: string, callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.addEventListener(eventName, callback);
    }
  }

  close(): void {
    this.socket?.close()
  }

}

export { Socket };