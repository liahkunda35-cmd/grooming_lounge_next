import { ReactNode } from "react";

type AdminPageHeaderProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  message?: string;
  children?: ReactNode;
};

export default function AdminPageHeader({
  title,
  description,
  actionLabel,
  onAction,
  message,
  children,
}: AdminPageHeaderProps) {
  return (
    <section className="admin-card admin-page-header">
      <div className="admin-page-header__row">
        <div>
          <h1 className="section__title">{title}</h1>
          <p className="section__desc">{description}</p>
          {message ? <p className="form-success">{message}</p> : null}
        </div>
        <div className="admin-page-header__actions">
          {children}
          {actionLabel && onAction ? (
            <button type="button" className="btn btn--primary" onClick={onAction}>
              {actionLabel}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
