import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem } from './form';
import { Input } from './input';
import { Button } from './button';

const emailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type FormData = z.infer<typeof emailSchema>;

const NewsletterSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Here you would normally call an API to register the email
      // For this demo, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-[#2C5F2D]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-heading">
            Stay updated with seasonal farming tips
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-white opacity-90">
            Sign up for our newsletter to receive timely updates on planting guides, market trends, and expert advice.
          </p>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="sm:flex">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2C5F2D] focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#2C5F2D] bg-[#FFFBE6] hover:bg-gray-100"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
            </form>
          </Form>
          <p className="mt-3 text-sm text-white opacity-75">
            We care about your data. Read our <a href="#" className="font-medium text-white underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
