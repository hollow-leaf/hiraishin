import NavBar from "@/components/navbar";
import SwitchBar from "@/components/switcherBar";

export default function Page() {
  return (
    <div className="bg-white">
      <NavBar />
      <div>
        <h1 className="text-3xl font-bold mt-20 ">About</h1>
        <p className="mt-4">
          This is a demo of a Next.js app with a mix of TypeScript and
          JavaScript.
        </p>
      </div>
      <SwitchBar />
    </div>
  );
}
