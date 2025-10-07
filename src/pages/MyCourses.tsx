import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Clock } from 'lucide-react';
import { toast } from 'sonner';

const MyCourses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [activeSubscription, setActiveSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchUserCourses();
    fetchActiveSubscription();
  }, [user]);

  const fetchUserCourses = async () => {
    try {
      const { data: enrollments, error } = await supabase
        .from('enrollments')
        .select('*, courses(*)')
        .eq('user_id', user?.id);

      if (error) throw error;

      const coursesData = enrollments?.map((e: any) => e.courses) || [];
      setEnrolledCourses(coursesData);
    } catch (error: any) {
      toast.error('Failed to load your courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_active', true)
        .gte('end_date', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      setActiveSubscription(data);
    } catch (error: any) {
      console.error('Failed to load subscription:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your courses...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
              <GraduationCap className="h-8 w-8" />
              My Learning Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your enrolled courses and subscription status
            </p>
          </div>

          {/* Active Subscription Card */}
          {activeSubscription && (
            <div className="max-w-4xl mx-auto mb-8">
              <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="default" className="text-sm">Active</Badge>
                    Subscription Plan
                  </CardTitle>
                  <CardDescription>
                    You have unlimited access to all premium courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Plan Type</p>
                      <p className="font-semibold text-lg capitalize">
                        {activeSubscription.plan_type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-semibold">
                        {formatDate(activeSubscription.start_date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expires On</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatDate(activeSubscription.end_date)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Enrolled Courses */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {enrolledCourses.length > 0 ? 'Your Enrolled Courses' : 'No Courses Yet'}
            </h2>

            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Start Learning Today</h3>
                  <p className="text-muted-foreground mb-6">
                    Browse our courses and enroll to start your learning journey
                  </p>
                  <button
                    onClick={() => navigate('/courses')}
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90"
                  >
                    Browse Courses
                  </button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyCourses;
