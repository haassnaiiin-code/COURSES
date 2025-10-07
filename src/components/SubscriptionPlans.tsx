import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const plans = [
    {
      id: 'monthly',
      name: '1 Month',
      price: 15,
      description: 'Perfect for trying out',
      features: [
        'Access to all premium courses',
        'Unlimited course enrollment',
        'Certificate of completion',
        'Priority support',
      ],
    },
    {
      id: 'quarterly',
      name: '3 Months',
      price: 35,
      description: 'Most popular choice',
      popular: true,
      features: [
        'Access to all premium courses',
        'Unlimited course enrollment',
        'Certificate of completion',
        'Priority support',
        'Save $10 compared to monthly',
      ],
    },
    {
      id: 'biannual',
      name: '6 Months',
      price: 55,
      description: 'Best value for money',
      features: [
        'Access to all premium courses',
        'Unlimited course enrollment',
        'Certificate of completion',
        'Priority support',
        'Save $35 compared to monthly',
        'Exclusive content access',
      ],
    },
  ];

  const handleSubscribe = (planId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(`/checkout?plan=${planId}`);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-accent/10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Subscription Plans
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get unlimited access to all premium courses with our flexible subscription plans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.popular
                  ? 'border-primary shadow-green-lg scale-105'
                  : 'hover:shadow-green transition-all'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}

              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">${plan.price}</span>
                  <span className="text-muted-foreground ml-2">one-time</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                >
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            All subscriptions provide lifetime access during the subscription period
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
