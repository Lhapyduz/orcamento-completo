import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";
import jsPDF from "jspdf";
import { Share, Download } from "lucide-react";

interface ProductActionsProps {
  products: Product[];
}

const ProductActions = ({ products }: ProductActionsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const generateWhatsAppMessage = () => {
    const total = products.reduce((sum, product) => sum + product.price, 0);
    let message = "📋 *Orçamento*\n\n";
    
    products.forEach((product) => {
      message += `*${product.name}*\n`;
      message += `Quantidade: ${product.quantity}\n`;
      message += `Preço Total: ${formatCurrency(product.price)}\n`;
      message += `Valor Unitário: ${formatCurrency(product.unitPrice)}\n\n`;
    });
    
    message += `\n*Total: ${formatCurrency(total)}*`;
    
    return encodeURIComponent(message);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const total = products.reduce((sum, product) => sum + product.price, 0);

    doc.setFontSize(20);
    doc.text("Orçamento", 20, 20);
    
    let yPosition = 40;
    
    products.forEach((product) => {
      doc.setFontSize(12);
      doc.text(`Produto: ${product.name}`, 20, yPosition);
      doc.text(`Quantidade: ${product.quantity}`, 20, yPosition + 7);
      doc.text(`Preço Total: ${formatCurrency(product.price)}`, 20, yPosition + 14);
      doc.text(`Valor Unitário: ${formatCurrency(product.unitPrice)}`, 20, yPosition + 21);
      yPosition += 35;
    });

    doc.setFontSize(14);
    doc.text(`Total: ${formatCurrency(total)}`, 20, yPosition);

    doc.save("orcamento.pdf");
  };

  return (
    <div className="flex gap-4 justify-end">
      <Button
        onClick={() => window.open(`https://wa.me/?text=${generateWhatsAppMessage()}`, "_blank")}
        className="bg-green-600 hover:bg-green-700"
      >
        <Share className="mr-2 h-4 w-4" />
        Compartilhar no WhatsApp
      </Button>
      <Button onClick={downloadPDF} className="bg-blue-800 hover:bg-blue-700">
        <Download className="mr-2 h-4 w-4" />
        Baixar PDF
      </Button>
    </div>
  );
};

export default ProductActions;