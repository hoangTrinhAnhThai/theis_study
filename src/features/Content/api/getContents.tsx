import { mockData } from "@/data/contentMockData"
import { ContentType } from "../types";
import { useQuery } from "@tanstack/react-query";

export const getContents = async () => {
  return mockData;
}

type ResponseType = {
  data: ContentType[] | undefined;
  isLoading: boolean;
}

export const useGetContents = ():ResponseType => {
  const {data, isLoading } = useQuery<ContentType[]>({
    queryKey: ["contents"],
    queryFn: async () => await getContents()
  })
  return {data, isLoading}
}
