import "./globals.css";

export const metadata = {
  title: "Ayushi Desai — Data Analyst & Analytics Engineer",
  description:
    "Ayushi Desai — Data Analyst turning messy, large-scale data into dashboards, reports, and pipelines that drive business decisions.",
  openGraph: {
    title: "Ayushi Desai — Data Analyst & Analytics Engineer",
    description:
      "SQL, Python, and dbt pipelines; Tableau/Power BI dashboards. MS Computer Science candidate at ASU (4.0 GPA).",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
