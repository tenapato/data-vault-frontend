// 'use client';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { getSession, login, logout, singUp } from "../../lib/lib";
import { redirect } from "next/navigation";
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import Link from "next/link";

export default async function Page() {
  const session = await getSession();
  if (session !== null) {
    redirect("/home");
  }
  return (
    <div className="m-auto max-w-md space-y-1 flex justify-center mt-40 p-16">
      <Card className="p-16">
        <CardTitle>Data Vault</CardTitle>
        <CardHeader>Sign Up</CardHeader>
        <section>
          <form
            action={async (formData) => {
              "use server";
              await singUp(formData);
              redirect("/home");
            }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="m@example.com" type="email" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmEmail">Confirm Email</Label>
                <Input name="confirmEmail" placeholder="m@example.com" type="email" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" />
              </div>
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </div>
          </form>
          {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
          <div className="flex flex-col mt-6 justify-center">
            Already have an account?{" "}
            <Link href="/login" className="m-auto">
              <h2 className="text-blue-500 mt-2">Sign in</h2>
            </Link>
          </div>
        </section>
      </Card>
    </div>
  );
}