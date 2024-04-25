import Link from "next/link";

function Navbar() {
  return (
    <div className="w-full p-2 flex items-center justify-end border rounded-full bg-black">
      <Link href="/sign-in">
        <button className="p-2 w-24 border rounded-full bg-green-500">Sign In</button>
      </Link>
    </div>
  );
}

export default Navbar;
