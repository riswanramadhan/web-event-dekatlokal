import Image from "next/image";
import Link from "next/link";

type BrandLockupProps = {
  inverse?: boolean;
};

export function BrandLockup({ inverse = false }: BrandLockupProps) {
  return (
    <Link
      href="/"
      aria-label="DekatEvent, kembali ke beranda"
      className="inline-flex min-h-11 items-center gap-2 rounded-lg focus-visible:outline-none"
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
        className="inline-flex text-[1.05rem] font-medium tracking-[-0.045em] sm:text-[1.1rem]"
      >
        <span className={inverse ? "text-brand-100" : "text-brand"}>Dekat</span>
        <span className={inverse ? "text-white" : "text-ink"}>Event</span>
      </span>
    </Link>
  );
}
