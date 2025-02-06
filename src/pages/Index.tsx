import React from "react";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import ProductActions from "@/components/ProductActions";
import { Product } from "@/types/Product";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const [products, setProducts] = React.useState<Product[]>([]);

  const handleAddProduct = (newProduct: Omit<Product, "id" | "unitPrice">) => {
    const unitPrice = newProduct.price / newProduct.quantity;
    setProducts([
      ...products,
      {
        ...newProduct,
        id: uuidv4(),
        unitPrice,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Gerenciamento de Estoque
        </h1>
        <div className="space-y-8">
          <ProductForm onAddProduct={handleAddProduct} />
          {products.length > 0 && (
            <>
              <ProductList products={products} />
              <ProductActions products={products} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;