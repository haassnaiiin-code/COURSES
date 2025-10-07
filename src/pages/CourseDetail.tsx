import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Users, Star, CheckCircle, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { courses } from "@/data/courses";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Course not found</h1>
            <Link to="/courses">
              <Button>Back to Courses</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        {/* Course Hero */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 md:py-20">
          <div className="container mx-auto px-4">
            <Link
              to="/courses"
              className="inline-flex items-center text-primary-foreground/90 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
                    {course.category}
                  </Badge>
                  <Badge className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
                    {course.difficulty}
                  </Badge>
                  {course.featured && (
                    <Badge className="bg-yellow-500 text-white">Featured</Badge>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {course.title}
                </h1>

                <p className="text-lg text-primary-foreground/90 mb-6">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{course.enrolled.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating} rating</span>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-primary-foreground/90">
                    Instructor:{" "}
                    <span className="font-semibold">{course.instructor}</span>
                  </p>
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="aspect-video bg-primary-foreground/20 rounded-lg mb-4 flex items-center justify-center">
                      <BookOpen className="h-20 w-20 text-primary-foreground/60" />
                    </div>
                    <Button
                      size="lg"
                      className="w-full mb-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    >
                      Start Course
                    </Button>
                    <p className="text-center text-sm text-primary-foreground/80">
                      100% Free • Lifetime Access
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Course Modules */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Course Content
                  </h2>
                  <div className="space-y-3">
                    {course.modules.map((module, index) => (
                      <Card
                        key={index}
                        className="hover:shadow-green transition-shadow"
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">
                              Module {index + 1}
                            </h3>
                            <p className="text-sm text-muted-foreground">{module}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* What You'll Learn */}
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    What You'll Learn
                  </h2>
                  <Card>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            Master the fundamentals and advanced concepts
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            Work on real-world projects and practical examples
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            Build a strong portfolio to showcase your skills
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            Get lifetime access to course materials
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-foreground mb-4">
                      Course Details
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Category</p>
                        <p className="font-medium text-foreground">{course.category}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Difficulty</p>
                        <p className="font-medium text-foreground">
                          {course.difficulty}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Duration</p>
                        <p className="font-medium text-foreground">{course.duration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Students Enrolled</p>
                        <p className="font-medium text-foreground">
                          {course.enrolled.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Rating</p>
                        <p className="font-medium text-foreground">
                          {course.rating} / 5.0
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Modules</p>
                        <p className="font-medium text-foreground">
                          {course.modules.length} lessons
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
