import Image from "next/image";
import ClientPage from "./ClientPage";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  return (
    <>
      <ClientPage />
      <Analytics />
    </>
  );
}
