import Image from "next/image";
import Link from "next/link";

type BrandLockupProps = {
  compact?: boolean;
  inverse?: boolean;
};

export function BrandLockup({
  compact = false,
  inverse = false,
}: BrandLockupProps) {
  return (
    <Link
      href="/"
      aria-label="DekatLokal Event, kembali ke beranda"
      className="inline-flex min-h-11 items-center gap-2.5 rounded-lg"
    >
      <Image
        src="/dekatlokal-mark.png"
        alt=""
        width={512}
        height={512}
        priority
        className="h-9 w-9"
      />
      <span
        className={`tracking-[-0.025em] ${inverse ? "text-white" : "text-ink"}`}
      >
        <span className="text-[0.94rem] font-bold">DekatLokal</span>
        {!compact ? (
          <span className={`ml-1.5 text-sm font-medium ${inverse ? "text-white/72" : "text-brand"}`}>
            Event
          </span>
        ) : null}
      </span>
    </Link>
  );
}
