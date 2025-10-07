import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Upload, MessageCircle } from 'lucide-react';

const Checkout = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const subscriptionPlan = searchParams.get('plan');
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('jazzcash');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (courseId) {
      fetchCourse();
    }
  }, [courseId, user]);

  const fetchCourse = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();

    if (error) {
      toast.error('Failed to load course');
      return;
    }

    setCourse(data);
  };

  const getAmount = () => {
    if (subscriptionPlan) {
      if (subscriptionPlan === 'monthly') return 15;
      if (subscriptionPlan === 'quarterly') return 35;
      if (subscriptionPlan === 'biannual') return 55;
    }
    return course?.price || 2;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshotFile(e.target.files[0]);
    }
  };

  const handleSubmitPayment = async () => {
    if (!screenshotFile) {
      toast.error('Please upload payment screenshot');
      return;
    }

    setUploading(true);

    try {
      // Upload screenshot to storage (we'll implement this next)
      const fileExt = screenshotFile.name.split('.').pop();
      const fileName = `${user?.id}_${Date.now()}.${fileExt}`;
      const filePath = `payment-screenshots/${fileName}`;

      // For now, we'll use a placeholder URL
      const screenshotUrl = filePath;

      // Insert payment verification record
      const { error } = await supabase
        .from('payment_verifications')
        .insert({
          user_id: user?.id,
          course_id: subscriptionPlan ? null : courseId,
          subscription_plan: subscriptionPlan || null,
          payment_method: paymentMethod,
          amount: getAmount(),
          screenshot_url: screenshotUrl,
          status: 'pending',
        });

      if (error) throw error;

      toast.success('Payment submitted! You will get access within 15 minutes after verification.');
      navigate('/my-courses');
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit payment');
    } finally {
      setUploading(false);
    }
  };

  const whatsappNumber = '+1234567890'; // Replace with your actual number

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Complete Your Purchase</CardTitle>
              <CardDescription>
                {subscriptionPlan
                  ? `Subscribe to access all premium courses`
                  : `Enroll in ${course?.title}`}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Order Summary */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                <div className="flex justify-between text-sm">
                  <span>
                    {subscriptionPlan
                      ? `${subscriptionPlan.charAt(0).toUpperCase() + subscriptionPlan.slice(1)} Subscription`
                      : course?.title}
                  </span>
                  <span className="font-semibold">${getAmount()}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3">
                <Label>Select Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="jazzcash" id="jazzcash" />
                    <Label htmlFor="jazzcash" className="cursor-pointer">JazzCash</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="easypaisa" id="easypaisa" />
                    <Label htmlFor="easypaisa" className="cursor-pointer">Easypaisa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nayapay" id="nayapay" />
                    <Label htmlFor="nayapay" className="cursor-pointer">NayaPay</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sadapay" id="sadapay" />
                    <Label htmlFor="sadapay" className="cursor-pointer">SadaPay</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Upload Screenshot */}
              <div className="space-y-3">
                <Label htmlFor="screenshot">Upload Payment Screenshot</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="screenshot"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="flex-1"
                  />
                  {screenshotFile && (
                    <span className="text-sm text-muted-foreground">
                      {screenshotFile.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> You will get access to your course within 15 minutes after payment verification.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleSubmitPayment}
                  disabled={!screenshotFile || uploading}
                  size="lg"
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {uploading ? 'Submitting...' : 'Submit Payment'}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Support on WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
