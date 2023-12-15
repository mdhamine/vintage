import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function ProductInfoLoading() {
  return (
    <>
      <SkeletonTheme baseColor="#feddf1" highlightColor="#fbbce37a">
        <div>
          <Skeleton className="block h-60 rounded-[40px] mt-8" />
        </div>
        <div className="mb-4 mt-2">
          <p className="text-brand-primary text-xl font-semibold">
            <Skeleton />
          </p>
          <p className="mt-1">
            <Skeleton />
            <Skeleton className="max-w-[50%]" />
          </p>
        </div>

        <p className="">
          <Skeleton className="max-w-[50%]" />
        </p>
      </SkeletonTheme>
    </>
  );
}
