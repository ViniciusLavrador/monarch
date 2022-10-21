import { useAtom } from "jotai";
import { useState } from "react";
import modalAtom from "./modal-atom";

const useModal = () => {
  const [modalState, setModal] = useAtom(modalAtom);

  type Modal = WithSomeRequired<
    Omit<NonNullable<Parameters<typeof setModal>[0]["modal"]>, "index">,
    "key"
  >;
  type ModalKey = NonNullable<Modal["key"]>;

  const pushModal = (modal: Modal) => {
    return setModal({ modal: { key: modal.key }, action: "ADD" });
  };

  const returnModalToKey = (key: ModalKey) => {
    return setModal({ modal: { key }, action: "RETURN_TO_KEY" });
  };

  const returnModalToIndex = (index: Modal.ModalIndex) => {
    return setModal({ modal: { index }, action: "RETURN_TO_INDEX" });
  };

  const popModalKey = () => {
    return setModal({ action: "POP" });
  };

  const clearModalStack = () => {
    return setModal({ action: "CLEAR" });
  };

  return {
    pushModal,
    popModalKey,
    returnModalToKey,
    returnModalToIndex,
    clearModalStack,
    modalState: { ...modalState, multipleModalsOpen: modalState.openedModals.length > 1 },
  };
};

export default useModal;
