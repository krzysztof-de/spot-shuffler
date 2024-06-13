import { cookies } from "next/headers";

export const getAuthCookieName = () =>
    process.env.NODE_ENV === 'development' ? 'next-auth.session-token' : '__Secure-next-auth.session-token';

export const getAuthHeader = () => {
    const nextCookies = cookies();
    const cookieName = getAuthCookieName();
    const nextAuthSessionToken = nextCookies.get(cookieName);

    return {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
        }
    };
}