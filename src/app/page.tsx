import Navbar from "@/components/Navbar";
import { ThreeDCardDemo } from "@/components/cards";
import Image from "next/image";

export default function Home() {
  return (
    <div className="m-5">
      <div className="flex flex-wrap justify-between items-center">
        <ThreeDCardDemo
          title="Unir PDF"
          description="Unir dos o mas pdfs sin perder calidad"
          image="https://dax-ec.ru/imgs/UnirPdf.png"
          link="/unir"
        />
        <ThreeDCardDemo
          title="Comprimir PDF"
          description="Comprimir PDFs sin perder calidad"
          image="https://dax-ec.ru/imgs/ComprimirPdf.png"
          link="/comprimir"
        />
        <ThreeDCardDemo
          title="Separar PDF"
          description="separar PDFs sin perder calidad"
          image="https://dax-ec.ru/imgs/SepararPdf.png"
          link="/separar"
        />
      </div>
    </div>
  );
}
