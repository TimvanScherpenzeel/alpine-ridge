// Browser features
import getBrowserType from './browserFeatures/getBrowserType';
import getMediaFeatures from './browserFeatures/getMediaFeatures';
import getWebGL2Features from './browserFeatures/getWebGL2Features';
import getWebGLFeatures from './browserFeatures/getWebGLFeatures';
import isAnimationWorkletSupported from './browserFeatures/isAnimationWorkletSupported';
import isAudioWorkletSupported from './browserFeatures/isAudioWorkletSupported';
import isBroadcastChannelSupported from './browserFeatures/isBroadcastChannelSupported';
import isFetchSupported from './browserFeatures/isFetchSupported';
import isGamepadSupported from './browserFeatures/isGamepadSupported';
import isImageBitmapSupported from './browserFeatures/isImageBitmapSupported';
import isImageDecodeSupported from './browserFeatures/isImageDecodeSupported';
import isIndexedDBSupported from './browserFeatures/isIndexedDBSupported';
import isIntersectionObserverSupported from './browserFeatures/isIntersectionObserverSupported';
import isLayoutWorkletSupported from './browserFeatures/isLayoutWorkletSupported';
import isLocalStorageSupported from './browserFeatures/isLocalStorageSupported';
import isMutationObserverSupported from './browserFeatures/isMutationObserverSupported';
import isOffscreenCanvasSupported from './browserFeatures/isOffscreenCanvasSupported';
import isPaintWorkletSupported from './browserFeatures/isPaintWorkletSupported';
import isPerformanceNowSupported from './browserFeatures/isPerformanceNowSupported';
import isPerformanceObserverSupported from './browserFeatures/isPerformanceObserverSupported';
import isRequestIdleCallbackSupported from './browserFeatures/isRequestIdleCallbackSupported';
import isServiceWorkerSupported from './browserFeatures/isServiceWorkerSupported';
import isSessionStorageSupported from './browserFeatures/isSessionStorageSupported';
import isUserActivationSupported from './browserFeatures/isUserActivationSupported';
import isWebAssemblySupported from './browserFeatures/isWebAssemblySupported';
import isWebAudioSupported from './browserFeatures/isWebAudioSupported';
import isWebGL2Supported from './browserFeatures/isWebGL2Supported';
import isWebGLSupported from './browserFeatures/isWebGLSupported';
import isWebPSupported from './browserFeatures/isWebPSupported';
import isWebRTCSupported from './browserFeatures/isWebRTCSupported';
import isWebSocketSupported from './browserFeatures/isWebSocketSupported';
import isWebVRSupported from './browserFeatures/isWebVRSupported';
import isWebWorkerInlineSupported from './browserFeatures/isWebWorkerInlineSupported';
import isWebWorkerSupported from './browserFeatures/isWebWorkerSupported';
import isWebXRSupported from './browserFeatures/isWebXRSupported';

// Browser settings
import isCookieEnabled from './browserSettings/isCookieEnabled';
import isDoNotTrackEnabled from './browserSettings/isDoNotTrackEnabled';

// Hardware features
import getDevicePixelRatio from './hardwareFeatures/getDevicePixelRatio';
import getEndianness from './hardwareFeatures/getEndianness';
import { getGPUTier } from './hardwareFeatures/getGPUTier';
import getWebWorkerPoolSize from './hardwareFeatures/getWebWorkerPoolSize';

export { getGPUTier };

export const features = {
  // Browser features
  browserFeatures: {
    browserType: getBrowserType,
    isAnimationWorkletSupported,
    isAudioWorkletSupported,
    isBroadcastChannelSupported,
    isFetchSupported,
    isGamepadSupported,
    isImageBitmapSupported,
    isImageDecodeSupported,
    isIndexedDBSupported,
    isIntersectionObserverSupported,
    isLayoutWorkletSupported,
    isLocalStorageSupported,
    isMutationObserverSupported,
    isOffscreenCanvasSupported,
    isPaintWorkletSupported,
    isPerformanceNowSupported,
    isPerformanceObserverSupported,
    isRequestIdleCallbackSupported,
    isServiceWorkerSupported,
    isSessionStorageSupported,
    isUserActivationSupported,
    isWebAssemblySupported,
    isWebAudioSupported,
    // !! Device driver bug: Work around bug on Samsung Galaxy S and A series
    // !! it appears to have problems with immediately evaluated support checking for WebGL 2 (not WebGL)
    isWebGL2Supported: isWebGL2Supported(),
    isWebGLSupported,
    isWebPSupported,
    isWebRTCSupported,
    isWebSocketSupported,
    isWebVRSupported,
    isWebWorkerInlineSupported,
    isWebWorkerSupported,
    isWebXRSupported,

    mediaFeatures: getMediaFeatures,
    // !! Device driver bug: Work around bug on Samsung Galaxy S and A series
    // !! it appears to have problems with immediately evaluated support checking for WebGL 2 (not WebGL)
    webGL2Features: getWebGL2Features(),
    webGLFeatures: getWebGLFeatures,
  },

  // Browser settings
  browserSettings: {
    isCookieEnabled,
    isDoNotTrackEnabled,
  },

  // Hardware features
  hardwareFeatures: {
    devicePixelRatio: getDevicePixelRatio,
    endianness: getEndianness,
    workerPoolSize: getWebWorkerPoolSize,
  },
};
