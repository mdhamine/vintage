// export const products = [
//   {
//     id: "1",
//     name: "Adidas track jacket ( fiha une tache )",
//     thumbnail:
//       "https://vintagecornerdz.com/images/article_images/1701968926644--thumbnail.jpeg",
//     sizes: ["S", "M", "L", "XL"],
//     color: ["red", "blue"],
//     price: 20,
//     currency: "USD",
//     new: true,
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     id: "2",
//     name: "Inter Nike track jacket",
//     thumbnail:
//       "https://vintagecornerdz.com/images/article_images/1701968671594--thumbnail.jpeg",
//     sizes: ["XL"],
//     color: ["indigo"],
//     price: 25,
//     currency: "USD",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     id: "3",
//     name: "Vintage Guess sweatshirt",
//     thumbnail:
//       "https://vintagecornerdz.com/images/article_images/1701108320969--thumbnail.jpeg",
//     sizes: ["M"],
//     color: ["maroon"],
//     price: 15,
//     currency: "USD",
//     outOfStock: true,
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
// ];

// export const getProductById = (id: string) => {
//   return products.find((product) => product.id === id);
// };

export type IProduct = Partial<{
  readonly id: string;
  readonly _id: string;
  slug: string;
  name: string;
  thumbnail: string;
  sizes: Array<string>;
  color: Array<string>;
  price: number;
  currency: string;
  new: boolean;
  description: string;
  outOfStock: boolean;
  stock: number;
  readonly createdAt: string;
}>;
