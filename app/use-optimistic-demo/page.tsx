import Link from "next/link";

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">useOptimistic Demo</h1>
      <div className="flex space-x-4">
        <Link href="/use-optimistic-demo/before" className="text-blue-500 hover:underline">
          Before
        </Link>
        <Link href="/use-optimistic-demo/after" className="text-blue-500 hover:underline">
          After
        </Link>
      </div>
    </div>
  );
}
