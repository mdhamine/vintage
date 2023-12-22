import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductsPageLoading() {
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols3 lg:grid-cols-4 gap-4">
        {Array(5)
          .fill(" ")
          .map((el, idx) => (
            <SkeletonTheme
              baseColor="#FFFFFF60"
              highlightColor="#c9c9c9bf"
              key={idx}
            >
              <div className="bg-gray-400/30 relative rounded-xl opverflow-hidden">
                <>
                  <div className="h-32 p-2">
                    <Skeleton className="block h-28 rounded-xl" />
                  </div>
                  <div className="p-1.5">
                    <div className="line-clamp-2 font-semibold">
                      <Skeleton />
                    </div>
                    <Skeleton />
                    <Skeleton className="w-1/2 block" />
                  </div>
                </>
              </div>
            </SkeletonTheme>
          ))}
      </div>
    </div>
  );
}
