import "./portal.css";

export const metadata = { title: "Teacher Portal | Elaaf School", robots: { index: false, follow: false } };

export default function PortalLayout({ children }) {
  return <div className="pt-root">{children}</div>;
}
