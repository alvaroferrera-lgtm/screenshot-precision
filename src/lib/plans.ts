import type { Database } from "@/integrations/supabase/types";

export type Plan = Database["public"]["Tables"]["plans"]["Row"];
export type PlanId = "free" | "starter" | "pro" | "business" | "enterprise";

const eur = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
const num = new Intl.NumberFormat("es-ES");

export function formatPrice(plan: Pick<Plan, "price_monthly" | "is_custom">) {
  if (plan.is_custom || plan.price_monthly === null) return "A medida";
  if (Number(plan.price_monthly) === 0) return "0 €";
  return eur.format(Number(plan.price_monthly));
}

export function formatNumber(n: number) {
  return num.format(n);
}

export function formatEur(n: number | string | null | undefined) {
  if (n === null || n === undefined) return "—";
  return eur.format(Number(n));
}

/** Human label for a limit; huge Enterprise values render as "A medida". */
export function limitLabel(n: number, unit = "") {
  if (n >= 100000 && unit !== "caracteres") return "A medida";
  if (n >= 10_000_000) return "A medida";
  return `${formatNumber(n)}${unit ? ` ${unit}` : ""}`;
}

export const channelLabels = {
  web: "Chatbot web",
  whatsapp: "WhatsApp",
  voice: "Asistente telefónico",
} as const;

export type Channel = keyof typeof channelLabels;

/** Lowest plan that unlocks a channel. Mirrors the database trigger rules. */
export function planAllowsChannel(plan: Pick<Plan, "web_enabled" | "whatsapp_enabled" | "voice_enabled">, channel: Channel) {
  if (channel === "web") return plan.web_enabled;
  if (channel === "whatsapp") return plan.whatsapp_enabled;
  return plan.voice_enabled;
}
