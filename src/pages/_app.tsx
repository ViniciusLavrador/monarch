// src/pages/_app.tsx
import "../styles/globals.css";
import { withTRPC } from "@trpc/next";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";

import LoadingIndicator from "../components/loading-indicator/loading-indicator";
import useLoading from "../hooks/use-loading/use-loading";

import * as layouts from "../layouts";

import type { AppType } from "next/dist/shared/lib/utils";
import type { AppRouter } from "../server/router";
import { AppProps } from "next/app";
import React, { JSXElementConstructor } from "react";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const BaseLayout: FCWithChildren = ({ children }) => <>{children}</>;

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  const [loading] = useLoading();

  const Layout = Component.layout ? layouts[Component.layout] : BaseLayout;

  return (
    <SessionProvider session={session}>
      <Layout>
        <>
          <Component {...pageProps} />
          <LoadingIndicator show={loading} />
        </>
      </Layout>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
