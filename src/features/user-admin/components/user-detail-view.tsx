import { HateoasLink, resolveLink } from "@khinemyaezin/seller-api";
import { useUserMutations, useUserQuery } from "../hooks/use-users";
import { Button } from "@khinemyaezin/seller-ui/components/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@khinemyaezin/seller-ui/components/card";
import { ButtonGroup } from "@khinemyaezin/seller-ui/components/button-group";
import { UserRoleView } from "./user-role-view";

export type UserDetailViewProps = {
  userId: string;
  link: HateoasLink;
};

export default function UserDetailView({ link, userId }: UserDetailViewProps) {
  const { data: user, isLoading, isError } = useUserQuery(link, userId);
  const mutations = useUserMutations();

  if (isLoading) return <div className="p-4 text-center">Loading user details...</div>;
  if (isError || !user) return <div className="p-4 text-center text-red-500">Failed to load user details.</div>;

  const links = user._links || {};

  const roleSuggestLink = resolveLink(links, "suggest-roles");
  const suspendLink = resolveLink(links, "suspend-user");
  const reactivateLink = resolveLink(links, "reactivate-user");
  const approveLink = resolveLink(links, "approve-user");
  const assignRoleLink = resolveLink(links, "assign-role");
  const revokeRoleLink = resolveLink(links, "revoke-role");

  const handleAction = (mutationFn: any, actionLink?: HateoasLink) => {
    if (actionLink) {
      mutationFn.mutate(actionLink);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle >User Profile</CardTitle>
          <CardDescription >Personal details and application status.</CardDescription>
          <CardAction>
            <ButtonGroup>
              {approveLink && (
                <Button
                  variant="outline"
                  onClick={() => handleAction(mutations.approveMutation, approveLink)}
                  disabled={mutations.approveMutation.isPending}
                >
                  Approve
                </Button>
              )}
              {suspendLink && (
                <Button
                  variant="destructive"
                  onClick={() => handleAction(mutations.suspendMutation, suspendLink)}
                  disabled={mutations.suspendMutation.isPending}
                >
                  Suspend
                </Button>
              )}
              {reactivateLink && (
                <Button
                  variant="outline"
                  onClick={() => handleAction(mutations.reactivateMutation, reactivateLink)}
                  disabled={mutations.reactivateMutation.isPending}
                >
                  Reactivate
                </Button>
              )}
            </ButtonGroup>
          </CardAction>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-muted-foreground w-24 shrink-0">Email address</dt>
              <dd className="mt-2">{user.email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-muted-foreground w-24 shrink-0">Status</dt>
              <dd className="mt-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                  user.status === 'SUSPENDED' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                  {user.status}
                </span>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-muted-foreground w-24 shrink-0">Created At</dt>
              <dd className="mt-2">{user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <UserRoleView
        roles={user.roles} 
        revokeRoleLink={revokeRoleLink} 
        roleSuggestLink={roleSuggestLink} 
        assignRoleLink={assignRoleLink}
      />
    </div>
  );
}
