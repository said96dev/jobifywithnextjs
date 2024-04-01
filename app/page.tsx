import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import Image from "next/image"
import Logo from "../assets/logo.svg"
import Landing from "../assets/main.svg"
import Link from 'next/link';

export default function Home() {
  return (
    <main >
      <header className='max-w-6xl mx-auto px-4 sm:px-8 py-6'>
        <Image src={Logo} alt="Logo"></Image>
      </header>
      <section className='max-w-6xl px-4 mx-auto sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center'>
        <div>
          <h1 className='capitalize text-4xl md:text-7xl font-bold'>
            Job <span className='text-primary'>tracking</span>
          </h1>
          <p className='leading-loose max-w-md mt-4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, eius? Debitis nobis iusto tenetur possimus quae tempora! Ad, vero suscipit? Rerum, ex! Recusandae tempora deleniti nihil, quod soluta laboriosam. Eaque.
          </p>
          <Button asChild className='mt-4'>
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>
        <Image src={Landing} alt="Landing" className='hidden lg:block'></Image>

      </section>
    </main>
  );
}
