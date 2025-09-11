"use client";

import {
  ArrowRight,
  Check,
  Plus,
  Trash,
  Edit,
  X,
  User,
  Package,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Combobox from "@/components/ui/combobox";
import { useEngineTypes } from "@/hooks/useEngineTypes";
import { useModels } from "@/hooks/useModels";
import { useMarks } from "@/hooks/useMarks";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import useMessage from "@/app/hooks";

// // Mock data for the selects
const productTypes = [
  { id: 1, value: "motor", label: "Motor" },
  { id: 2, value: "motorové-hlava", label: "Motorová hlava" },
  { id: 3, value: "turbo", label: "Turbo" },
];

// Helper function to get label from value
interface OptionType {
  id?: number;
  value: string;
  label: string;
}

export type ProductCardType = {
  id: number;
  productType: string;
  brand: string;
  model: string;
  engineType: string;
  notes?: string;
};

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  company?: string;
  additionalNotes?: string;
  acceptPrivacyPolicy: boolean;
}

interface InquiryFormData {
  personalInfo: PersonalInfo;
  products: ProductCardType[];
}

const getLabelFromValue = (
  options: OptionType[] | undefined,
  value: string
): string => {
  const option = options?.find((opt) => opt.value === value);
  return option ? option.label : "";
};

// Define form validation schemas
const personalInfoSchema = z.object({
  name: z.string().min(1, "Jméno je povinné"),
  email: z.string().email("Email je neplatný").min(1, "Email je povinný"),
  phone: z.string().refine((val) => {
    const phoneRegex = /^\+?[0-9\s\-()]+$/;
    return phoneRegex.test(val);
  }, "Telefonní číslo je neplatné"),
  company: z.string().optional(),
  additionalNotes: z.string().optional(),
  acceptPrivacyPolicy: z.boolean().refine((value) => value === true, {
    message: "Musíte souhlasit s podmínkami ochrany osobních údajů",
  }),
});

const productSchema = z.object({
  id: z.number().nullable(),
  productType: z.string().min(1, "Typ dílu je povinný"),
  brand: z.string().min(1, "Značka je povinná"),
  model: z.string().min(1, "Model je povinný"),
  engineType: z.string().min(1, "Typ motoru je povinný"),
  notes: z.string().optional(),
});

