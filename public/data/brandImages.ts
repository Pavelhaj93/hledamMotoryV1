export type BrandImage = {
  id: number;
  name: string;
  src: string;
};

export const brandImages: BrandImage[] = [
  {
    id: 101,
    name: "Skoda",
    src: "/images/frontend/cars/PNG/101.png",
  },
  {
    id: 118,
    name: "Volkswagen",
    src: "/images/frontend/cars/PNG/118.png",
  },
  {
    id: 37,
    name: "Fiat",
    src: "/images/frontend/cars/PNG/37.png",
  },
  {
    id: 23,
    name: "Citroën",
    src: "/images/frontend/cars/PNG/23.png",
  },
  {
    id: 88,
    name: "Peugeot",
    src: "/images/frontend/cars/PNG/88.png",
  },
  {
    id: 75,
    name: "Mercedes",
    src: "/images/frontend/cars/PNG/75.png",
  },
  {
    id: 8,
    name: "Audi",
    src: "/images/frontend/cars/PNG/8.png",
  },
  {
    id: 11,
    name: "BMW",
    src: "/images/frontend/cars/PNG/11.png",
  },
  {
    id: 39,
    name: "Ford",
    src: "/images/frontend/cars/PNG/39.png",
  },
  {
    id: 93,
    name: "Renault",
    src: "/images/frontend/cars/PNG/93.png",
  },
  {
    id: 73,
    name: "Mazda",
    src: "/images/frontend/cars/PNG/73.png",
  },
  {
    id: 20,
    name: "Chevrolet",
    src: "/images/frontend/cars/PNG/20.png",
  },
];

export const brandImagesMobile = brandImages.slice(0, 6);
