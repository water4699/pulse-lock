import { Button } from "@/components/ui/button";
import { Lock, CheckCircle } from "lucide-react";
import fitlockLogo from "@/assets/fitlock-logo.png";
import { useWallet } from "@/hooks/useWallet";

const Header = () => {
  const { address, isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <img src={fitlockLogo} alt="FitLock Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold glow-cyan">FitLock</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('dashboard')} 
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Dashboard
          </button>
          <button 
            onClick={() => scrollToSection('workouts')} 
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Workouts
          </button>
          <button 
            onClick={() => scrollToSection('stats')} 
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Stats
          </button>
        </nav>
        
        {isConnected ? (
          <Button 
            variant="neon" 
            size="sm" 
            className="gap-2"
            onClick={disconnectWallet}
          >
            <CheckCircle className="h-4 w-4" />
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </Button>
        ) : (
          <Button 
            variant="neon" 
            size="sm" 
            className="gap-2"
            onClick={connectWallet}
            disabled={isConnecting}
          >
            <Lock className="h-4 w-4" />
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
