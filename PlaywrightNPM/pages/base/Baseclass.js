class Base {

   static env = "staging";

  constructor(page) {
    this.page = page;
  }

  async goto() {
    const url = require("./configreader").getBaseURL(Base.env);
    await this.page.goto(url);
  }

}

module.exports = Base;