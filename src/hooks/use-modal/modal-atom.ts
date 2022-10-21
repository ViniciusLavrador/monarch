import { atom } from "jotai";

const modalListAtom = atom<Modal.ModalKey[]>([]);

const addToModalListAtom = atom(null, (get, set, key: Modal.ModalKey) => {
  const modalList = get(modalListAtom);
  set(modalListAtom, [key, ...modalList]);
});

const returnToKeyModalListAtom = atom(null, (get, set, key: Modal.ModalKey) => {
  const modalList = get(modalListAtom);
  const keyIndexInList = modalList.indexOf(key);

  // Key is not in list or already is current active key, do nothing
  if (keyIndexInList === -1 || keyIndexInList === 0) return;

  set(modalListAtom, modalList.slice(keyIndexInList));
});

const returnToIndexModalListAtom = atom(null, (get, set, index: Modal.ModalIndex) => {
  const modalList = get(modalListAtom);

  // Given index does not exist in modal list
  if (index >= modalList.length) return;

  set(modalListAtom, modalList.slice(index));
});

const popFromModalListAtom = atom(null, (get, set) => {
  const modalList = get(modalListAtom);
  if (modalList.length === 0) return;

  set(modalListAtom, modalList.slice(1));
});

const clearModalListAtom = atom(null, (get, set) => {
  const modalList = get(modalListAtom);
  if (modalList.length === 0) return;

  set(modalListAtom, []);
});

const modalAtom = atom(
  (get) => {
    const modalList = get(modalListAtom);
    return { open: modalList.length > 0, currentModalKey: modalList[0], openedModals: modalList };
  },
  (_get, set, loadingAtomPayload: Modal.ModalAtomPayload) => {
    switch (loadingAtomPayload.action) {
      case "ADD":
        set(addToModalListAtom, loadingAtomPayload.modal.key);
        return;
      case "RETURN_TO_KEY":
        set(returnToKeyModalListAtom, loadingAtomPayload.modal.key);
        return;
      case "RETURN_TO_INDEX":
        set(returnToIndexModalListAtom, loadingAtomPayload.modal.index);
        return;
      case "CLEAR":
        set(clearModalListAtom, null);
        return;
      case "POP":
        set(popFromModalListAtom, null);
        return;
    }
  },
);

export default modalAtom;
