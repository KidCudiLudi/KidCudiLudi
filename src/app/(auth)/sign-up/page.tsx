"use client";

import { useState } from "react";
import Link from "next/link";
import { signUpAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await signUpAction(new FormData(e.currentTarget));
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <div className="text-4xl mb-2">🐾</div>
        <CardTitle className="text-2xl">Stwórz konto</CardTitle>
        <CardDescription>Zacznij organizować swoje życie z Sammy</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Imię</Label>
            <Input
              id="displayName"
              name="displayName"
              type="text"
              placeholder="Jan"
              required
              autoComplete="given-name"
            />
          </div>
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
              placeholder="Minimum 6 znaków"
              required
              autoComplete="new-password"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Tworzenie konta..." : "Zarejestruj się"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-center">
        <p className="text-muted-foreground w-full">
          Masz już konto?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Zaloguj się
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
