export const LIFE_AREAS = [
  { id: "health", label: "Zdrowie", emoji: "💪", color: "#4ade80" },
  { id: "career", label: "Kariera", emoji: "💼", color: "#60a5fa" },
  { id: "finance", label: "Finanse", emoji: "💰", color: "#facc15" },
  { id: "relationships", label: "Relacje", emoji: "❤️", color: "#f87171" },
  { id: "growth", label: "Rozwój", emoji: "🌱", color: "#a78bfa" },
  { id: "creativity", label: "Kreatywność", emoji: "🎨", color: "#fb923c" },
  { id: "education", label: "Edukacja", emoji: "📚", color: "#38bdf8" },
  { id: "home", label: "Dom", emoji: "🏠", color: "#a3e635" },
] as const;

export type LifeAreaId = (typeof LIFE_AREAS)[number]["id"];
