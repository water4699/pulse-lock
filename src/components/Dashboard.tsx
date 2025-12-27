import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Lock, TrendingUp, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const performanceData = [
  { day: "Mon", encrypted: 85, decrypted: 0 },
  { day: "Tue", encrypted: 92, decrypted: 0 },
  { day: "Wed", encrypted: 88, decrypted: 0 },
  { day: "Thu", encrypted: 95, decrypted: 0 },
  { day: "Fri", encrypted: 90, decrypted: 90 },
  { day: "Sat", encrypted: 97, decrypted: 97 },
  { day: "Sun", encrypted: 93, decrypted: 93 },
];

const workoutTypes = [
  { type: "Strength", count: 12 },
  { type: "Cardio", count: 8 },
  { type: "HIIT", count: 5 },
  { type: "Yoga", count: 3 },
];

const Dashboard = () => {
  return (
    <section id="dashboard" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your <span className="glow-cyan">Progress</span> Board
          </h2>
          <p className="text-muted-foreground text-lg">
            Encrypted until you're ready to unlock
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Activity, label: "Weekly Workouts", value: "28", color: "primary" },
            { icon: Lock, label: "Encrypted Logs", value: "156", color: "secondary" },
            { icon: TrendingUp, label: "Progress", value: "+12%", color: "primary" },
            { icon: Zap, label: "Streak Days", value: "14", color: "secondary" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-5 w-5 text-${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${stat.color === 'primary' ? 'glow-cyan' : 'glow-green'}`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Weekly Performance
              </CardTitle>
              <CardDescription>
                Data decrypts when you hit your weekly goal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="encrypted" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="decrypted" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--secondary))', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-secondary" />
                Workout Distribution
              </CardTitle>
              <CardDescription>
                This week's encrypted activity breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workoutTypes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--secondary))"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
