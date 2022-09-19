import { XCircleIcon } from "@heroicons/react/solid";

type TagProps = {
  onClose?: () => void;
};

const Tag: FCWithChildren<TagProps> = ({ onClose, children }) => {
  return (
    <span className="flex flex-wrap px-4 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-valhalla-500 text-gray-200 hover:bg-valhalla-700">
      {children}
      {onClose && (
        <XCircleIcon onClick={onClose} className="h-5 w-5 ml-3 -mr-1 hover:text-yellow-300" />
      )}
    </span>
  );
};

export default Tag;
