import { useTranslation } from "react-i18next";
import Hero from "@/components/Hero";
import BMICalculator from "@/components/BMICalculator";
import CorporateOffers from "@/components/CorporateOffers";
import { useQuery } from "@tanstack/react-query";
import { Meal, Product } from "@shared/schema";
import ItemCard from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Home = () => {
  const { t } = useTranslation();
  
  const { data: featuredMeals, isLoading: isLoadingMeals } = useQuery<Meal[]>({
    queryKey: ['/api/meals'],
  });
  
  const { data: featuredProducts, isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Meals Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">
              {t("menu.title")}
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              {t("menu.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingMeals ? (
              <div className="col-span-3 text-center py-12">
                {t("loading")}
              </div>
            ) : (
              featuredMeals?.slice(0, 3).map((meal) => (
                <ItemCard
                  key={meal.id}
                  type="meal"
                  item={meal}
                />
              ))
            )}
          </div>

          <div className="mt-12 text-center">
            <Link href="/menu">
              <Button className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-medium transition-colors">
                {t("menu.viewFullMenu")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-secondary bg-opacity-30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">
              {t("products.title")}
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              {t("products.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoadingProducts ? (
              <div className="col-span-4 text-center py-12">
                {t("loading")}
              </div>
            ) : (
              featuredProducts?.slice(0, 4).map((product) => (
                <ItemCard
                  key={product.id}
                  type="product"
                  item={product}
                />
              ))
            )}
          </div>

          <div className="mt-12 text-center">
            <Link href="/products">
              <Button className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-medium transition-colors">
                {t("products.browseAll")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* BMI Calculator Section */}
      <BMICalculator />
      
      {/* Corporate Offers Section */}
      <CorporateOffers />
    </>
  );
};

export default Home;
