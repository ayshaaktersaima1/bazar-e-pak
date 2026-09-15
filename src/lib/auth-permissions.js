import { createAccessControl } from "better-auth/plugins/access";
import {
    defaultStatements,
    adminAc,
} from "better-auth/plugins/admin/access";

const statement = {
    ...defaultStatements,
};

export const ac = createAccessControl(statement);

export const customer = ac.newRole({});

export const seller = ac.newRole({});

export const adminRole = ac.newRole({});

export const superAdmin = ac.newRole({
    ...adminAc.statements,
});