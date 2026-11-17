import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { createPublicServerClient } from "@/lib/server/public-client";

export const getPublicPlans = createServerFn({ method: "GET" }).handler(async () => {
  const sb = createPublicServerClient();
  const { data, error } = await sb.from("plans").select("*").order("sort_order");
  if (error) throw new Error(error.message);
  return data;
});

export const plansQuery = queryOptions({
  queryKey: ["public-plans"],
  queryFn: () => getPublicPlans(),
  staleTime: 60_000,
});
