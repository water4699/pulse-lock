import { Button } from "@/components/ui/button";
import { Lock, TrendingUp } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      
      {/* Animated pulse lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="pulse-line absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <div className="pulse-line absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" style={{ animationDelay: '0.5s' }} />
        <div className="pulse-line absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Privacy-First Fitness Tracking</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="glow-cyan">Train Hard.</span>
            <br />
            <span className="glow-green">Share Less.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Log encrypted workout data. Unlock progress with aggregated performance. Your fitness journey, your privacy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              variant="hero" 
              size="xl" 
              className="gap-2 min-w-[200px]"
              onClick={() => {
                const element = document.getElementById('workouts');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Lock className="h-5 w-5" />
              Start Training
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="gap-2 min-w-[200px]"
              onClick={() => {
                const element = document.getElementById('dashboard');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <TrendingUp className="h-5 w-5" />
              View Dashboard
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
              { label: "Encrypted Logs", value: "100%" },
              { label: "Active Users", value: "2.5K+" },
              { label: "Workouts Logged", value: "45K+" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)_/_0.2)]">
                <div className="text-3xl md:text-4xl font-bold glow-cyan mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
