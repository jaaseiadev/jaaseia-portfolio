export default function Loading() {
  return (
    <main
      aria-busy="true"
      className="mx-auto w-full max-w-[680px] px-5 py-8 sm:px-8"
    >
      <p role="status" className="text-sm text-muted">
        Loading portfolio…
      </p>
    </main>
  );
}
