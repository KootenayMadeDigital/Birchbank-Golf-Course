export default function Loading() {
  return (
    <div className="min-h-[60vh] pt-40 container-edge">
      <p className="eyebrow text-silt">Loading</p>
      <div className="mt-8 space-y-4 max-w-3xl">
        <div className="h-14 bg-granite/5 animate-pulse rounded-sm" />
        <div className="h-5 bg-granite/5 animate-pulse rounded-sm w-5/6" />
        <div className="h-5 bg-granite/5 animate-pulse rounded-sm w-4/6" />
      </div>
    </div>
  );
}
