import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HateoasLink, resolveLink, resolveUrlTemplate } from "@khinemyaezin/seller-api";
import { userAdminService } from "../api/user-admin";
import { UserMutationResponse } from "../types/user-admin.model";

export function useUsersQuery(link: HateoasLink | undefined, page = 0, size = 10) {
  return useQuery({
    queryKey: ["users", link?.href, page, size],
    queryFn: () => userAdminService.listUsers(link!, { page, size }),
    enabled: !!link,
  });
}

export function useUserQuery(link: HateoasLink, userId: string) {
  const resolvedLink = resolveUrlTemplate({ id: userId }, link);
  return useQuery({
    queryKey: ["user", resolvedLink.href],
    queryFn: () => userAdminService.getUser(resolvedLink),
    enabled: !!resolvedLink,
  });
}

export function useRoleSearch(link: HateoasLink, query: string) {
  const resolvedLink = resolveUrlTemplate({ "name": query }, link)
  return useQuery({
    queryKey: ["roles-search", resolvedLink],
    queryFn: () => userAdminService.searchRoleSuggestions(resolvedLink),
    enabled: !!resolvedLink && !!query?.trim()
  })
}

export function useUserMutations() {
  const queryClient = useQueryClient();

  const invalidateUser = (linkHref?: string) => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    if (linkHref) {
      queryClient.invalidateQueries({ queryKey: ["user", linkHref] });
    }
  };

  const suspendMutation = useMutation({
    mutationFn: (link: HateoasLink) => userAdminService.suspendUser(link),
    onSuccess: (data) => invalidateUser(resolveLink(data._links, "self")?.href),
  });

  const reactivateMutation = useMutation({
    mutationFn: (link: HateoasLink) => userAdminService.reactivateUser(link),
    onSuccess: (data) => invalidateUser(resolveLink(data._links, "self")?.href),
  });

  const approveMutation = useMutation({
    mutationFn: (link: HateoasLink) => userAdminService.approveUser(link),
    onSuccess: (data) => invalidateUser(resolveLink(data._links, "self")?.href),
  });

  const assignRoleMutation = useMutation<UserMutationResponse, Error, { link: HateoasLink, roleCode: string }>({
    mutationFn: ({link, roleCode}) => {
      const resolvedLink = resolveUrlTemplate({ "code": roleCode }, link)
      return userAdminService.assignRole(resolvedLink);
    },
    onSuccess: (data) => invalidateUser(resolveLink(data._links, "self")?.href),
  });

  const revokeRoleMutation = useMutation<UserMutationResponse, Error, { link: HateoasLink, code: string }>({
    mutationFn: ({ link, code }) => {
      const resolvedLink = resolveUrlTemplate({ "code": code }, link)
      return userAdminService.revokeRole(resolvedLink);
    },
    onSuccess: (data) => invalidateUser(resolveLink(data._links, "self")?.href),
  })

  return {
    suspendMutation,
    reactivateMutation,
    approveMutation,
    assignRoleMutation,
    revokeRoleMutation,
  };
}
