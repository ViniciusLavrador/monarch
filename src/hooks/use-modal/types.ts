import { ComponentType, ReactNode } from "react";
import * as Modals from "./modals";

type ModalActionAdd = {
  modal: { key: Modal.ModalKey; index?: never; props?: Modal.ModalComponent };
  action: "ADD";
};
type ModalActionReturnToKey = {
  modal: { key: Modal.ModalKey; index?: never; props?: Modal.ModalComponent };
  action: "RETURN_TO_KEY";
};
type ModalActionReturnToIndex = {
  modal: { key?: never; index: Modal.ModalIndex; props?: Modal.ModalComponent };
  action: "RETURN_TO_INDEX";
};
type ModalActionPop = { modal?: never; action: "POP" };
type ModalActionClear = { modal?: never; action: "CLEAR" };

declare global {
  export namespace Modal {
    type DynamicModalContentType<T = {}> = ComponentType<T> & { Title?: ReactNode };

    type ModalKey = keyof typeof Modals;
    type ModalComponent = typeof Modals[ModalKey];
    type ModalIndex = number;

    type ModalAtomPayload =
      | ModalActionAdd
      | ModalActionReturnToKey
      | ModalActionReturnToIndex
      | ModalActionPop
      | ModalActionClear;
  }
}
