import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/Product";

interface ProductFormProps {
  onAddProduct: (product: Omit<Product, "id" | "unitPrice">) => void;
}

const ProductForm = ({ onAddProduct }: ProductFormProps) => {
  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [price, setPrice] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quantity || !price) return;

    onAddProduct({
      name,
      quantity: Number(quantity),
      price: Number(price),
    });

    setName("");
    setQuantity("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          className="w-full"
        />
        <Input
          type="number"
          placeholder="Preço total"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0.01"
          step="0.01"
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700">
        Adicionar Produto
      </Button>
    </form>
  );
};

export default ProductForm;