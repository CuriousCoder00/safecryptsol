

export default function WalletLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="max-w-screen-2xl overflow-hidden">
{children}
      </div>
    );
  }