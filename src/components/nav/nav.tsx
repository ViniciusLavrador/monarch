import { Transition } from "@headlessui/react";
import { AdjustmentsIcon, HomeIcon, LogoutIcon, PlusIcon } from "@heroicons/react/solid";
import { useClickOutside, useHotkeys, useWindowScroll } from "@mantine/hooks";
import classNames from "classnames";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Menu from "../menu/menu";
import { CloseButton, MenuButton, NavButtonContainer } from "./nav-buttons";
import { BaseNavProps, TransitionProps } from "./types";

const SIMPLE_NAV_TRIGGER_POS = 150;

const Logo: React.FC = () => (
  <div className="relative w-20 h-20">
    <Image src="/monarch-logo.svg" layout="fill" alt="Monarch logo" />
  </div>
);

const BaseNavigationTransition: FCWithChildren<TransitionProps> = ({ children, ...props }) => (
  <Transition
    enter="transition-all duration-300"
    enterFrom="md:translate-x-full md:translate-y-0 translate-y-full opacity-0"
    enterTo="md:translate-x-0 md:translate-y-0 translate-y-0 opacity-100"
    leave="transition-all duration-300"
    leaveFrom="md:translate-x-0 translate-y-0 opacity-100"
    leaveTo="md:translate-x-full md:translate-y-0 translate-y-full opacity-0"
    {...props}
  >
    {children}
  </Transition>
);

const BaseNav: React.FC<BaseNavProps> = ({
  showNavbar,
  drawerRef,
  onDrawerClose,
  onDrawerOpen,
  containerClassName,
}) => {
  const { push, pathname } = useRouter();

  const applyActivePathClassnameToContainer = (path: string[], panel?: boolean) =>
    classNames([
      "transition-colors",
      { "!bg-yellow-500 hover:bg-yellow-500": path.includes(pathname) },
      { "!bg-opacity-30": path.includes(pathname) && panel },
    ]);

  return (
    <div
      className={classNames([
        "container mx-auto flex flex-row items-center justify-between w-full gap-5 py-5 px-5 md:px-0",
        containerClassName,
      ])}
    >
      <Logo />
      <BaseNavigationTransition
        show={showNavbar}
        className="fixed top-0 z-40 flex items-center h-screen w-full right-0 md:right-10 md:w-80 "
      >
        <div
          className="h-full md:h-[90%] bg-valhalla-400 shadow-lg rounded-xl p-4 overflow-y-auto w-full flex flex-col"
          ref={drawerRef}
        >
          <div className="flex flex-row justify-end">
            <CloseButton onClick={onDrawerClose} />
          </div>

          {/* Regular Itens */}
          <Menu
            containerProps={{
              className: "pt-8",
            }}
            nav={[
              {
                key: "home-btn",
                component: (
                  <NavButtonContainer className="group">
                    <HomeIcon className="h-6 w-6 group-hover:animate-pulse" /> Início
                  </NavButtonContainer>
                ),
                buttonProps: {
                  onClick: () => push("/"),
                  className: applyActivePathClassnameToContainer(["/"]),
                },
              },
              {
                key: "pref-btn",
                component: (
                  <NavButtonContainer className="group">
                    <PlusIcon className="h-6 w-6 group-hover:animate-pulse" /> Mais
                  </NavButtonContainer>
                ),
                buttonProps: {
                  className: applyActivePathClassnameToContainer(["/preferences", "/test"]),
                },
                panelProps: {
                  className: applyActivePathClassnameToContainer(["/preferences", "/test"], true),
                },
                navigator: [
                  {
                    key: "/preferences",
                    component: (
                      <NavButtonContainer className="group">
                        <AdjustmentsIcon className="h-6 w-6 group-hover:animate-pulse" />{" "}
                        Preferencias
                      </NavButtonContainer>
                    ),
                    buttonProps: {
                      onClick: () => push("/preferences"),
                      className: applyActivePathClassnameToContainer(["/preferences"]),
                    },
                  },
                ],
              },
            ]}
          />

          <div className="grow"></div>

          {/* Bottom Itens */}
          <Menu
            containerProps={{
              className: "pt-4",
            }}
            nav={[
              {
                key: "logout-btn",
                component: (
                  <NavButtonContainer>
                    Sair <LogoutIcon className="h-6 w-6" />
                  </NavButtonContainer>
                ),
                buttonProps: { onClick: () => signOut() },
              },
            ]}
          />
        </div>
      </BaseNavigationTransition>
      <BaseNavigationTransition show={!showNavbar}>
        <MenuButton onClick={onDrawerOpen} />
      </BaseNavigationTransition>
    </div>
  );
};

const FixedNav: React.FC<Omit<BaseNavProps, "containerClassName">> = (props) => (
  <div className="bg-valhalla-700 fixed top-0 w-full">
    <BaseNav containerClassName="py-2" {...props} />
  </div>
);

const Nav: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const drawerRef = useClickOutside(() => setShowNavbar(false));
  const [scroll] = useWindowScroll();
  useHotkeys([["Escape", () => showNavbar && setShowNavbar(false)]]);

  const isOnTop = scroll.y <= SIMPLE_NAV_TRIGGER_POS;

  return (
    <>
      <BaseNav
        drawerRef={drawerRef}
        onDrawerClose={() => setShowNavbar(false)}
        onDrawerOpen={() => setShowNavbar(true)}
        showNavbar={showNavbar}
      />

      <Transition
        show={!isOnTop}
        enter="transition-all duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <FixedNav
          drawerRef={drawerRef}
          onDrawerClose={() => setShowNavbar(false)}
          onDrawerOpen={() => setShowNavbar(true)}
          showNavbar={showNavbar}
        />
      </Transition>
    </>
  );
};

export default Nav;
