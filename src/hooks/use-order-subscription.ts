import { env } from '@/env';
import { Order } from '@/schemas/order';
import { WebSocketMessage } from '@/schemas/websocket-message';
import { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export interface Opts {
  orderId: string | null;
  onCreate?: (order: Order) => void;
  onUpdate?: (order: Order) => void;
}

export const useOrderSubscription = ({ orderId, onCreate, onUpdate }: Opts) => {
  const { readyState, lastJsonMessage, sendMessage } = useWebSocket(
    env.NEXT_PUBLIC_WEBSOCKET_URL,
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('ready');

      sendMessage(
        JSON.stringify({
          action: 'subscribe',
          tenant_id: env.NEXT_PUBLIC_TENANT_ID,
          order_id: orderId,
        }),
      );
    }
  }, [sendMessage, readyState, orderId]);

  useEffect(() => {
    if (!lastJsonMessage) return;

    const message = WebSocketMessage.parse(lastJsonMessage);
    console.log('MESSAGE: ', message);

    switch (message.kind) {
      case 'subscription_success':
        console.log('subscribed');
        break;

      case 'order_created':
        onCreate?.(message.data);
        break;

      case 'order_status_updated':
        onUpdate?.(message.data);
        break;
    }
  }, [lastJsonMessage, onCreate, onUpdate]);
};
