import { Target, Users, Heart, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: BookOpen,
      title: "Quality Education",
      description:
        "We believe everyone deserves access to high-quality educational content, regardless of their financial situation.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Our platform is built by learners, for learners. We foster a supportive community that grows together.",
    },
    {
      icon: Heart,
      title: "Passion for Learning",
      description:
        "We're passionate about making learning accessible, enjoyable, and effective for everyone around the world.",
    },
    {
      icon: Target,
      title: "Career Growth",
      description:
        "We help learners acquire the skills they need to advance their careers and achieve their professional goals.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About LearnHub
              </h1>
              <p className="text-lg text-muted-foreground">
                Empowering learners worldwide with free, high-quality online education
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Our Mission
              </h2>
              <Card className="shadow-green-lg">
                <CardContent className="p-8 md:p-12">
                  <p className="text-lg text-muted-foreground mb-6">
                    At LearnHub, we believe that education is a fundamental right, not a
                    privilege. Our mission is to democratize learning by providing
                    completely free access to world-class courses taught by industry
                    experts.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">
                    We're committed to breaking down barriers to education and creating
                    opportunities for learners from all backgrounds to develop new skills,
                    advance their careers, and achieve their dreams.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Since our launch, we've helped over 50,000 students across the globe
                    learn new skills and transform their lives through education.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-background to-accent/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="hover:shadow-green-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Our Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center shadow-green">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-primary mb-2">100+</div>
                  <p className="text-muted-foreground">Free Courses</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-green">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                  <p className="text-muted-foreground">Active Learners</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-green">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-primary mb-2">95%</div>
                  <p className="text-muted-foreground">Satisfaction Rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
