import TextShareProvider from "./TextShareProvider";
import EmailShareProvider from "./EmailShareProvider";

import { ref } from "vue";

const _registry = {
  text: TextShareProvider,
  email: EmailShareProvider,
};

export default function useShare() {
  const selectedShare = ref("text");

  function selectShare(share) {
    selectedShare.value = share;
  }

  function getShareProviders() {
    return Object.keys(_registry);
  }

  function shareToMessage() {
    return _registry[selectedShare.value].shareToMessage;
  }
  async function share(shareTo, items) {
    const provider = _registry[selectedShare.value];
    return provider.share(shareTo, items);
  }

  return {
    selectedShare,
    selectShare,
    getShareProviders,
    shareToMessage,
    share,
  };
}
