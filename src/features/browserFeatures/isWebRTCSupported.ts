/**
 * Tests for WebRTC support
 *
 * @returns {boolean}
 */
// @ts-ignore
export default (() =>
  // @ts-ignore
  (!!window.RTCPeerConnection && !!window.RTCDataChannelEvent) ||
  // @ts-ignore
  !!window.webkitRTCPeerConnection ||
  // @ts-ignore
  !!window.mozRTCPeerConnection ||
  // @ts-ignore
  !!window.msRTCPeerConnection ||
  // @ts-ignore
  !!window.oRTCPeerConnection ||
  false)();