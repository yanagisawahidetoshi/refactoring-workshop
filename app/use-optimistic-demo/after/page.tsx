import { AfterDemo } from "../components/AfterDemo";

export default function After() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">After: useOptimisticあり</h1>
      <AfterDemo />
    </div>
  );
}
