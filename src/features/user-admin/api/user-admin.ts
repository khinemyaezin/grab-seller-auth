import { api, HateoasLink } from "@khinemyaezin/seller-api";
import { UserMutationResponse, UserProfilePageResponse, UserProfileResponse } from "../types/user-admin.model";
import { RoleSearchResponse } from "../types/user-admin.response";

export const userAdminService = {
  listUsers: (link: HateoasLink, params?: Record<string, any>, headers?: Record<string, string>): Promise<UserProfilePageResponse> =>
    api.followLink<UserProfilePageResponse>(link, "GET", undefined, params, headers),

  getUser: (link: HateoasLink, headers?: Record<string, string>): Promise<UserProfileResponse> =>
    api.followLink<UserProfileResponse>(link, "GET", undefined, undefined, headers),

  suspendUser: (link: HateoasLink, headers?: Record<string, string>): Promise<UserMutationResponse> =>
    api.followLink<UserMutationResponse>(link, "POST", undefined, undefined, headers),

  reactivateUser: (link: HateoasLink, headers?: Record<string, string>): Promise<UserMutationResponse> =>
    api.followLink<UserMutationResponse>(link, "POST", undefined, undefined, headers),

  approveUser: (link: HateoasLink, headers?: Record<string, string>): Promise<UserMutationResponse> =>
    api.followLink<UserMutationResponse>(link, "POST", undefined, undefined, headers),

  assignRole: (link: HateoasLink, headers?: Record<string, string>): Promise<UserMutationResponse> =>
    api.followLink<UserMutationResponse>(link, "PUT", undefined, undefined, headers),

  revokeRole: (link: HateoasLink, headers?: Record<string, string>): Promise<UserMutationResponse> =>
    api.followLink<UserMutationResponse>(link, "DELETE", undefined, undefined, headers),

  searchRoleSuggestions: (link: HateoasLink, params?: Record<string, any>, headers?: Record<string, string>): Promise<RoleSearchResponse> =>
    api.followLink<RoleSearchResponse>(link, "GET", undefined, params, headers)
};
