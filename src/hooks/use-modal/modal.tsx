import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "react";
import useModal from "./use-modal";
import * as ModalComponents from "./modals";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/20/solid";

const Modal: React.FC = () => {
  const { clearModalStack, modalState, popModalKey, returnModalToIndex } = useModal();

  const Modals = modalState.openedModals.map((key) => ({
    key: key,
    component: ModalComponents[key],
    title: ModalComponents[key].Title,
  }));

  const CurrentModal = Modals[0];

  return (
    <Transition appear show={modalState.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={clearModalStack}>
        <>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div
              className={classNames("flex min-h-full items-center justify-center p-4 text-center", {
                "flex-col": true,
              })}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="grow w-full h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="flex justify-between items-center">
                    <div className="flex gap-8 items-center">
                      {modalState.multipleModalsOpen && (
                        <ArrowLeftIcon
                          className="h-5 w-5 text-valhalla-500 cursor-pointer shrink-0 self-start"
                          onClick={popModalKey}
                        />
                      )}
                      <div>
                        <nav className="text-sm">
                          <ol className="list-reset flex flex-wrap">
                            {Modals.slice(1)
                              .reverse()
                              .map(({ title, key }, index, arr) => (
                                <Fragment key={`${key}-${index}`}>
                                  <li>
                                    <a
                                      href="#"
                                      className="text-blue-600 hover:text-blue-700 whitespace-nowrap"
                                      onClick={() => returnModalToIndex(arr.length - index)}
                                    >
                                      {title}
                                    </a>
                                  </li>
                                  <li>
                                    <span className="text-gray-500 mx-2">/</span>
                                  </li>
                                </Fragment>
                              ))}
                          </ol>
                        </nav>
                        <h3 className="text-lg font-medium leading-6 text-gray-900 ">
                          {Modals[0]?.title}
                        </h3>
                      </div>
                    </div>

                    <XMarkIcon
                      className="h-5 w-5 text-valhalla-500 cursor-pointer shrink-0 self-start"
                      onClick={clearModalStack}
                    />
                  </Dialog.Title>
                  <div className="grow mt-4">{CurrentModal && <CurrentModal.component />}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </>
      </Dialog>
    </Transition>
  );
};

export default Modal;
