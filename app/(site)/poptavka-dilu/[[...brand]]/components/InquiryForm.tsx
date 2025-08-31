// "use client";

// import {
//   ArrowRight,
//   Check,
//   ChevronsUpDown,
//   Plus,
//   Trash,
//   Edit,
//   X,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Combobox from "@/components/ui/combobox";
// import { useEngineTypes } from "@/hooks/useEngineTypes";
// import { useModels } from "@/hooks/useModels";
// import { useMarks } from "@/hooks/useMarks";
// import { Checkbox } from "@/components/ui/checkbox";
// import Link from "next/link";

// // // Mock data for the selects
// const productTypes = [
//   { id: 1, value: "motor", label: "Motor" },
//   { id: 2, value: "motorové-hlava", label: "Motorová hlava" },
//   { id: 3, value: "turbo", label: "Turbo" },
// ];

// // Helper function to get label from value
// const getLabelFromValue = (options, value) => {
//   const option = options?.find((opt) => opt.value === value);
//   return option ? option.label : "";
// };

// // Define form validation schemas
// const personalInfoSchema = z.object({
//   name: z.string().min(1, "Jméno je povinné"),
//   email: z.string().email("Email je neplatný").min(1, "Email je povinný"),
//   phone: z.string().refine((val) => {
//     const phoneRegex = /^\+?[0-9\s\-()]+$/;
//     return phoneRegex.test(val);
//   }, "Telefonní číslo je neplatné"),
//   company: z.string().optional(),
//   additionalNotes: z.string().optional(),
//   acceptPrivacyPolicy: z.boolean().refine((value) => value === true, {
//     message: "Musíte souhlasit s podmínkami ochrany osobních údajů",
//   }),
// });

// const productSchema = z.object({
//   id: z.number().nullable(),
//   productType: z.string().min(1, "Typ dílu je povinný"),
//   brand: z.string().min(1, "Značka je povinná"),
//   model: z.string().min(1, "Model je povinný"),
//   engineType: z.string().min(1, "Typ motoru je povinný"),
//   notes: z.string().optional(),
// });

// export default function InquiryForm() {
//   // Get current product form values for dependent queries
//   const [currentBrand, setCurrentBrand] = useState<string>("");
//   const [currentModel, setCurrentModel] = useState<string>("");

//   // Fetch data using React Query
//   const {
//     data: marksData,
//     isLoading: marksLoading,
//     error: marksError,
//   } = useMarks();

//   console.log("ttt", marksData);
//   const {
//     data: modelsData,
//     isLoading: modelsLoading,
//     error: modelsError,
//   } = useModels(currentBrand);
//   console.log("ttt models", modelsData);
//   const {
//     data: engineTypesData,
//     isLoading: engineTypesLoading,
//     error: engineTypesError,
//   } = useEngineTypes(currentModel);

//   // Personal information form
//   const personalInfoForm = useForm({
//     resolver: zodResolver(personalInfoSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//       company: "",
//       additionalNotes: "",
//       acceptPrivacyPolicy: false,
//     },
//   });

//   // Product form
//   const productForm = useForm({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       id: null,
//       productType: "",
//       brand: "",
//       model: "",
//       engineType: "",
//       notes: "",
//     },
//   });

//   // Watch for brand and model changes to update dependent queries
//   useEffect(() => {
//     const subscription = productForm.watch((value, { name }) => {
//       if (name === "brand") {
//         setCurrentBrand(value.brand as string);
//         // Reset model and engine type when brand changes
//         if (value.brand !== currentBrand) {
//           productForm.setValue("model", "");
//           productForm.setValue("engineType", "");
//         }
//       }
//       if (name === "model") {
//         setCurrentModel(value.model as string);
//         // Reset engine type when model changes
//         if (value.model !== currentModel) {
//           productForm.setValue("engineType", "");
//         }
//       }
//     });
//     return () => subscription.unsubscribe();
//   }, [productForm, currentBrand, currentModel]);

//   type ProductCardType = {
//     id: number;
//     productType: string;
//     brand: string;
//     model: string;
//     engineType: string;
//     notes?: string;
//   };

//   // List of added products
//   const [products, setProducts] = useState<ProductCardType[] | []>([]);

//   useEffect(() => {
//     console.log("Products updated:", products);
//   }, [products]);

//   // Editing state
//   const [isEditing, setIsEditing] = useState(false);

//   // Form submission error
//   const [formError, setFormError] = useState(null);

//   // Add product to the list
//   const onAddProduct = (data) => {
//     const newProduct = {
//       ...data,
//       id: isEditing ? data.id : Date.now(), // Use existing ID if editing
//     };

//     if (isEditing) {
//       // Update existing product
//       setProducts(
//         products.map((p) => (p.id === newProduct.id ? newProduct : p))
//       );
//       setIsEditing(false);
//     } else {
//       // Add new product
//       setProducts([...products, newProduct]);
//     }

