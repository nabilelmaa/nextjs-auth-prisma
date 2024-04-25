import Link from 'next/link';

function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Our Website!</h1>
        <div className="flex justify-center space-x-4">
          <Link href="/sign-in">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
