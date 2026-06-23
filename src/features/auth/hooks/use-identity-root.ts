import { useQuery } from "@tanstack/react-query";
import { fetchIdentityRoot } from "../api/discovery";
import { useIdentityLink } from "../context";

export function getIdentityRoot() {
    const identityLink = useIdentityLink();

    return useQuery({
        queryKey: ["identity-root", identityLink.href],
        queryFn: () => fetchIdentityRoot(identityLink),
        enabled: !!identityLink,
    });
}