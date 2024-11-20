type EventHandler = (...args: any[]) => void;

interface EventBus {
  /**
   * 이벤트 핸들러 등록
   * @param key - 이벤트 이름
   * @param handler - 이벤트가 발생했을 때 호출할 함수
   * @returns 구독 해제 함수
   *
   * 사용 예:
   * const unsubscribe = EventBus.on("eventName", (data) => {
   *   console.log("Event received:", data);
   * });
   * 
   * // 나중에 구독 해제
   * unsubscribe();
   */
  on(key: string, handler: EventHandler): () => void;

  /**
   * 이벤트 핸들러 제거
   * @param key - 이벤트 이름
   * @param handler - 제거할 이벤트 핸들러
   *
   * 사용 예:
   * const handler = (data) => console.log("Event received:", data);
   * EventBus.on("eventName", handler);
   * EventBus.off("eventName", handler);
   */
  off(key: string, handler: EventHandler): void;

  /**
   * 이벤트 발생
   * @param key - 이벤트 이름
   * @param payload - 이벤트와 함께 전달할 데이터
   *
   * 사용 예:
   * EventBus.emit("eventName", { key: "value" });
   */
  emit(key: string, ...payload: any[]): void;
}

export const createEventBus = (): EventBus => {
  const events: Record<string, EventHandler[]> = {};

  return {
    on(key, handler) {
      if (!events[key]) events[key] = [];
      events[key].push(handler);

      return () => this.off(key, handler);
    },

    off(key, handler) {
      if (!events[key]) return;
      events[key] = events[key].filter((h) => h !== handler);
    },

    emit(key, ...payload) {
      if (!events[key]) return;
      events[key].forEach((handler) => handler(...payload));
    },
  };
};

// 전역 EventBus 생성
const EventBus = createEventBus();
export default EventBus;

/**
 * 사용 방법:
 * 
 * // 1. 이벤트 구독 (핸들러 등록)
 * const unsubscribe = EventBus.on("userLoggedIn", (userData) => {
 *   console.log("User logged in:", userData);
 * });
 * 
 * // 2. 이벤트 발생 (데이터 전달 가능)
 * EventBus.emit("userLoggedIn", { id: 1, name: "John Doe", email: "john.doe@example.com" });
 * 
 * // 3. 이벤트 구독 해제
 * unsubscribe();
 * 
 * // 특정 핸들러 제거
 * const handler = (notification) => console.log("Notification received:", notification);
 * EventBus.on("newNotification", handler);
 * EventBus.off("newNotification", handler);
 * 
 * // 더 복잡한 데이터 전달 예제
 * const complexHandler = (eventName, data) => {
 *   console.log(`Received event: ${eventName} with data:`, data);
 * };
 * 
 * EventBus.on("complexEvent", complexHandler);
 * EventBus.emit("complexEvent", "EventName", { nested: { key: "value" }, items: [1, 2, 3] });
 * 
 */
