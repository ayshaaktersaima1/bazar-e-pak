import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt, admin } from "better-auth/plugins";

import {
    ac,
    customer,
    seller,
    adminRole,
    superAdmin,
} from "@/lib/auth-permissions";

const client = new MongoClient(
    process.env.MONGODB_URL,
);

const db = client.db("pakBazar");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),

    emailAndPassword: {
        enabled: true,
    },

    user: {
        additionalFields: {
            phoneNumber: {
                type: "string",
                required: false,
                defaultValue: "",
            },

            status: {
                type: "string",
                required: false,
                defaultValue: "active",
                input: false,
            },

            isBlocked: {
                type: "boolean",
                required: false,
                defaultValue: false,
                input: false,
            },
        },
    },

    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 5 * 60,
        },
    },

    plugins: [
        jwt(),

        admin({
            ac,

            roles: {
                customer,
                seller,
                admin: adminRole,
                super_admin: superAdmin,
            },

            defaultRole: "customer",
        }),
    ],
});