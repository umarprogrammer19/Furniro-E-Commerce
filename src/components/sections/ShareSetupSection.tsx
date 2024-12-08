import Image from "next/image";
import React from "react";

function ShareSetupSection() {
  return (
    <section>
      <div>
        <p className="text-[32px] font-bold text-center">
          Share your setup with
        </p>
        <p className="text-20 text-customGray text-center">#FuniroFurniture</p>
      </div>
      <div className="">
        <Image
          src="/images/share_your_setup.png"
          alt="share setup"
          width={500}
          height={500}
          className="w-full"
        />
      </div>
    </section>
  );
}

export default ShareSetupSection;
