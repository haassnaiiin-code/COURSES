import { Link, useNavigate } from "react-router-dom";
import { Clock, Users, Star, BookOpen, Lock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface CourseCardProps {
  course: any;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (course.is_premium) {
      navigate(`/checkout/${course.id}`);
    } else {
      navigate(`/course/${course.id}`);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-green-lg transition-all duration-300 h-full flex flex-col">
      <CardHeader className="p-0 relative overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/20 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="h-16 w-16 text-primary/40 group-hover:scale-110 transition-transform" />
          </div>
          {course.featured && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {course.category}
            </Badge>
            {course.is_premium ? (
              <Badge variant="default" className="text-xs flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Premium ${course.price}
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs">
                Free
              </Badge>
            )}
          </div>
          <Badge
            variant="secondary"
            className={`text-xs ${
              course.difficulty === "Beginner"
                ? "bg-green-100 text-green-800"
                : course.difficulty === "Intermediate"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {course.difficulty}
          </Badge>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-3.5 w-3.5" />
            <span>{course.enrolled.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Instructor: <span className="font-medium">{course.instructor}</span>
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0 gap-2">
        <Link to={`/course/${course.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Button onClick={handleEnrollClick} className="flex-1 group-hover:bg-primary/90">
          {course.is_premium ? 'Enroll $' + course.price : 'Enroll Free'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
