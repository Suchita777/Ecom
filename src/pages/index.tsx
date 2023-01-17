// import { El_Messiri } from "@next/font/google";
import Layout from "components/layout";
import Link from "next/link";
import { HomePageProps, product } from "types";

// const elMessiri = El_Messiri({ weight: "700", subsets: ["latin"] });

export async function getServerSideProps() {
  const query = `{
  productCollection{
    items{
      slug
      title
      price
      productImagesCollection{
        items{
          url
          description
        }
      }
    }
  }
}`;

  const featuredQuery = `query{
  productCollection(where:{featured:true}){
    items{
      slug
      title
      price
      productImagesCollection{
        items{
          url
          description
        }
      }
    }
  }
}`;

  const newArrivalsQuery = `query{
  productCollection(where:{newArrivals:true}){
    items{
      slug
      title
      price
      productImagesCollection{
        items{
          url
          description
        }
      }
    }
  }
}`;

  const bestSellerQuery = `query{
  productCollection(where:{bestSeller:true}){
    items{
      slug
      title
      price
      productImagesCollection{
        items{
          url
          description
        }
      }
    }
  }
}`;

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((res) => res.json());

  const featuredResponse = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: featuredQuery }),
    }
  ).then((res) => res.json());

  const newArrivalsResponse = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: newArrivalsQuery }),
    }
  ).then((res) => res.json());

  const bestSellerResponse = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: bestSellerQuery }),
    }
  ).then((res) => res.json());

  return {
    props: {
      products: response.data.productCollection.items,
      featuredProducts: featuredResponse.data.productCollection.items,
      newArrivalsProducts: newArrivalsResponse.data.productCollection.items,
      bestSellerProducts: bestSellerResponse.data.productCollection.items,
    },
  };
}

export default function Home({
  products,
  featuredProducts,
  newArrivalsProducts,
  bestSellerProducts,
}: HomePageProps) {
  return (
    <Layout>
      <div className="bg-[url('/bg1.jpg')] bg-cover pt-20 h-[35rem] w-full flex flex-col justify-center items-center text-white ">
        <p className="text-lg tracking-widest m-3">Express Yourself</p>
        <h1 className="text-[5rem] font-serif font-semibold capitalize m-4">
          Loved for style
        </h1>
        <p className="text-xl m-3 italic">
          It&apos;s hard to be nice if you dont feel comfortable!
        </p>
        <Link
          href=""
          className="border bg-white text-black m-5 rounded hover:bg-transparent hover:text-white"
        >
          <p className="font-semibold p-3 capitalize">shop collection</p>
        </Link>
      </div>

      <div className="flex flex-col p-3 m-4">
        <h1 className="text-4xl font-semibold">New Arrivals</h1>
        <p className="mt-2">Discover the latest ready-to-deliver items.</p>
        <div className="flex overflow-x-scroll overflow-y-hidden mt-6 mb-6">
          {newArrivalsProducts.map((product: product) => (
            <div
              key={product.slug}
              className="mr-4 w-[21rem] h-[29rem] shrink-0 border"
            >
              <div className="flex flex-col justify-center items-center">
                <div>
                  <img
                    src={product.productImagesCollection.items[0].url}
                    className="w-[18rem] h-[23rem] p-3 pt-0"
                  />
                </div>
                <h1 className="p-4 pt-1 pb-1 text-lg font-semibold mr-auto">
                  {product.title}
                </h1>
                <h2 className="p-4 pt-1 mr-auto">{product.price} INR</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col p-3 m-4">
        <h1 className="text-4xl font-semibold">Best Sellers</h1>
        <p className="mt-2">Dresses loved by most of the customers.</p>
        <div className="flex overflow-x-scroll overflow-y-hidden mt-6 mb-6">
          {bestSellerProducts.map((product: product) => (
            <div
              key={product.slug}
              className="mr-4 w-[21rem] h-[29rem] shrink-0 border"
            >
              <div className="flex flex-col justify-center items-center">
                <div>
                  <img
                    src={product.productImagesCollection.items[0].url}
                    className="w-[18rem] h-[23rem] p-3 pt-0"
                  />
                </div>
                <h1 className="p-4 pt-1 pb-1 text-lg font-semibold mr-auto">
                  {product.title}
                </h1>
                <h2 className="p-4 pt-1 mr-auto">{product.price} INR</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col p-3 m-4">
        <h1 className="text-4xl font-semibold">Featured</h1>
        <p className="mt-2">Best dresses in our store's closet.</p>
        <div className="flex overflow-x-scroll overflow-y-hidden mt-6 mb-6">
          {featuredProducts.map((product: product) => (
            <div
              key={product.slug}
              className="mr-4 w-[21rem] h-[29rem] shrink-0 border"
            >
              <div className="flex flex-col justify-center items-center">
                <div>
                  <img
                    src={product.productImagesCollection.items[0].url}
                    className="w-[18rem] h-[23rem] p-3 pt-0"
                  />
                </div>
                <h1 className="p-4 pt-1 pb-1 text-lg font-semibold mr-auto">
                  {product.title}
                </h1>
                <h2 className="p-4 pt-1 mr-auto">{product.price} INR</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t w-full h-32 flex justify-between items-center text-slate-700 text-sm p-14">
        <div className="flex items-center">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
          </p>
          <div className="m-5">
            <h3 className="font-semibold">Customer Support</h3>
            <p className="mt-2">Mon - Sat, 10am - 9pm</p>
          </div>
        </div>
        <div className="flex items-center">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </p>
          <div className="m-5">
            <h3 className="font-semibold">Easy Returns</h3>
            <p className="mt-2">Returns extended to 60 days</p>
          </div>
        </div>
        <div className="flex items-center">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </p>
          <div className="m-5">
            <h3 className="font-semibold ">Gift Package</h3>
            <p className="mt-2">Free packaging over 1000INR</p>
          </div>
        </div>
        <div className="flex items-center">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </p>
          <div className="m-5">
            <h3 className="font-semibold">One-year Warranty</h3>
            <p className="mt-2">No questions asked</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
