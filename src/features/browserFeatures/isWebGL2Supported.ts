/**
 * Tests for WebGL2 support
 *
 * @returns {boolean}
 */
export default () => {
  const canvas = document.createElement('canvas');

  // https://webgl2fundamentals.org/webgl/lessons/webgl1-to-webgl2.html
  // Note: there is no "experimental-webgl2".
  const gl = canvas.getContext('webgl2');

  // @ts-ignore
  return (gl && gl instanceof WebGL2RenderingContext) || false;
};