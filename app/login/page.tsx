import { Suspense } from "react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

function LoginFallback() {
  return (
    <div className="admin-login">
      <div className="admin-card admin-login__card">
        <p className="admin-login__desc">Loading sign-in...</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="admin-shell">
      <Suspense fallback={<LoginFallback />}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
