import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />

      {children}
    </>
  );
}