export default function InquiryForm() {
  // Get current product form values for dependent queries
  const [currentBrand, setCurrentBrand] = useState<string>("");
  const [currentModel, setCurrentModel] = useState<string>("");

  // Fetch data using React Query
  const {
    data: marksData,
    isLoading: marksLoading,
    error: marksError,
  } = useMarks();

  console.log("ttt", marksData);
  const {
    data: modelsData,
    isLoading: modelsLoading,
    error: modelsError,
  } = useModels(currentBrand);
  console.log("ttt models", modelsData);
  const {
    data: engineTypesData,
    isLoading: engineTypesLoading,
    error: engineTypesError,
  } = useEngineTypes(currentModel);

  // Personal information form
  const personalInfoForm = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      additionalNotes: "",
      acceptPrivacyPolicy: false,
    },
  });

  // Product form
  const productForm = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: null,
      productType: "",
      brand: "",
      model: "",
      engineType: "",
      notes: "",
    },
  });

  // Watch for brand and model changes to update dependent queries
  useEffect(() => {
    const subscription = productForm.watch((value, { name }) => {
      if (name === "brand") {
        setCurrentBrand(value.brand as string);
        // Reset model and engine type when brand changes
        if (value.brand !== currentBrand) {
          productForm.setValue("model", "");
          productForm.setValue("engineType", "");
        }
      }
      if (name === "model") {
        setCurrentModel(value.model as string);
        // Reset engine type when model changes
        if (value.model !== currentModel) {
          productForm.setValue("engineType", "");
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [productForm, currentBrand, currentModel]);

  // List of added products
  const [products, setProducts] = useState<ProductCardType[] | []>([]);

  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);

  // Editing state
  const [isEditing, setIsEditing] = useState(false);

  // Form submission error
  const [formError, setFormError] = useState<string | null>(null);

  // Add product to the list
  const onAddProduct = (data: {
    id: number | null;
    productType: string;
    brand: string;
    model: string;
    engineType: string;
    notes?: string;
  }) => {
    const newProduct: ProductCardType = {
      ...data,
      id: isEditing && data.id !== null ? data.id : Date.now(), // Use existing ID if editing, otherwise generate
    };

    if (isEditing) {
      // Update existing product
      setProducts(
        products.map((p) => (p.id === newProduct.id ? newProduct : p))
      );
      setIsEditing(false);
    } else {
      // Add new product
      setProducts([...products, newProduct]);
    }

    // Reset product form
    productForm.reset({
      id: null,
      productType: "",
      brand: "",
      model: "",
      engineType: "",
      notes: "",
    });
  };

  // Edit a product
  const editProduct = (product: ProductCardType) => {
    // Set form values
    productForm.reset(product);
    setIsEditing(true);
  };

  // Remove a product
  const removeProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Cancel editing
  const cancelEdit = () => {
    productForm.reset({
      id: null,
      productType: "",
      brand: "",
      model: "",
      engineType: "",
      notes: "",
    });
    setIsEditing(false);
  };

  // Handle form submission

  const message = useMessage();

  const onSubmit = async (data: PersonalInfo) => {
    // Check if products are added
    if (products.length === 0) {
      setFormError("Please add at least one product to your inquiry");
      return;
    }

    // Clear any previous errors
    setFormError(null);

    // Combine personal info with products
    const formData: InquiryFormData = {
      personalInfo: data,
      products,
    };

    try {
      const res = await fetch("/api/searchMotor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");

      message.success("E-mail byl úspěšně odeslán. Ozveme se Vám co nejdříve.");
      personalInfoForm.reset();
      setProducts([]);
    } catch (e) {
      console.error(e);
      setFormError(
        "Odeslání e-mailu selhalo. Zkuste to prosím znovu nebo nám zavolejte."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-lg border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Nezávazná poptávka
          </h1>
          <p className="text-gray-600">
            Vyplňte formulář a my vám najdeme nejlepší nabídky pro vaše autodíly
          </p>

          {/* Progress indicators */}
          <div className="flex items-center space-x-4 mt-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full text-sm font-medium">
                <User className="w-4 h-4" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">
                Osobní údaje
              </span>
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full text-sm font-medium">
                <Package className="w-4 h-4" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">
                Poptávané díly
              </span>
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full text-sm font-medium">
                <FileText className="w-4 h-4" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">
                Dokončení
              </span>
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar - Personal Information (Desktop) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8">
              <Card className="p-6 bg-white shadow-sm">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-red-500 mr-2" />
                  <h2 className="text-xl font-bold">Vaše údaje</h2>
                </div>

                <Form {...personalInfoForm}>
                  <div className="space-y-4">
                    <FormField
                      control={personalInfoForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Celé jméno <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Váš email <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Firma (Volitelné)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Souhrn poptávky
                  </h3>
                  <div className="text-sm text-gray-600">
                    <p>
                      Počet dílů:{" "}
                      <span className="font-medium text-gray-900">
                        {products.length}
                      </span>
                    </p>
                    {products.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {products.slice(0, 3).map((product, index) => (
                          <p key={product.id} className="truncate">
                            {index + 1}.{" "}
                            {getLabelFromValue(
                              productTypes,
                              product.productType
                            )}{" "}
                            - {product.brand}
                          </p>
                        ))}
                        {products.length > 3 && (
                          <p className="text-gray-500">
                            ... a {products.length - 3} dalších
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 mt-8 lg:mt-0">
            <Form {...personalInfoForm}>
              <form
                onSubmit={personalInfoForm.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Product Information Card */}
                <Card className="p-6 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 text-red-500 mr-2" />
                      <h2 className="text-xl font-bold">Poptávané díly</h2>
                    </div>
                    {isEditing && (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200"
                      >
                        Úprava poptávaného dílu
                      </Badge>
                    )}
                  </div>

                  <Form {...productForm}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <FormField
                        control={productForm.control}
                        name="productType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Typ dílu <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Combobox
                                options={productTypes}
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Vyberte typ dílu"
                                emptyMessage="Žádný typ dílu nenalezen."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={productForm.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Značka <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Combobox
                                options={
                                  marksData?.map((mark) => ({
                                    label: mark.name,
                                    value: mark.name,
                                  })) ?? []
                                }
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Vyberte značku"
                                emptyMessage="Žádná značka nenalezena."
                                withImage
                                isLoading={marksLoading}
                                disabled={!productForm.watch("productType")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={productForm.control}
                        name="model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Model <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Combobox
                                options={
                                  modelsData?.map((model) => ({
                                    label: model.name,
                                    value: model.name,
                                  })) ?? []
                                }
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Vyberte model"
                                emptyMessage="Žádný model nenalezen."
                                isLoading={modelsLoading}
                                disabled={!currentBrand}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={productForm.control}
                        name="engineType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Typ motoru <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Combobox
                                options={
                                  engineTypesData?.map((engineType) => ({
                                    label: engineType.name,
                                    value: engineType.name,
                                  })) ?? []
                                }
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Vyberte typ motoru"
                                emptyMessage="Žádný typ motoru nenalezen."
                                isLoading={engineTypesLoading}
                                disabled={!currentModel}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={productForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel>Poznámka k dílu (Volitelné)</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={2}
                              placeholder="Nějaké další informace k dílu..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        onClick={productForm.handleSubmit(onAddProduct)}
                        className="bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        {isEditing ? "Upravit díl" : "Přidat díl"}
                        <Plus
                          className={cn("ml-2 h-4 w-4", isEditing && "hidden")}
                        />
                        <Check
                          className={cn("ml-2 h-4 w-4", !isEditing && "hidden")}
                        />
                      </Button>
                      {isEditing && (
                        <Button
                          type="button"
                          onClick={cancelEdit}
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                        >
                          Zrušit úpravy
                          <X className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </Form>
                </Card>

                {/* Added Products List */}
                <Card className="p-6 bg-white shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">
                    Přidané produkty ({products.length})
                  </h3>

                  {products.length === 0 ? (
                    <Alert className="bg-blue-50 border-blue-200">
                      <Package className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        Žádné produkty nebyly přidány. Přidejte prosím produkty
                        k poptávce pomocí formuláře výše.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="grid gap-3">
                      {products.map((product, index) => (
                        <Card
                          key={product.id}
                          className="p-4 border border-gray-200 bg-gray-50"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <span className="inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-medium rounded-full mr-3">
                                  {index + 1}
                                </span>
                                <h4 className="font-medium text-gray-900">
                                  {getLabelFromValue(
                                    productTypes,
                                    product.productType
                                  )}
                                </h4>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600 ml-9">
                                <p>
                                  <span className="font-medium">Značka:</span>{" "}
                                  {product.brand}
                                </p>
                                <p>
                                  <span className="font-medium">Model:</span>{" "}
                                  {product.model}
                                </p>
                                <p>
                                  <span className="font-medium">Motor:</span>{" "}
                                  {product.engineType}
                                </p>
                              </div>
                              {product.notes && (
                                <p className="text-sm text-gray-600 mt-2 ml-9">
                                  <span className="font-medium">Poznámka:</span>{" "}
                                  {product.notes}
                                </p>
                              )}
                            </div>
                            <div className="flex space-x-1 ml-4">
                              <Button
                                type="button"
                                onClick={() => editProduct(product)}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-white"
                                disabled={isEditing}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Upravit</span>
                              </Button>
                              <Button
                                type="button"
                                onClick={() => removeProduct(product.id)}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-white"
                                disabled={isEditing}
                              >
                                <Trash className="h-4 w-4" />
                                <span className="sr-only">Odebrat</span>
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {formError && (
                    <Alert className="mt-4 bg-red-50 border-red-200">
                      <AlertDescription className="text-red-800">
                        {formError}
                      </AlertDescription>
                    </Alert>
                  )}
                </Card>

                {/* Additional Notes and Final Steps */}
                <Card className="p-6 bg-white shadow-sm">
                  <div className="flex items-center mb-4">
                    <FileText className="w-5 h-5 text-red-500 mr-2" />
                    <h3 className="text-lg font-semibold">
                      Dokončení poptávky
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <FormField
                      control={personalInfoForm.control}
                      name="additionalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Další poznámky k vaší poptávce (Volitelné)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="Nějaké další informace k poptávce..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="acceptPrivacyPolicy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-gray-50 rounded-lg">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              id="accept-terms"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel
                              htmlFor="accept-terms"
                              className="text-sm"
                            >
                              Souhlasím s{" "}
                              <Link
                                href="/privacy-policy"
                                className="text-red-500 hover:underline"
                              >
                                podmínkami ochrany osobních údajů
                              </Link>{" "}
                              a{" "}
                              <Link
                                href="/terms"
                                className="text-red-500 hover:underline"
                              >
                                obchodními podmínkami
                              </Link>
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="pt-4 border-t border-gray-200">
                      <Button
                        type="submit"
                        className="w-full sm:w-auto bg-red-500 text-white px-8 py-3 rounded-md font-medium hover:bg-red-600 transition-colors inline-flex items-center justify-center"
                        disabled={products.length === 0 || isEditing}
                        size="lg"
                      >
                        Odeslat nezávaznou poptávku
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        Vaše poptávka bude odeslána našim partnerům a obdržíte
                        nabídky do 24 hodin, pokud chcete urychlit proces, neváhejte nám zavolat.
                      </p>
                    </div>
                  </div>
                </Card>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
