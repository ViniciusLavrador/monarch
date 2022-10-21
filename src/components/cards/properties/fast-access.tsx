import { PlusCircleIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import useModal from "../../../hooks/use-modal/use-modal";

import BaseCard from "../base-card";

const FastAccessItem: FCWithChildren<ButtonProps> = ({ children, className, ...props }) => (
  <button
    className={classNames(
      "grow p-4 h-fit rounded-lg shadow-lg",
      "flex flex-wrap items-center justify-center gap-4",
      "bg-valhalla-100 hover:bg-valhalla-200 transition-all ease-in-out active:shadow-none outline-none",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

const FastAccess: React.FC = () => {
  const { pushModal } = useModal();
  return (
    <BaseCard className="row-span-2 " title={<h1>ACESSO RÁPIDO</h1>}>
      <div className="flex flex-row flex-wrap gap-4">
        <FastAccessItem onClick={() => pushModal({ key: "AddPropertyFormModal" })}>
          <PlusCircleIcon className="h-8 w-auto text-gray-50" />
          <h2 className="font-normal tracking-widest text-xs text-gray-50">
            Adicionar Propriedade
          </h2>
        </FastAccessItem>
      </div>
    </BaseCard>
  );
};

export default FastAccess;
