import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient;

export const connect = () => {
  const socket = new SockJS('/ws');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, () => {
    console.log('Connected to WebSocket');
  });
};

export const disconnect = () => {
  if (stompClient) {
    stompClient.disconnect();
  }
  console.log('Disconnected from WebSocket');
};

export const subscribeToUpdates = (callback) => {
  stompClient.subscribe('/topic/employee-updates', (message) => {
    callback(JSON.parse(message.body));
  });
};