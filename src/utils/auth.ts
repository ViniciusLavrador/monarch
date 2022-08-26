import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { authOptions as nextAuthOptions } from "../pages/api/auth/[...nextauth]";
import { Session, unstable_getServerSession as getServerSession } from "next-auth";

const SIGNIN_ROUTE = "/auth/signin";

type ServerSideContext = GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;

type GetAuthenticatedSession = (ctx: ServerSideContext) => Promise<Session | null>;

export const getAuthenticatedSession: GetAuthenticatedSession = async (ctx) =>
    await getServerSession(ctx.req, ctx.res, nextAuthOptions);

type GetServerSidePropsWithSessionInContext<T extends Record<string, any>> = (
    ctx: GetServerSidePropsContext & { session: Session },
) => Promise<GetServerSidePropsResult<T>>;

export const getServerSidePropsWithSession = <T extends Record<string, any>>(
    fn: GetServerSidePropsWithSessionInContext<T>,
) => {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T>> => {
        const session = await getAuthenticatedSession(ctx);

        if (!session)
            return {
                redirect: {
                    permanent: false,
                    destination: SIGNIN_ROUTE,
                },
            };

        return fn({ ...ctx, session });
    };
};
