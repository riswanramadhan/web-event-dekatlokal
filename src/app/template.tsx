export default function PageTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="route-page-enter motion-reduce:animate-none">{children}</div>
  );
}
