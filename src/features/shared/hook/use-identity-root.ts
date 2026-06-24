import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchIdentityRoot } from "../../auth/api/discovery";
import { useIdentityLink } from "../context";
import type { IdentityRoot } from "@/features/auth/types/auth.model";

export default function useIdentityRoot(): UseQueryResult<IdentityRoot, Error> {
    const identityLink = useIdentityLink();

    return useQuery({
        queryKey: ["identity-root", identityLink.href],
        queryFn: () => fetchIdentityRoot(identityLink),
        enabled: !!identityLink,
    });
}