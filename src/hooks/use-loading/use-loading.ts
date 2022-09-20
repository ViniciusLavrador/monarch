import { useAtom } from "jotai";
import loadingAtom from "../../jotai/atoms/loading";

const useLoading = (key?: string) => {
  const [isLoading, setIsLoading] = useAtom(loadingAtom);

  const toggleLoadingForKey = () => {
    if (!key) throw new Error("[useLoading] TOGGLE requires a key");
    return setIsLoading({ loadingKey: key, action: "TOGGLE" });
  };

  const addLoadingForKey = () => {
    if (!key) throw new Error("[useLoading] ADD requires a key");
    return setIsLoading({ loadingKey: key, action: "ADD" });
  };

  const removeLoadingForKey = () => {
    if (!key) throw new Error("[useLoading] REMOVE requires a key");
    return setIsLoading({ loadingKey: key, action: "REMOVE" });
  };

  return { addLoadingForKey, removeLoadingForKey, toggleLoadingForKey, isLoading };
};

export default useLoading;
