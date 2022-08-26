import { useAtom } from "jotai";
import loadingAtom from "../../jotai/atoms/loading";

const useLoading = () => {
  const [isLoading, setIsLoading] = useAtom(loadingAtom);

  const toggleLoading = () => setIsLoading(!isLoading);

  return [isLoading, toggleLoading] as const;
};

export default useLoading;
