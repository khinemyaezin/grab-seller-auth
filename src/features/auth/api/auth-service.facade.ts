import type { HateoasLink } from "@khinemyaezin/seller-api";
import { fetchIdentityRoot } from "./discovery";
import { authService } from "./auth";
import type { IdentityRoot } from "../types/auth.model";
import { User } from "@khinemyaezin/seller-contracts";

export interface AuthServiceFacade {
  getProfile(): Promise<User>;
  logout(): Promise<void>;
  refreshToken(): Promise<void>;
}

export function createAuthService(entryLink: HateoasLink): AuthServiceFacade {
  let discoveryPromise: Promise<IdentityRoot> | null = null;

  function ensureDiscovery(): Promise<IdentityRoot> {
    if (!discoveryPromise) {
      discoveryPromise = fetchIdentityRoot(entryLink).catch((error) => {
        discoveryPromise = null;
        throw error;
      });
    }
    return discoveryPromise;
  }

  return {
    async getProfile(): Promise<User> {
      const root = await ensureDiscovery();
      if (!root.getProfile) {
        throw new Error("Identity root does not expose a 'get-profile' link");
      }
      return authService.readProfile(root.getProfile).then(res => {
        const user: User = {
          id: res.id,
          email: res.email,
          name: "",
          avatar: "",
          createdAt: res.createdAt
        }
        return user;
      });
    },

    async logout(): Promise<void> {
      const root = await ensureDiscovery();
      if (!root.logout) {
        throw new Error("Identity root does not expose a 'logout' link");
      }
      return authService.logout(root.logout);
    },

    async refreshToken(): Promise<void> {
      const root = await ensureDiscovery();
      if (!root.refreshToken) {
        throw new Error("Identity root does not expose a 'refresh-token' link");
      }
      return authService.refreshToken(root.refreshToken);
    },
  };
}