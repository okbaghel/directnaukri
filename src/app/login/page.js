import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic"; // optional — disables SSG if needed

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
