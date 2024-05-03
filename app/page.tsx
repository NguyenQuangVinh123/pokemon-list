import { redirect } from "next/navigation";

export default function RootPage() {
  return redirect("/pokemon-list");
}
