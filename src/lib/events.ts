// Custom event system for real-time updates
export const ENTRY_ADDED_EVENT = 'ENTRY_ADDED';

export function emitEntryAdded(entry: any) {
  const event = new CustomEvent(ENTRY_ADDED_EVENT, { 
    detail: entry 
  });
  window.dispatchEvent(event);
}

export function subscribeToEntries(callback: (entry: any) => void) {
  const handler = (event: any) => callback(event.detail);
  window.addEventListener(ENTRY_ADDED_EVENT, handler);
  return () => window.removeEventListener(ENTRY_ADDED_EVENT, handler);
}