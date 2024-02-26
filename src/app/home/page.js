// import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import Sidebar from "./components/sidebar"
import Header from "./components/header"
import { getSession } from "../../lib/lib";
import dynamic from 'next/dynamic';
const FileUpload = dynamic(() => import('./components/fileuploader'), { ssr: false });
async function getFiles(){
  try {
    // const token = document.cookie.replace(/(?:(?:^|.*;\s*)signed_user_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const session = await getSession();
    let token = session.signed_user_token;
    const response = await fetch(`${process.env.BASE_URL}/api/v1/files`, {
      method: "GET",
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.json())

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Home(){
  let files = await getFiles();
  if (!files) {
    return <h1>Forbidden</h1>;
  }
  return (
    <div className="flex min-h-screen w-full">
        <Sidebar/>
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        {/* Sidebar content */}
      </div>
      
      {/* Main content */}
      <div className="flex flex-col w-full">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          {/* Header content */}
          <Header/>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Uploaded Files</h1>
            <Button className="ml-auto" size="sm">
              Upload
            </Button>
            <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Uploaded Files</h1>
            <FileUpload />
          </div>
          </div>
          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader> 
                <TableRow>
                  <TableHead className="w-[100px]">Filename</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file, index) => (
                  <TableRow key={index}>
                    <TableCell>{file.filename}</TableCell>
                    <TableCell>{file.filename.split('.').pop()}</TableCell>
                    {/* <TableCell>{file.key}</TableCell> */}
                    <TableCell>{(file.size / 1024).toFixed(3)} KB</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}

