const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header kan också läggas till här om du har en gemensam header */}
        <main className="flex-grow container mx-auto px-4 md:px-8 max-w-7xl w-full">
          {children}
        </main>
        {/* Footer kan läggas till här om du har en gemensam footer */}
      </div>
    );
  };
  
  export default Layout;
  