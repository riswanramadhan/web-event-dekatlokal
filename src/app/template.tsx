export default function PageTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="route-page-enter">{children}</div>;
}
