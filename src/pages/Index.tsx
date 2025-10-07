import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import { courses } from "@/data/courses";

const Index = () => {
  const featuredCourses = courses.filter((course) => course.featured).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-accent/20 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iaHNsKDE1MSAyMSUgMjMlIC8gMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Learn Anything,
              <span className="text-primary"> Anytime</span>,
              <br />
              <span className="text-primary">Anywhere</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover 100+ free online courses taught by industry experts. Start your learning
              journey today and unlock your potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" className="text-base px-8 shadow-green-lg group">
                  Browse Free Courses
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 border-2"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-scale-in">
              <BookOpen className="h-10 w-10 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">100+</div>
              <div className="text-sm opacity-90">Free Courses</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <Users className="h-10 w-10 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">50K+</div>
              <div className="text-sm opacity-90">Active Learners</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <Award className="h-10 w-10 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">95%</div>
              <div className="text-sm opacity-90">Satisfaction Rate</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <Clock className="h-10 w-10 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-sm opacity-90">Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked courses to kickstart your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {featuredCourses.map((course, index) => (
              <div
                key={course.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/courses">
              <Button size="lg" variant="outline" className="border-2">
                View All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <SubscriptionPlans />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of learners already advancing their careers with our free courses.
            </p>
            <Link to="/courses">
              <Button size="lg" className="text-base px-8 shadow-green-lg">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
