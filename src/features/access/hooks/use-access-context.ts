import { api, HateoasLink } from "@khinemyaezin/seller-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AccessContextListResponse, AccessContextSelectionResponse } from "../types";

export function useAccessContextList(link?: HateoasLink) {
    return useQuery<AccessContextListResponse>({
        queryKey: ["access-context-list", link?.href],
        queryFn: () => api.followLink(link!,"GET",),
        enabled: !!link
    })
}

export function useAccessContextSelection() {
    return useMutation<AccessContextSelectionResponse, Error, { link: HateoasLink }>({
        mutationFn: ({ link }) => api.followLink(link, "POST")
    })
}