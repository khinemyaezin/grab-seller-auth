import { api, resolveLink, type HalLinks, type HateoasLink } from "@khinemyaezin/seller-api";
import { IdentityRoot } from "../types/auth.model";

type RootResponse = { _links: HalLinks };

export async function fetchIdentityRoot(link: HateoasLink): Promise<IdentityRoot> {
  const response = await api.followLink<RootResponse>(link);
  return {
    self: resolveLink(response._links, "self"),
    getProfile: resolveLink(response._links, "get-profile"),
    getUser: resolveLink(response._links, "get-user"),
    listUsers: resolveLink(response._links, "list-users"),
    listRoles: resolveLink(response._links, "list-roles"),
    login: resolveLink(response._links, "login"),
    register: resolveLink(response._links, "register"),
  };
}
