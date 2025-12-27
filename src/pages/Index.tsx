import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import WorkoutLog from "@/components/WorkoutLog";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Dashboard />
        <WorkoutLog />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
