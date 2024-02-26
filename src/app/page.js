import Link from 'next/link';

const MyComponent = () => (
  <div>
    <Link href="/home">
      <h1>Home</h1>
    </Link>
    <Link href="/login">
      <h1>Log In</h1>
    </Link>
  </div>
);

export default MyComponent;
