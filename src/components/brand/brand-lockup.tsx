import Image from "next/image";
import Link from "next/link";

type BrandLockupProps = {
  inverse?: boolean;
};

export function BrandLockup({ inverse = false }: BrandLockupProps) {
  return (
    <Link
      href="/"
      aria-label="DekatEvent., kembali ke beranda"
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
        className={`text-[1.05rem] font-normal tracking-[-0.035em] sm:text-[1.1rem] ${
          inverse ? "text-white" : "text-brand"
        }`}
      >
        DekatEvent.
      </span>
    </Link>
  );
}
