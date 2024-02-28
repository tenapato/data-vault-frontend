// 'use client';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { getSession, login, logout, loginWithGoogle} from "../../lib/lib";
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
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </div>
          </form>
            {/* <Button className="w-full mt-4" onClick={loginWithGoogle}>
              Login with Google
            </Button> */}
            <form
            action={async () => {
              "use server";
              // Call the action for the second form
              const  data  = await loginWithGoogle();
              // if (data && data.data.url) {
              //   redirect(data.data.url);
              // }
              // redirect("/home");
            }}
          >
            {/* Add your form fields here */}
            <Button className="w-full" type="submit">
              Google
            </Button>
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
          <div className="flex flex-col mt-6 justify-center">
            Don't have an account?{" "}
            <Link href="/signup" className="m-auto">
              <h2 className="text-blue-500">Sign up</h2>
            </Link>
          </div>
        </section>
      </Card>
    </div>
  );
}