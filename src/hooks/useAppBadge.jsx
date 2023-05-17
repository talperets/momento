import  { useState } from "react";

export default function useAppBadge() {
  const [counter, setCounter] = useState(1);

  const setBadge = () => {
    setCounter(counter + 1);
    if (navigator.setAppBadge) {
      navigator.setAppBadge(counter);
    } else if (navigator.setClientBadge) {
      navigator.setClientBadge();
    }
  };
  const clearBadge = () => {
    setCounter(+1);
    if (navigator.clearAppBadge) {
      navigator.setAppBadge(counter);
    } else if (navigator.setClientBadge) {
      navigator.clearClientBadge();
    }
  };
  return [setBadge, clearBadge];
}
