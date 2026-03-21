export default function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4">
        {children}
      </div>
    </section>
  );
}