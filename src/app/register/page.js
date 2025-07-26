// app/register/page.js
import { Suspense } from "react";
import RegisterForm from "./RegisterForm";

export const dynamic = "force-dynamic"; // Optional: disables static optimization

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
