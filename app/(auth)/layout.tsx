import { Unbounded } from "next/font/google";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={"flex min-h-screen w-full justify-between font-inter"}>
      <div className="flex-1">{children}</div>
      <aside className="relative hidden w-[44%] min-h-screen items-center justify-center overflow-hidden bg-zinc-950 lg:flex">
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(600px_300px_at_80%_-10%,#ffffff0d,transparent),radial-gradient(400px_200px_at_10%_110%,#ffffff0a,transparent)]" />

        <div className="relative z-10 px-10 text-center">
          <h2
            className={`${unbounded.className} text-5xl font-extrabold leading-tight tracking-tight text-zinc-100`}
          >
            Manage your finances{" "}
            <span className="text-blue-700">confidently</span>
          </h2>
          <p className="mt-4 text-zinc-400">
            Zentro — personal financial dashboard
          </p>
        </div>
      </aside>
    </main>
  );
}
