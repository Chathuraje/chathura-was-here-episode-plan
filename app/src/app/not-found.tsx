import Link from "next/link";

export default function NotFound() {
  return (
    <div className="empty-state">
      <div className="eyebrow">Not found</div>
      <h1>Nothing here</h1>
      <p>The requested concept or source file does not exist.</p>
      <Link className="button primary" href="/">Return to the library</Link>
    </div>
  );
}
