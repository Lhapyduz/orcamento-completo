import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/Product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormProps {
  onAddProduct: (product: Omit<Product, "id" | "unitPrice">) => void;
}

const ProductForm = ({ onAddProduct }: ProductFormProps) => {
  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [material, setMaterial] = React.useState("");
  const [format, setFormat] = React.useState("");
  const [colors, setColors] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quantity || !price || !material || !format || !colors) return;

    onAddProduct({
      name,
      quantity: Number(quantity),
      price: Number(price),
      material,
      format,
      colors,
    });

    setName("");
    setQuantity("");
    setPrice("");
    setMaterial("");
    setFormat("");
    setColors("");
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
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="Material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="w-full"
        />
        <Input
          type="text"
          placeholder="Formato"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full"
        />
      </div>
      <Select value={colors} onValueChange={setColors}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione as cores" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="4x4">4x4 Colorido Frente e Verso</SelectItem>
          <SelectItem value="4x1">4x1 Colorido Frente e Preto e Brando Verso</SelectItem>
          <SelectItem value="4x0">4x0 Colorido Frente e Verso em Branco</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700">
        Adicionar Produto
      </Button>
    </form>
  );
};

export default ProductForm;