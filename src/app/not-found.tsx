import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golden Tides | Not Found",
  description: "Not Found",
};

const NotFoundPage = () => {
  return (
    <main className="notFound">
      <h1 className="notFound__title">404</h1>
      <p className="notFound__description">This page could not be found.</p>
    </main>
  );
};

export default NotFoundPage;
