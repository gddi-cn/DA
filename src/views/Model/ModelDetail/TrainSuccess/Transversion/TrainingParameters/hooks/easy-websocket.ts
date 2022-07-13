/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { throttle } from 'lodash'

export function easyWebSocket({
  ws_url,
  heartbeatinterval,
  heartbeattick,
  onopen,
  onmessage,
}: {
  ws_url: string;
  heartbeatinterval?: number;
  heartbeattick?: (ws: WebSocket) => void;
  onopen?: (ws: WebSocket, e: Event) => void;
  onmessage?: (ws: WebSocket, e: MessageEvent) => void;
}) {
  const ws_ctx: {
    ws?: WebSocket;

    keep_connected: boolean;

    heart_timer_id?: ReturnType<typeof setInterval>;
  } = { keep_connected: true };

  const connectWs = () => {
    try {
      const ws = new WebSocket(ws_url);
      console.log('easyWebSocket connect to:', ws_url);
      ws.onopen = (e) => {
        if (
          heartbeattick &&
          heartbeatinterval !== undefined &&
          heartbeatinterval > 0
        ) {
          ws_ctx.heart_timer_id = setInterval(
            () => ws.readyState === ws.OPEN && heartbeattick(ws),
            heartbeatinterval
          );
        }

        onopen && onopen(ws, e);
      };
      ws.onclose = (e) => {
        if (ws_ctx.keep_connected) {
          throttle(() => connectWs(), 5000)
        }
        console.log('easyWebSocket reconnect', ws_ctx.keep_connected, e);
      };
      ws.onerror = (e) => {
        console.log(e)
      };
      ws.onmessage = (e) => onmessage && onmessage(ws, e);
      ws_ctx.ws = ws;
    } catch (error) {
      console.warn('easyWebSocket', error);
    }
  };

  connectWs();

  return () => {
    console.log('ws lifecycle release', ws_url);
    ws_ctx.keep_connected = false;
    ws_ctx.ws && ws_ctx.ws.close();

    // clear heart beat
    ws_ctx.heart_timer_id && clearInterval(ws_ctx.heart_timer_id);
  };
}
