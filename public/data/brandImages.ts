export type BrandImage = {
  id: number;
  name: string;
  src: string;
};

export const brandImages: BrandImage[] = [
  {
    id: 1,
    name: "Skoda",
    src: "/images/frontend/cars/PNG/102.png",
  },
  {
    id: 2,
    name: "Volkswagen",
    src: "/images/frontend/cars/PNG/119.png",
  },
  {
    id: 3,
    name: "Fiat",
    src: "/images/frontend/cars/PNG/38.png",
  },
  {
    id: 4,
    name: "Citroen",
    src: "/images/frontend/cars/PNG/24.png",
  },
  {
    id: 5,
    name: "Peugeot",
    src: "/images/frontend/cars/PNG/89.png",
  },
  {
    id: 6,
    name: "Mercedes",
    src: "/images/frontend/cars/PNG/76.png",
  },
  {
    id: 7,
    name: "Audi",
    src: "/images/frontend/cars/PNG/8.png",
  },
  {
    id: 8,
    name: "BMW",
    src: "/images/frontend/cars/PNG/11.png",
  },
  {
    id: 9,
    name: "Ford",
    src: "/images/frontend/cars/PNG/40.png",
  },
  {
    id: 10,
    name: "Renault",
    src: "/images/frontend/cars/PNG/94.png",
  },
  {
    id: 11,
    name: "Mazda",
    src: "/images/frontend/cars/PNG/74.png",
  },
  {
    id: 12,
    name: "Chevrolet",
    src: "/images/frontend/cars/PNG/21.png",
  },
];

export const brandImagesMobile = brandImages.slice(0, 6);
