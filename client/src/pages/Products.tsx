import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import ItemCard from "@/components/ItemCard";

const Products = () => {
  const { t } = useTranslation();
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  return (
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

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg">{t("loading")}</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-lg text-red-500">{t("error")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ItemCard
                key={product.id}
                type="product"
                item={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
