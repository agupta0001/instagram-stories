import Image from "next/image";

export default function Spinner() {
  return (
    <Image
      data-testid="spinner"
      src="/spinner.svg"
      alt="Loading Spinner"
      width={40}
      height={40}
      className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
    />
  );
}
