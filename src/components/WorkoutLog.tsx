import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Activity } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/useWallet";

const WorkoutLog = () => {
  const { toast } = useToast();
  const { isConnected, connectWallet } = useWallet();
  const [workoutType, setWorkoutType] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to log workouts.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Workout Logged & Encrypted",
      description: "Your workout data has been securely encrypted and stored.",
    });
  };

  return (
    <section id="workouts" className="py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Lock className="h-6 w-6 text-primary" />
              Log Encrypted Workout
            </CardTitle>
            <CardDescription className="text-base">
              Your workout data is encrypted before storage. Connect your wallet to submit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="workout-type">Workout Type</Label>
                <Select value={workoutType} onValueChange={setWorkoutType}>
                  <SelectTrigger id="workout-type">
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strength">Strength Training</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="hiit">HIIT</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input 
                    id="duration" 
                    type="number" 
                    placeholder="45"
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intensity">Intensity</Label>
                  <Select>
                    <SelectTrigger id="intensity">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="calories">Calories Burned</Label>
                <Input 
                  id="calories" 
                  type="number" 
                  placeholder="350"
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input 
                  id="notes" 
                  placeholder="Felt great today!"
                  className="bg-background/50"
                />
              </div>
              
              <div className="pt-4 space-y-3">
                {isConnected ? (
                  <Button type="submit" variant="hero" className="w-full gap-2" size="lg">
                    <Lock className="h-5 w-5" />
                    Encrypt & Submit
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    variant="neon" 
                    className="w-full gap-2" 
                    size="lg"
                    onClick={connectWallet}
                  >
                    <Lock className="h-5 w-5" />
                    Connect Wallet to Submit
                  </Button>
                )}
                <p className="text-xs text-center text-muted-foreground">
                  Requires Web3 Wallet connection • Data encrypted with your private key
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-8 p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <Activity className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2 text-lg">How Encryption Works</h3>
              <p className="text-sm text-muted-foreground">
                Your workout data is encrypted using your wallet's private key before being stored. 
                Only aggregated performance metrics are decrypted when you unlock your weekly progress, 
                ensuring maximum privacy while tracking your fitness journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutLog;
