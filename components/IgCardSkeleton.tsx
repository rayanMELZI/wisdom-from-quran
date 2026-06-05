export default function IgCardSkeleton() {
  return (
    <div
      className="glass reveal in"
      style={{ borderRadius: "var(--r-lg)", padding: "24px" }}
    >
      {/* Top row skeleton */}
      <div className="flex items-center gap-4">
        {/* Avatar circle */}
        <div
          className="flex-none rounded-full"
          style={{
            width: 74,
            height: 74,
            background: "rgba(105,192,230,0.08)",
            animation: "skeletonPulse 1.6s ease-in-out infinite",
          }}
        />
        <div className="flex-1 flex flex-col gap-2">
          <div
            style={{
              height: 18,
              width: "60%",
              borderRadius: 6,
              background: "rgba(105,192,230,0.08)",
              animation: "skeletonPulse 1.6s ease-in-out infinite",
            }}
          />
          <div
            style={{
              height: 13,
              width: "40%",
              borderRadius: 6,
              background: "rgba(105,192,230,0.06)",
              animation: "skeletonPulse 1.6s ease-in-out infinite 0.2s",
            }}
          />
          <div
            style={{
              height: 13,
              width: "50%",
              borderRadius: 6,
              background: "rgba(105,192,230,0.06)",
              animation: "skeletonPulse 1.6s ease-in-out infinite 0.4s",
            }}
          />
        </div>
      </div>

      {/* Stats row skeleton */}
      <div className="flex gap-6 my-[18px]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div
              style={{
                height: 20,
                width: 40,
                borderRadius: 4,
                background: "rgba(105,192,230,0.08)",
                animation: `skeletonPulse 1.6s ease-in-out infinite ${i * 0.15}s`,
              }}
            />
            <div
              style={{
                height: 13,
                width: 32,
                borderRadius: 4,
                background: "rgba(105,192,230,0.05)",
                animation: `skeletonPulse 1.6s ease-in-out infinite ${i * 0.15 + 0.1}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Thumbnails grid skeleton */}
      <div
        className="grid mb-[18px]"
        style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              borderRadius: 10,
              aspectRatio: "1",
              background: "rgba(105,192,230,0.07)",
              animation: `skeletonPulse 1.6s ease-in-out infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Buttons skeleton */}
      <div className="flex gap-2.5">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              height: 44,
              borderRadius: 999,
              background: "rgba(105,192,230,0.07)",
              animation: `skeletonPulse 1.6s ease-in-out infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes skeletonPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
