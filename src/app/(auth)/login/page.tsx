"use client";

import { useState } from "react";
import Link from "next/link";
import { loginAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await loginAction(new FormData(e.currentTarget));
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <div className="text-4xl mb-2">🐾</div>
        <CardTitle className="text-2xl">Sammy OS</CardTitle>
        <CardDescription>Zaloguj się do swojego konta</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jan@kowalski.pl"
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Hasło</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logowanie..." : "Zaloguj się"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-sm text-center">
        <Link href="/reset-password" className="text-muted-foreground hover:text-foreground">
          Zapomniałeś hasła?
        </Link>
        <p className="text-muted-foreground">
          Nie masz konta?{" "}
          <Link href="/sign-up" className="text-primary hover:underline font-medium">
            Zarejestruj się
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
