import { useState, useMemo, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const COURSES_PER_PAGE = 12;

const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCourses(data || []);
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(data?.map((c: any) => c.category) || [])];
      setCategories(uniqueCategories as string[]);
    } catch (error: any) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === "All" || course.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [courses, searchQuery, selectedCategory, selectedDifficulty]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const endIndex = startIndex + COURSES_PER_PAGE;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading courses...</p>
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
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Explore Our Courses
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Browse through {courses.length}+ free courses across multiple categories
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-base rounded-xl shadow-green"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              </div>

              {/* Category Filters */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Difficulty Filters */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Difficulty Level
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["All", "Beginner", "Intermediate", "Advanced"].map((difficulty) => (
                    <Badge
                      key={difficulty}
                      variant={
                        selectedDifficulty === difficulty ? "default" : "outline"
                      }
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setSelectedDifficulty(difficulty)}
                    >
                      {difficulty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedCategory !== "All" ||
                selectedDifficulty !== "All" ||
                searchQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedDifficulty("All");
                    setSearchQuery("");
                  }}
                  className="mt-4"
                >
                  Clear All Filters
                </Button>
              )}
            </div>

            {/* Results */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredCourses.length} course
                {filteredCourses.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Course Grid */}
            {currentCourses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage > 1) setCurrentPage(currentPage - 1);
                            }}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                          />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                            }}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="bg-muted/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No courses found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedDifficulty("All");
                    setSearchQuery("");
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Subscription Plans Section */}
        <SubscriptionPlans />
      </div>

      <Footer />
    </div>
  );
};

export default Courses;
