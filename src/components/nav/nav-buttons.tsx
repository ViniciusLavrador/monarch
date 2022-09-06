import { MenuIcon, XIcon } from "@heroicons/react/solid";

export const MenuButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <button
    type="button"
    className="flex w-10 h-10 text-yellow-500 transition-colors rounded-lg cursor-pointer bg-valhalla-50 place-content-center hover:bg-yellow-500 hover:text-valhalla-50"
    onClick={onClick}
  >
    <MenuIcon className="w-6 h-6 m-auto" />
  </button>
);

export const CloseButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <button
    type="button"
    className="text-valhalla-50 transition-colors cursor-pointer place-content-center hover:text-yellow-500"
    onClick={onClick}
  >
    <XIcon className="w-6 h-6 m-auto" />
  </button>
);
