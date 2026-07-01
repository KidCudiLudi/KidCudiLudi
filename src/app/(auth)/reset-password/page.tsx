"use client";

import { useState } from "react";
import Link from "next/link";
import { resetPasswordAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await resetPasswordAction(new FormData(e.currentTarget));
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  }

  if (success) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">📧</div>
          <CardTitle>Sprawdź email</CardTitle>
          <CardDescription>
            Wysłaliśmy link do zresetowania hasła. Sprawdź skrzynkę odbiorczą.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link href="/login" className="text-sm text-primary hover:underline">
            Wróć do logowania
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Resetuj hasło</CardTitle>
        <CardDescription>
          Podaj swój email, a wyślemy Ci link do zresetowania hasła
        </CardDescription>
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
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Wysyłanie..." : "Wyślij link"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
          ← Wróć do logowania
        </Link>
      </CardFooter>
    </Card>
  );
}
