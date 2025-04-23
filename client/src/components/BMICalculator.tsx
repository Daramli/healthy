import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface BMIResult {
  bmi: string;
  category: string;
  recommendations: string[];
}

const BMICalculator = () => {
  const { t } = useTranslation();
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);

  const formSchema = z.object({
    height: z.string().min(1, { message: t("requiredField") }).transform(v => parseFloat(v)),
    weight: z.string().min(1, { message: t("requiredField") }).transform(v => parseFloat(v)),
    age: z.string().min(1, { message: t("requiredField") }).transform(v => parseInt(v)),
    gender: z.enum(["male", "female"])
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: "",
      weight: "",
      age: "",
      gender: "male"
    }
  });

  const calculateBMI = useMutation({
    mutationFn: async (data: { height: number; weight: number; age: number; gender: string }) => {
      const res = await apiRequest("POST", "/api/bmi-calculator", data);
      return res.json();
    },
    onSuccess: (data: BMIResult) => {
      setBmiResult(data);
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    calculateBMI.mutate(data);
  };

  return (
    <section id="bmi-calculator" className="py-16">
      <div className="container mx-auto px-4">
        <div className="md:flex items-center gap-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t("bmi.title")}
            </h2>
            <p className="text-lg mb-6">
              {t("bmi.subtitle")}
            </p>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("bmi.height")}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="175" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("bmi.weight")}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="70" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("bmi.age")}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="30" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>{t("bmi.gender")}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4 rtl:space-x-reverse"
                          >
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">{t("bmi.male")}</Label>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">{t("bmi.female")}</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-accent text-white py-3 rounded-lg font-medium transition-colors"
                    disabled={calculateBMI.isPending}
                  >
                    {calculateBMI.isPending ? t("loading") : t("bmi.calculate")}
                  </Button>
                </form>
              </Form>
              
              {bmiResult && (
                <div className="mt-6">
                  <div className="p-4 rounded-lg bg-secondary">
                    <h3 className="font-bold text-xl text-primary">
                      {t("bmi.yourBMI")}
                      <span className="text-accent ml-2">{bmiResult.bmi}</span>
                    </h3>
                    <p className="text-gray-700 mt-1">
                      {bmiResult.category}
                    </p>
                    <div className="mt-4">
                      <h4 className="font-medium text-primary">
                        {t("bmi.recommendations")}
                      </h4>
                      <ul className="mt-2 space-y-1 text-sm text-gray-700">
                        {bmiResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-center">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 text-success mr-2" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path 
                                fillRule="evenodd" 
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                clipRule="evenodd" 
                              />
                            </svg>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=600&h=500&fit=crop" 
              alt="Healthy lifestyle" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-primary mr-3" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <h3 className="font-bold text-primary">
                      {t("bmi.trainingPlans")}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {t("bmi.trainingPlansDesc")}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-primary mr-3" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <h3 className="font-bold text-primary">
                      {t("bmi.dietPlans")}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {t("bmi.dietPlansDesc")}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-primary mr-3" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
                      />
                    </svg>
                    <h3 className="font-bold text-primary">
                      {t("bmi.healthTracking")}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {t("bmi.healthTrackingDesc")}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-primary mr-3" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                      />
                    </svg>
                    <h3 className="font-bold text-primary">
                      {t("bmi.expertAdvice")}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {t("bmi.expertAdviceDesc")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;
