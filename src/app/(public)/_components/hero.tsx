import { Button } from '@/components/ui/button';
import Image from 'next/image';
import doctorImage from '../../../../public/doctor-hero.png';

export function Hero() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">
        <main className="flex items-center justify-center">
          <article className="flex-[2] max-w-3xl flex flex-col justify-center space-y-8 ">
            <h1 className="text-4xl font-bold lg:text-5xl max-w-2xl tracking-tight">
              Encontre os melhores profissionais em um só lugar
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Nós somos uma plataforma para profissionais da sáude com foco em
              agilizar seu atendimento de forma simplificada e organizada
            </p>
            <Button className="bg-emerald-500 hover:bg-emerald-400 w-fit px-5 font-semibold">
              Encontre uma clinica
            </Button>
          </article>

          <div className="hidden lg:block">
            <Image
              src={doctorImage}
              alt="foto ilustrativa"
              width={340}
              height={400}
              quality={100}
              priority={true}
              className="object-contain"
            />
          </div>
        </main>
      </div>
    </section>
  );
}