//     // Reset product form
//     productForm.reset({
//       id: null,
//       productType: "",
//       brand: "",
//       model: "",
//       engineType: "",
//       notes: "",
//     });
//   };

//   // Edit a product
//   const editProduct = (product) => {
//     // Set form values
//     productForm.reset(product);
//     setIsEditing(true);
//   };

//   // Remove a product
//   const removeProduct = (id) => {
//     setProducts(products.filter((p) => p.id !== id));
//   };

//   // Cancel editing
//   const cancelEdit = () => {
//     productForm.reset({
//       id: null,
//       productType: "",
//       brand: "",
//       model: "",
//       engineType: "",
//       notes: "",
//     });
//     setIsEditing(false);
//   };

//   // Handle form submission
//   const onSubmit = (data) => {
//     // Check if products are added
//     if (products.length === 0) {
//       setFormError("Please add at least one product to your inquiry");
//       return;
//     }

//     // Clear any previous errors
//     setFormError(null);

//     // Combine personal info with products
//     const formData = {
//       personalInfo: data,
//       products,
//     };

//     // Here you would typically send the data to your backend
//     console.log("Form submitted:", formData);
//     alert("Inquiry submitted successfully!");

//     // Reset the form
//     personalInfoForm.reset();
//     setProducts([]);
//   };

//   return (
//     <div className="space-y-8">
//       {/* Personal Information */}
//       <Form {...personalInfoForm}>
//         <form
//           onSubmit={personalInfoForm.handleSubmit(onSubmit)}
//           className="space-y-8"
//         >
//           <div>
//             <h2 className="text-xl font-bold mb-4">Vaše poptávka</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <FormField
//                 control={personalInfoForm.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Celé jméno <span className="text-red-500">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={personalInfoForm.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Váš email <span className="text-red-500">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input type="email" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={personalInfoForm.control}
//                 name="phone"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Telefon</FormLabel>
//                     <FormControl>
//                       <Input type="tel" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={personalInfoForm.control}
//                 name="company"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Firma (Volitelné)</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>

//           {/* Product Information */}
//           <div>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold">Poptávané díly</h2>
//               {isEditing && (
//                 <Badge
//                   variant="outline"
//                   className="bg-amber-50 text-amber-700 border-amber-200"
//                 >
//                   Úprava poptávaného dílu
//                 </Badge>
//               )}
//             </div>

//             <Form {...productForm}>
//               <div className="space-y-4">
//                 <FormField
//                   control={productForm.control}
//                   name="productType"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>
//                         Typ dílu <span className="text-red-500">*</span>
//                       </FormLabel>
//                       <FormControl>
//                         <Combobox
//                           options={productTypes}
//                           value={field.value}
//                           onChange={field.onChange}
//                           placeholder="Vyberte typ dílu"
//                           emptyMessage="Žádný typ dílu nenalezen."
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={productForm.control}
//                   name="brand"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>
//                         Značka <span className="text-red-500">*</span>
//                       </FormLabel>
//                       <FormControl>
//                         <Combobox
//                           options={
//                             marksData?.map((mark) => ({
//                               label: mark.name,
//                               value: mark.name,
//                             })) ?? []
//                           }
//                           value={field.value}
//                           onChange={field.onChange}
//                           placeholder="Vyberte značku"
//                           emptyMessage="Žádná značka nenalezena."
//                           withImage
//                           isLoading={marksLoading}
//                           disabled={!productForm.watch("productType")}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={productForm.control}
//                   name="model"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>
//                         Model <span className="text-red-500">*</span>
//                       </FormLabel>
//                       <FormControl>
//                         <Combobox
//                           options={
//                             modelsData?.map((model) => ({
//                               label: model.name,
//                               value: model.name,
//                             })) ?? []
//                           }
//                           value={field.value}
//                           onChange={field.onChange}
//                           placeholder="Vyberte model"
//                           emptyMessage="Žádný model nenalezen."
//                           isLoading={modelsLoading}
//                           disabled={!currentBrand}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={productForm.control}
//                   name="engineType"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>
//                         Typ motoru <span className="text-red-500">*</span>
//                       </FormLabel>
//                       <FormControl>
//                         <Combobox
//                           options={
//                             engineTypesData?.map((engineType) => ({
//                               label: engineType.name,
//                               value: engineType.name,
//                             })) ?? []
//                           }
//                           value={field.value}
//                           onChange={field.onChange}
//                           placeholder="Vyberte typ motoru"
//                           emptyMessage="Žádný typ motoru nenalezen."
//                           isLoading={engineTypesLoading}
//                           disabled={!currentModel}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={productForm.control}
//                   name="notes"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Poznámka k dílu (Volitelné)</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           rows={2}
//                           placeholder="Nějaké další informace k dílu..."
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="flex flex-wrap gap-2">
//                   <Button
//                     type="button"
//                     onClick={productForm.handleSubmit(onAddProduct)}
//                     className="bg-red-500 text-white hover:bg-red-600 transition-colors"
//                   >
//                     {isEditing ? "Upravit díl" : "Přidat díl"}
//                     <Plus
//                       className={cn("ml-2 h-4 w-4", isEditing && "hidden")}
//                     />
//                     <Check
//                       className={cn("ml-2 h-4 w-4", !isEditing && "hidden")}
//                     />
//                   </Button>
//                   {isEditing && (
//                     <Button
//                       type="button"
//                       onClick={cancelEdit}
//                       variant="outline"
//                       className="border-gray-300 text-gray-700 hover:bg-gray-50"
//                     >
//                       Zrušit úpravy
//                       <X className="ml-2 h-4 w-4" />
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </Form>
//           </div>

