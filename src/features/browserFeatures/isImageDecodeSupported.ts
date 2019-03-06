/**
 * Tests for Image decode support
 *
 * @returns {boolean}
 */
export default (() => {
  try {
    const image = new Image();
    return !!image.decode;
  } catch (err) {
    return false;
  }
})();