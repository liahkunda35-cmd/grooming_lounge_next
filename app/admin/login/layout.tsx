import { Suspense } from "react";

function LoginFallback() {
  return (
    <div className="admin-login">
      <div className="admin-card admin-login__card">
        <p className="admin-login__desc">Loading sign-in...</p>
      </div>
    </div>
  );
}

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoginFallback />}>{children}</Suspense>;
}
