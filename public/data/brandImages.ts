export type BrandImage = {
  id: number;
  name: string;
  src: string;
};

export const brandImages: BrandImage[] = [
  {
    id: 1,
    name: "Skoda",
    src: "/images/frontend/cars/PNG/106.png",
  },
  {
    id: 2,
    name: "Volkswagen",
    src: "/images/frontend/cars/PNG/118.png",
  },
  {
    id: 3,
    name: "Fiat",
    src: "/images/frontend/cars/PNG/43.png",
  },
  {
    id: 4,
    name: "Citroen",
    src: "/images/frontend/cars/PNG/32.png",
  },
  {
    id: 5,
    name: "Peugeot",
    src: "/images/frontend/cars/PNG/93.png",
  },
  {
    id: 6,
    name: "Mercedes",
    src: "/images/frontend/cars/PNG/82.png",
  },
  {
    id: 7,
    name: "Audi",
    src: "/images/frontend/cars/PNG/7.png",
  },
  {
    id: 8,
    name: "BMW",
    src: "/images/frontend/cars/PNG/13.png",
  },
  {
    id: 9,
    name: "Ford",
    src: "/images/frontend/cars/PNG/45.png",
  },
  {
    id: 10,
    name: "Renault",
    src: "/images/frontend/cars/PNG/114.png",
  },
  {
    id: 11,
    name: "Mazda",
    src: "/images/frontend/cars/PNG/80.png",
  },
  {
    id: 12,
    name: "Chevrolet",
    src: "/images/frontend/cars/PNG/25.png",
  },
];

export const brandImagesMobile = brandImages.slice(0, 6);
