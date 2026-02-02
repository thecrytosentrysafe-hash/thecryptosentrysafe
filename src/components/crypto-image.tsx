import Image from "next/image";

function CryptoImage({ src, alt, networkSrc, network }: { src: string, alt: string, networkSrc: string | null, network: string | null }) {
  return (
    <div className="relative inline-block" style={{ width: 40, height: 40 }}>
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover"
      />
      {networkSrc && (
        <NetworkBadge
          src={networkSrc}
          alt={`${network || ""} Network`}
        />
      )}
    </div>
  );
}

function NetworkBadge({
  src,
  alt
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="absolute bottom-0 right-0 h-4 w-4">
      <Image
        src={src}
        alt={alt}
        width={15}
        height={15}
        className="border border-gray-300 bg-white h-4 w-4 rounded-full"
      />
    </div>
  );
}

export default CryptoImage