module.exports = {
  numberOfEntity: null,
  fileName: null,
  setState(type, key, value) {
    if (type === `number`) {
      const int = +value.trim();
      if (int === int && int > 0) {
        this[key] = int;
        return this;
      }
      throw new Error(`You did not enter a number > 0`);
    } else if (type === `string`) {
      if (value) {
        const string = value.trim();
        this[key] = string;
        return this;
      }
      throw new Error(`You did not enter a path`);
    }
    throw new Error(`I don't know this type`);
  }
};
