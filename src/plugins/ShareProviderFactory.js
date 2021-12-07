import SharedProvider from "./ShareProvider";
import TextSharedProvider from "./TextShareProvider";

const _registry = {
  root: SharedProvider,
  text: TextSharedProvider,
};

const _singletons = {};

const shareFactory = {
  create: function(shareType) {
    let singleton = _singletons[shareType];
    if (singleton !== undefined) {
      return singleton;
    } else {
      if (shareType in _registry) {
        singleton = new _registry[shareType]();
        _singletons[shareType] = singleton;
        return singleton;
      } else {
        throw new Error(`no share provider registered for type: ${shareType}`);
      }
    }
  },

  getProviders: function() {
    return Object.values(_registry).filter((p) => p !== "root");
  },
};

export default shareFactory;
