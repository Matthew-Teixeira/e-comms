import { useEffect, useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("/api/product/all", {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });

        const data = await response.json();

        if (response.ok && !data.error) {
          console.log("data");
          console.log(data);
          setData(data);
          setLoading(false);
        } else throw new Error(data.error);
      } catch (error) {}
    };
    console.log("About to get Data:");
    getProducts();
    console.log("\nFinished getting Data:");
  }, []);
  return (
    <div>{data && !loading ? <div>{data.allProducts.map(product => (<p>{product.name}</p>))}</div> : <div>LOADING...</div>}</div>
  );
};

export default Login;
