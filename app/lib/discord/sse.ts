export interface SSECallbacks<T> {
  onMessage: (data: T) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
}

export class SSEManager<T = unknown> {
  private eventSource: EventSource | null = null;
  private url: string = "";
  private callbacks: SSECallbacks<T> | null = null;
  private retryDelay: number = 1000;
  private maxRetryDelay: number = 30000;
  private retryCount: number = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private destroyed: boolean = false;

  connect(url: string, callbacks: SSECallbacks<T>): void {
    this.url = url;
    this.callbacks = callbacks;
    this.destroyed = false;
    this.createConnection();
  }

  private createConnection(): void {
    if (this.destroyed) return;

    this.close();

    try {
      this.eventSource = new EventSource(this.url);

      this.eventSource.onopen = () => {
        this.retryDelay = 1000;
        this.retryCount = 0;
        this.callbacks?.onOpen?.();
      };

      this.eventSource.onmessage = (event: MessageEvent) => {
        try {
          const parsed = JSON.parse(event.data) as T;
          this.callbacks?.onMessage(parsed);
        } catch {
          this.callbacks?.onMessage(event.data as unknown as T);
        }
      };

      this.eventSource.onerror = (event: Event) => {
        this.callbacks?.onError?.(event);
        this.scheduleReconnect();
      };
    } catch {
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect(): void {
    this.close();

    if (this.destroyed) return;

    const delay = Math.min(
      this.retryDelay * Math.pow(2, this.retryCount),
      this.maxRetryDelay
    );
    this.retryCount++;

    const jitter = delay * (0.5 + Math.random() * 0.5);

    this.reconnectTimer = setTimeout(() => {
      if (!this.destroyed) {
        this.createConnection();
      }
    }, jitter);
  }

  close(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.eventSource) {
      this.eventSource.onopen = null;
      this.eventSource.onmessage = null;
      this.eventSource.onerror = null;
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  destroy(): void {
    this.destroyed = true;
    this.close();
    this.callbacks = null;
  }
}
