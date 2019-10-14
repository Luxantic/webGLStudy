const fs = require("fs").promises;
class ShaderUtils {
  static async loadShader(path) {
    try {
      const data = await fs.readFile(path, { encoding: "utf-8" });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = {
  ShaderUtils: ShaderUtils
};