//           {/* Added Products List */}
//           <div>
//             <h2 className="text-xl font-bold mb-4">Přidané produkty</h2>

//             {products.length === 0 ? (
//               <Alert className="bg-gray-50 border-gray-200">
//                 <AlertDescription>
//                   Žádné produkty nebyly přidány. Přidejte prosím produkty k
//                   poptávce.
//                 </AlertDescription>
//               </Alert>
//             ) : (
//               <div className="space-y-3">
//                 {products.map((product) => (
//                   <Card key={product.id} className="p-4 border-gray-200">
//                     <div className="flex justify-between">
//                       <div>
//                         <h3 className="font-medium">
//                           {getLabelFromValue(productTypes, product.productType)}
//                         </h3>
//                         <div className="text-sm text-gray-600 mt-1">
//                           <p>
//                             <span className="font-medium">Značka:</span>{" "}
//                             {product.brand}
//                           </p>
//                           <p>
//                             <span className="font-medium">Model:</span>{" "}
//                             {product.model}
//                           </p>
//                           <p>
//                             <span className="font-medium">Typ motoru:</span>{" "}
//                             {product.engineType}
//                           </p>
//                           {product.notes && (
//                             <p className="mt-2">
//                               <span className="font-medium">Poznámka:</span>{" "}
//                               {product.notes}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                       <div className="flex space-x-2">
//                         <Button
//                           type="button"
//                           onClick={() => editProduct(product)}
//                           variant="ghost"
//                           size="sm"
//                           className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
//                           disabled={isEditing}
//                         >
//                           <Edit className="h-4 w-4" />
//                           <span className="sr-only">Upravit</span>
//                         </Button>
//                         <Button
//                           type="button"
//                           onClick={() => removeProduct(product.id)}
//                           variant="ghost"
//                           size="sm"
//                           className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
//                           disabled={isEditing}
//                         >
//                           <Trash className="h-4 w-4" />
//                           <span className="sr-only">Odebrat</span>
//                         </Button>
//                       </div>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             )}

//             {formError && (
//               <p className="text-red-500 text-sm mt-2">{formError}</p>
//             )}
//           </div>

//           {/* Additional Notes */}
//           <FormField
//             control={personalInfoForm.control}
//             name="additionalNotes"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                   Další poznámky k vaší poptávce (Volitelné)
//                 </FormLabel>
//                 <FormControl>
//                   <Textarea
//                     rows={4}
//                     placeholder="Nějaké další informace k poptávce..."
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/* Privacy Policy and Terms Acceptance */}
//           <FormField
//             control={personalInfoForm.control}
//             name="acceptPrivacyPolicy"
//             render={({ field }) => (
//               <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                 <FormControl>
//                   <Checkbox
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                     id="accept-terms"
//                   />
//                 </FormControl>
//                 <div className="space-y-1 leading-none">
//                   <FormLabel htmlFor="accept-terms">
//                     Souhlasím s{" "}
//                     <Link
//                       href="/privacy-policy"
//                       className="text-red-500 hover:underline"
//                     >
//                       podmínkami ochrany osobních údajů
//                     </Link>{" "}
//                     a{" "}
//                     <Link
//                       href="/terms"
//                       className="text-red-500 hover:underline"
//                     >
//                       obchodními podmínkami
//                     </Link>
//                     <span className="text-red-500">*</span>
//                   </FormLabel>
//                   {/* <FormDescription className="text-xs">

//                   </FormDescription> */}
//                   <FormMessage />
//                 </div>
//               </FormItem>
//             )}
//           />

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             className="bg-red-500 text-white px-6 py-3 rounded-md font-medium hover:bg-red-600 transition-colors inline-flex items-center"
//             disabled={products.length === 0 || isEditing}
//           >
//             Odeslat nezávaznou poptávku
//             <ArrowRight className="ml-2 h-5 w-5" />
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
