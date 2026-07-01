import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, CheckSquare, Calendar, Heart } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const today = format(new Date(), "yyyy-MM-dd");
  const greeting = getGreeting();
  const dateLabel = format(new Date(), "EEEE, d MMMM yyyy", { locale: pl });

  // Parallel fetch
  const [profileResult, tasksResult, habitsResult, eventsResult] = await Promise.all([
    supabase.from("profiles").select("display_name").eq("user_id", user.id).single(),
    supabase
      .from("tasks")
      .select("id, title, priority, status")
      .eq("user_id", user.id)
      .eq("status", "todo")
      .or(`due_date.eq.${today},due_date.lt.${today}`)
      .is("deleted_at", null)
      .order("due_date", { ascending: true })
      .limit(5),
    supabase
      .from("habits")
      .select("id, title")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .order("sort_order")
      .limit(5),
    supabase
      .from("calendar_events")
      .select("id, title, start_time")
      .eq("user_id", user.id)
      .eq("event_date", today)
      .is("deleted_at", null)
      .order("start_time", { ascending: true }),
  ]);

  const displayName = profileResult.data?.display_name ?? "tam";
  const tasks = tasksResult.data ?? [];
  const habits = habitsResult.data ?? [];
  const events = eventsResult.data ?? [];

  // Fetch today's habit completions
  const habitIds = habits.map((h) => h.id);
  const completionsResult = habitIds.length
    ? await supabase
        .from("habit_completions")
        .select("habit_id")
        .in("habit_id", habitIds)
        .eq("completed_date", today)
    : { data: [] };
  const completedHabitIds = new Set(completionsResult.data?.map((c) => c.habit_id) ?? []);

  return (
    <div>
      <PageHeader
        title={`${greeting}, ${displayName} 👋`}
        description={dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Target className="h-4 w-4" />} label="Zadania dziś" value={tasks.length.toString()} />
        <StatCard
          icon={<CheckSquare className="h-4 w-4" />}
          label="Nawyki"
          value={`${completedHabitIds.size}/${habits.length}`}
        />
        <StatCard icon={<Calendar className="h-4 w-4" />} label="Wydarzenia" value={events.length.toString()} />
        <StatCard icon={<Heart className="h-4 w-4" />} label="Sammy OS" value="v1.0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Tasks */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-primary" />
              Zadania na dziś
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">Brak zaległych zadań 🎉</p>
            ) : (
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li key={task.id} className="flex items-center gap-2 text-sm">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      task.priority === "high" ? "bg-red-500" :
                      task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                    }`} />
                    {task.title}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Habits */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Nawyki
            </CardTitle>
          </CardHeader>
          <CardContent>
            {habits.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">Dodaj swój pierwszy nawyk</p>
            ) : (
              <ul className="space-y-2">
                {habits.map((habit) => (
                  <li key={habit.id} className="flex items-center gap-2 text-sm">
                    <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center text-xs ${
                      completedHabitIds.has(habit.id)
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-input"
                    }`}>
                      {completedHabitIds.has(habit.id) ? "✓" : ""}
                    </span>
                    <span className={completedHabitIds.has(habit.id) ? "line-through text-muted-foreground" : ""}>
                      {habit.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Events */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Dziś
            </CardTitle>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">Brak wydarzeń na dziś</p>
            ) : (
              <ul className="space-y-2">
                {events.map((event) => (
                  <li key={event.id} className="text-sm">
                    {event.start_time && (
                      <span className="text-muted-foreground mr-2 tabular-nums">
                        {event.start_time.slice(0, 5)}
                      </span>
                    )}
                    {event.title}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sammy tip */}
      <div className="mt-6 p-4 rounded-xl border bg-muted/40 flex items-start gap-3">
        <span className="text-2xl">🐾</span>
        <div>
          <p className="text-sm font-medium">Sammy mówi:</p>
          <p className="text-sm text-muted-foreground mt-0.5">{getSammyTip()}</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        <div className="text-primary">{icon}</div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Dzień dobry";
  if (h < 18) return "Cześć";
  return "Dobry wieczór";
}

const SAMMY_TIPS = [
  "Małe kroki czynią wielkie zmiany. Jeden nawyk dziennie wystarczy, żeby zmienić życie.",
  "Najlepszy czas na start był wczoraj. Drugi najlepszy — teraz.",
  "Zapisz trzy rzeczy, za które jesteś dziś wdzięczny. To zmienia perspektywę.",
  "Przeczytane 10 stron dziennie to 3650 stron w rok — to 12 książek!",
  "Zaplanuj jutro wieczorem. Spokojny poranek zaczyna się poprzedniego dnia.",
  "Nawet 20 minut ruchu dziennie poprawia nastrój na cały dzień.",
];

function getSammyTip() {
  return SAMMY_TIPS[new Date().getDay() % SAMMY_TIPS.length];
}
