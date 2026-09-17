import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="kicker">Not found</div>
      <h1>Nothing here</h1>
      <p className="lede">That ID or file does not exist in the current content folder.</p>
      <p><Link href="/">Back to the overview</Link> · <Link href="/search">Search</Link></p>
    </>
  );
}
