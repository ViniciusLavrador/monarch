import { atom } from "jotai";

export const loadingListAtom = atom<string[]>([]);

type loadingAtomPayload = {
  loadingKey: string;
  action: "ADD" | "REMOVE" | "TOGGLE";
};

const addToLoadingListAtom = atom(null, (get, set, key: string) => {
  const loadingList = get(loadingListAtom);
  const isLoadingKey = loadingList.includes(key);

  if (isLoadingKey) return;
  set(loadingListAtom, [...loadingList, key]);
});

const removeFromLoadingListAtom = atom(null, (get, set, key: string) => {
  const loadingList = get(loadingListAtom);
  const isLoadingKey = loadingList.includes(key);

  if (!isLoadingKey) return;
  set(
    loadingListAtom,
    loadingList.filter((k) => key !== k),
  );
});

const toggleFromLoadingListAtom = atom(null, (get, set, key: string) => {
  const loadingList = get(loadingListAtom);
  const isLoadingKey = loadingList.includes(key);

  if (isLoadingKey) {
    set(removeFromLoadingListAtom, key);
    return;
  }

  set(addToLoadingListAtom, key);
});

const loadingAtom = atom(
  (get) => get(loadingListAtom).length > 0,
  (_get, set, loadingAtomPayload: loadingAtomPayload) => {
    switch (loadingAtomPayload.action) {
      case "ADD":
        set(addToLoadingListAtom, loadingAtomPayload.loadingKey);
        return;
      case "REMOVE":
        set(removeFromLoadingListAtom, loadingAtomPayload.loadingKey);
        return;
      case "TOGGLE":
        set(toggleFromLoadingListAtom, loadingAtomPayload.loadingKey);
        return;
    }
  },
);

export default loadingAtom;
