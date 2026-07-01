"use client";

import { useState } from "react";
import { completeOnboardingAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LIFE_AREAS } from "@/constants/life-areas";

const TIMEZONES = [
  { value: "Europe/Warsaw", label: "Warszawa (GMT+1/+2)" },
  { value: "Europe/London", label: "Londyn (GMT+0/+1)" },
  { value: "Europe/Berlin", label: "Berlin (GMT+1/+2)" },
  { value: "America/New_York", label: "Nowy Jork (GMT-5/-4)" },
  { value: "America/Los_Angeles", label: "Los Angeles (GMT-8/-7)" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [timezone, setTimezone] = useState("Europe/Warsaw");

  async function handleFinish() {
    setLoading(true);
    const fd = new FormData();
    fd.append("displayName", displayName);
    fd.append("timezone", timezone);
    await completeOnboardingAction(fd);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Progress */}
        <div className="flex gap-2 justify-center">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Step 1 — Imię */}
        {step === 1 && (
          <Card>
            <CardHeader className="text-center">
              <div className="text-5xl mb-2">🐾</div>
              <CardTitle className="text-xl">Witaj w Sammy OS!</CardTitle>
              <CardDescription>Jak mam się do Ciebie zwracać?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Twoje imię</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="np. Kasia"
                  autoFocus
                />
              </div>
              <Button
                className="w-full"
                onClick={() => setStep(2)}
                disabled={!displayName.trim()}
              >
                Dalej →
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2 — Strefa czasowa */}
        {step === 2 && (
          <Card>
            <CardHeader className="text-center">
              <div className="text-5xl mb-2">🌍</div>
              <CardTitle className="text-xl">Gdzie mieszkasz?</CardTitle>
              <CardDescription>Używamy tego do prawidłowego wyświetlania dat</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Strefa czasowa</Label>
                <select
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  ← Wstecz
                </Button>
                <Button className="flex-1" onClick={() => setStep(3)}>
                  Dalej →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3 — Obszary życia (informacyjny) */}
        {step === 3 && (
          <Card>
            <CardHeader className="text-center">
              <div className="text-5xl mb-2">✨</div>
              <CardTitle className="text-xl">Wszystko gotowe!</CardTitle>
              <CardDescription>
                Sammy OS pomoże Ci śledzić te obszary życia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {LIFE_AREAS.map((area) => (
                  <div
                    key={area.id}
                    className="flex items-center gap-2 p-2 rounded-md bg-muted text-sm"
                  >
                    <span>{area.emoji}</span>
                    <span>{area.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                  ← Wstecz
                </Button>
                <Button className="flex-1" onClick={handleFinish} disabled={loading}>
                  {loading ? "Startujemy..." : "Zacznijmy! 🚀"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
