import Link from "next/link";
import { TableDemo } from "./Table";
import { Button } from "@/components/ui/button";

export default function Submissions() {
  return (
    <main className=" md:px-36 px-10  py-40 flex flex-col items-center justify-center">
      <p className="text-6xl text-amber-500 font-mono">Submissions</p>
      <TableDemo />

      <Link href="/">
        <Button className="mt-8">Home</Button>
      </Link>
    </main>
  );
}
