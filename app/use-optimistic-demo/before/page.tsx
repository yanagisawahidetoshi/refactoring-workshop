import { BeforeDemo } from "../components/BeforeDemo";

export default function Before() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Before: useOptimisticなし</h1>
      <BeforeDemo />
    </div>
  );
}
