import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@khinemyaezin/seller-ui/components/card";
import { Field } from "@khinemyaezin/seller-ui/components/field";
import EditUserRolesForm from "./edit-user-roles-form";
import UserRoleTable from "./user-role-table";
import { HateoasLink } from "@khinemyaezin/seller-api";
import { useUserMutations } from "../hooks/use-users";

export type UserRoleViewProps = {
    roles: string[];
    revokeRoleLink?: HateoasLink;
    roleSuggestLink?: HateoasLink;
    assignRoleLink?: HateoasLink;
}

export function UserRoleView({ roles, revokeRoleLink, roleSuggestLink, assignRoleLink }: UserRoleViewProps) {
    const mutations = useUserMutations();

    const handleRevokeRole = (code: string) => {
        if (!revokeRoleLink) return;
        mutations.revokeRoleMutation.mutate({ link: revokeRoleLink, code });
    };

    const handleAssignRole = (roleCode: string) => {
        if (!assignRoleLink) return;
        mutations.assignRoleMutation.mutate({ link: assignRoleLink, roleCode });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Roles</CardTitle>
                <CardDescription>Details of roles assigned to user.</CardDescription>
            </CardHeader>
            <CardContent>
                <Field>
                    <div className="text-muted-foreground w-24 shrink-0">Roles</div>
                    <div className="flex h-9 flex-col justify-center gap-2">
                        <UserRoleTable
                            roles={roles}
                            onRevokeRole={revokeRoleLink ? handleRevokeRole : undefined} />
                    </div>
                    {assignRoleLink && roleSuggestLink && (
                        <EditUserRolesForm
                            link={roleSuggestLink}
                            isPending={mutations.assignRoleMutation.isPending}
                            filterRoles={roles}
                            onAssignRole={handleAssignRole}
                        />
                    )}
                </Field>
            </CardContent>
        </Card>
    )
}