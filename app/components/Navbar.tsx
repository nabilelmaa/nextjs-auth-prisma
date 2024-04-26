import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <div className="max-w-full p-2 flex items-center justify-between border shadow-md rounded-md bg-gray-100">
      <Link href="/">
        <Image
          src="/cover.png"
          alt="logo"
          width={35}
          height={35}
          className="ml-4"
        />
      </Link>

      <Link href="/sign-in">
        <button className="p-2 w-24 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
          Sign In
        </button>
      </Link>
    </div>
  );
}

export default Navbar;
