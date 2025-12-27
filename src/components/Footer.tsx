import { Lock, Github, Twitter } from "lucide-react";
import fitlockLogo from "@/assets/fitlock-logo.png";

const Footer = () => {
  const weeklyProgress = [
    { day: "M", completed: true },
    { day: "T", completed: true },
    { day: "W", completed: true },
    { day: "T", completed: true },
    { day: "F", completed: false },
    { day: "S", completed: false },
    { day: "S", completed: false },
  ];

  return (
    <footer id="stats" className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      {/* Weekly Progress Bar */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground">Weekly Progress</h3>
            <span className="text-sm text-muted-foreground">4/7 Days</span>
          </div>
          <div className="flex gap-2 justify-between">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={`w-full h-2 rounded-full transition-all duration-300 ${
                    day.completed 
                      ? 'bg-primary shadow-[0_0_10px_hsl(var(--primary)_/_0.5)]' 
                      : 'bg-muted'
                  }`}
                />
                <span className={`text-xs ${day.completed ? 'text-primary' : 'text-muted-foreground'}`}>
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={fitlockLogo} alt="FitLock Logo" className="h-8 w-8" />
                <span className="text-2xl font-bold glow-cyan">FitLock</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                Privacy-first fitness tracking powered by blockchain encryption. 
                Train hard, share less, own your data.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 FitLock. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <span>Powered by Web3 Wallet</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
