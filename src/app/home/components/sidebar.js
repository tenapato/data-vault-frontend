import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { HomeIcon, UploadIcon, DownloadIcon, Package2Icon, BellIcon } from "./icons"; // Importing icon components from another file

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-[60px] items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <Package2Icon className="h-6 w-6" />
          <span className="">Data Vault</span>
        </Link>
        <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
          <BellIcon className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          <Link
            className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
            href="#"
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            <UploadIcon className="h-4 w-4" />
            Upload
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            <DownloadIcon className="h-4 w-4" />
            Download
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>Unlock all features and get unlimited access to our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="sm">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
