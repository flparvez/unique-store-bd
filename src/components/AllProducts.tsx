"use client"
 import { useGetProductsQuery } from "@/store/services/prodcutApi"
const AllProducts = () => {
    const {data}=useGetProductsQuery("")
    console.log(data)
  return (
    <div>
      
    </div>
  )
}

export default AllProducts
