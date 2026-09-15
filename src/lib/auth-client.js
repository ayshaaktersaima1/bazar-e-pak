import { createAuthClient } from "better-auth/react";
import {
    jwtClient,
    adminClient,
} from "better-auth/client/plugins";

import {
    ac,
    customer,
    seller,
    adminRole,
    superAdmin,
} from "@/lib/auth-permissions";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,

    plugins: [
        jwtClient(),

        adminClient({
            ac,

            roles: {
                customer,
                seller,
                admin: adminRole,
                super_admin: superAdmin,
            },
        }),
    ],
});

export const {
    signIn,
    signUp,
    useSession,
} = authClient;