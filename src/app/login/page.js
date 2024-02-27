// 'use client';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { getSession, login, logout } from "../../lib/lib";
import { redirect } from "next/navigation";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

export default async function Page() {
  const session = await getSession();
  if(session !== null) {
    redirect('/home');
  }
  return (
    <div className="m-auto max-w-md space-y-1 flex justify-center mt-40 p-16">
      <Card className = "p-16">
        <CardTitle>Data Vault</CardTitle>
        <CardHeader>Sign In</CardHeader>
    <section>
      <form
        action={async (formData) => {
          "use server";
          await login(formData);
          redirect("/home");
        }}
      >
        <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="m@example.com" type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" />
        </div>
        <Button className="w-full" type = "submit">Sign In</Button>
      </div>
      </form>
      <form
        action={async () => {
          "use server";
          await logout();
          redirect("/");
        }}
      >
        {/* <button type="submit">Logout</button> */}
      </form>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
    </section>
    </Card>
    </div>
  );
}