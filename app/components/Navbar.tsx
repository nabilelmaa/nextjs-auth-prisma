import Link from "next/link";

function Navbar() {
  return (
    <div className="max-w-full p-2 flex items-center justify-end border rounded-md bg-blue-100">
      <Link href="/sign-in">
        <button className="p-2 w-24 border rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300">Sign In</button>
      </Link>
    </div>
  );
}

export default Navbar;
