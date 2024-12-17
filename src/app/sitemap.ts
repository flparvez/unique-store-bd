

export default async function sitemap() {
  const response = await fetch(`https://uniquestorebd-api.vercel.app/api/products`).then((res) => res.json())
const products = response;
  const baseUrl ="https://uniquestorebd.vercel.app/"
const allProducts = products?.map((product:any) =>{
 return {
  url:`${baseUrl}product/${product?.slug}`,
  lastModified: product?.createdAt,
 }
} )

  return [{
      url: baseUrl,
      lastModified: new Date(),
  },
  ...allProducts
]
}