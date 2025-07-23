import Image from "next/image";

const Header = () => {
  return (
    <div className="bg-transparent w-full h-[50px] flex items-center px-2">
      <Image src="/geo_logo.png" alt="logo" width={32} height={32} className="rounded-full" />
      <div className="text-[var(--black)] text-xl font-bold ml-2">aeo project</div>
    </div>
  );
};

export default Header;
