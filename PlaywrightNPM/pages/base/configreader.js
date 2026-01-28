const fs = require("fs");
const path = require("path");

class ConfigReader {
  static getConfig() {
    const filePath = path.join(__dirname, "../base/config.json");
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  }

  static getValue(env, key) {
    const config = this.getConfig();
    return config[`${env}.${key}`]; 
  }

  static getBaseURL(env) {
    return this.getValue(env, "baseURL");
  }

  static getDoUsername(env) {
    return this.getValue(env, "DOusername");
  }

  static getDoPassword(env) {
    return this.getValue(env, "DOpassword");
  }

  static getPaUsername(env) {
    return this.getValue(env, "PAusername");
  }

  static getPaPassword(env) {
    return this.getValue(env, "PApassword");
  }
}

module.exports = ConfigReader;