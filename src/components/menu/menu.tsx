import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { merge } from "lodash";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import Navigator from "./types";

const disclosurePanelBaseClasses = "text-sm text-gray-500 rounded-lg mt-2 p-4 bg-valhalla-50";
const rootDisclosurePanelClasses = classNames([disclosurePanelBaseClasses]);
const leaveDisclosurePanelClasses = classNames([disclosurePanelBaseClasses, "pb-0 pr-0 pt-0"]);
const baseNavigatorClasses =
  "flex w-full justify-between rounded-lg bg-valhalla-200 px-4 py-2 text-left text-sm font-medium text-white hover:bg-valhalla-300 mt-2 first:mt-0";
const rootNavigatorClasses = classNames([baseNavigatorClasses]);

const parseButtonProps = (
  buttonProps: Navigator.Button["buttonProps"] = {},
  root: boolean,
): Navigator.Button["buttonProps"] => {
  const { className, ...otherButtonProps } = buttonProps || {};

  return merge(
    { className: classNames(root ? rootNavigatorClasses : baseNavigatorClasses, className) },
    otherButtonProps,
  );
};

const parsePanelProps = (
  panelProps: Navigator.Branch["panelProps"] = {},
  root: boolean,
): Navigator.Branch["panelProps"] => {
  const { className, ...otherButtonProps } = panelProps || {};

  return merge(
    {
      className: classNames(
        root ? rootDisclosurePanelClasses : leaveDisclosurePanelClasses,
        className,
      ),
    },
    otherButtonProps,
  );
};

const makeDisclosureList = (nav: Navigator.Navigator[], root: boolean) => {
  return (
    <>
      {nav.map((v) => {
        const buttonProps = parseButtonProps(v.buttonProps, root);

        if (Navigator.isNavButton(v)) {
          return (
            <button key={v.key} {...buttonProps}>
              {v.component}
            </button>
          );
        }

        const panelProps = parsePanelProps(v.panelProps, root);

        return (
          <Disclosure key={v.key}>
            {({ open }) => (
              <>
                <Disclosure.Button {...buttonProps}>
                  {v.component}
                  <ChevronUpIcon
                    className={`${!open ? "rotate-180 transform" : ""} h-5 w-5 text-white`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-200 ease-out"
                  enterFrom="transform scale-y-95 origin-top opacity-0"
                  enterTo="transform scale-y-100 origin-top opacity-100"
                  leave="transition duration-150 ease-out"
                  leaveFrom="transform scale-y-100 origin-top opacity-100"
                  leaveTo="transform scale-y-95 origin-top opacity-0"
                >
                  <Disclosure.Panel as="div" {...panelProps}>
                    {makeDisclosureList(v.navigator, false)}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        );
      })}
    </>
  );
};

const Menu: React.FC<{
  nav: Navigator.Navigator[];
  containerProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}> = ({ nav, containerProps }) => {
  return <div {...containerProps}>{makeDisclosureList(nav, true)}</div>;
};

export const MenuButtonContainer: FCWithChildren<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        "flex flex-row justify-start w-full items-center gap-4 group",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const applyActiveClassnameToContainer = (condition: boolean, panel?: boolean) =>
  classNames([
    "transition-colors",
    { "!bg-yellow-500 hover:bg-yellow-500": condition },
    { "!bg-opacity-30": condition && panel },
  ]);

export default Menu;
