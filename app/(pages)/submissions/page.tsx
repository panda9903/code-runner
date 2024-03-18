import { DataTableDemo } from "./Table";

export default function Submissions() {
  return (
    <main className=" px-64 py-40 flex flex-col items-center justify-center">
      <p className="text-6xl text-amber-500 font-mono">Submissions</p>
      <DataTableDemo />
    </main>
  );
}
