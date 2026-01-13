import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h1>useTransition Demo</h1>
      <ul>
        <li>
          <Link href="/use-transition-demo/before">Before</Link>
        </li>
        <li>
          <Link href="/use-transition-demo/after">After</Link>
        </li>
      </ul>
    </div>
  );
}