import Link from 'next/link';
import { redirect } from "next/navigation";
const MyComponent = () => (

  redirect("/login")
  // <div>
  //   <Link href="/home">
  //     <h1>Home</h1>
  //   </Link>
  //   <Link href="/login">
  //     <h1>Log In</h1>
  //   </Link>
  // </div>
);

export default MyComponent;
