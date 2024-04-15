import { useEffect } from "react";





const useCart = () =>{
  

}

// const useCart = () => {

//   const productCart =  localStorage.getItem("shopping-cart");
//   let count = 0;
//   const { data: selectCart = [], refetch } = useQuery({
//     queryKey: ["selectCart", productCart],
//     enabled:  !!productCart,
//     queryFn: () => {
//       //const productCart =  localStorage.getItem("shopping-cart");
      
//       if (productCart) {
//         const cartProduct = JSON.parse(productCart);
//         for (const key in cartProduct) {
//           //console.log("cart", cartProduct[key]);
//           count = count + cartProduct[key];
//         }
//         //console.log("COunt", count);
//       }
//       return count;
//     },
//   });
//   return [selectCart, refetch];
// };

// export default useCart;


    