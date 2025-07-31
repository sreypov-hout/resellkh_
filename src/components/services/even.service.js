/**
 * A simple, shared event bus for cross-component communication.
 * This allows components to "listen" for events dispatched from anywhere in the app.
 */
export const eventService = {
  on: (event, callback) => {
    if (typeof document !== 'undefined') {
      document.addEventListener(event, callback);
    }
  },
  dispatch: (event, data) => {
    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent(event, { detail: data }));
    }
  },
  remove: (event, callback) => {
    if (typeof document !== 'undefined') {
      document.removeEventListener(event, callback);
    }
  },
};