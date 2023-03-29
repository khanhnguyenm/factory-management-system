const eventBus = {

  // Register Event Listener
  on(event: any, callback: any): void {
    document.addEventListener(event, (e) => callback(e.detail));
  },

  // Dispath new Event Listener
  dispatch(event: any, data: any): void {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },

  // Remove Event Listener
  remove(event: any, callback: any): void {
    document.removeEventListener(event, callback);
  },
};

export default eventBus;