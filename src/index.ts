// Analytics
export { registerAnalytics, recordAnalyticsEvent } from './analytics';

// Audio
export { createAudioContext, isAutoplayAllowed, unlockAutoplay } from './audio';

// Cache
export { PersistentCache } from './cache';

// Cookie
export { deleteCookie, getCookie, setCookie } from './cookie';

// Events
export {
  EventEmitter,
  eventEmitter,
  offConnectionChange,
  offKeyChange,
  offOrientationChange,
  offVisibilityChange,
  offWindowSizeChange,
  onConnectionChange,
  onKeyChange,
  onOrientationChange,
  onVisibilityChange,
  onWindowSizeChange,
} from './events';

// Features
export { features } from './features';

// Loaders
export { AssetLoader } from './loaders';

// Polyfills
export { fullScreen, pointerLock } from './polyfills';

// Scheduler
import scheduleTask, { TASK_PRIORITY } from './scheduler';
export { scheduleTask, TASK_PRIORITY };

// Threads
export { threadPool } from './threads';

// Utilities
export { assert, debounce, getQueryParameters } from './utilities';
