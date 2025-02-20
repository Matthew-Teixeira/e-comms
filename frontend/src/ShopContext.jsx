import { createContext, useState } from "react";

const ShopContext = createContext({
  name: "Shops Deez",
  location: "123 people street",
});

function ShopProvider({children}) {
    const [shop, setShop] = useState()
}
