import { Instagram,  Facebook } from "lucide-react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="bg-black  text-white m-0">
        <div className="flex justify-around  p-10 ">
          <div className=" w-80 text-left">
            <div className="flex   gap-4  text-center mb-5">
              <span className="font-bold">Cultural Outfits</span>
            </div>

            <div className="mb-5 text-justify">
              <p>
              Discover the beauty and richness of traditional attire from around the world. Our collection celebrates cultural heritage and artistic craftsmanship.
              </p>
            </div>

            <div className="flex flex-row">

              <div className="m-5 rounded-full text-white">
                <Instagram />
              </div>
              <div className="m-5 rounded-full  text-white">
                <Facebook />
              </div>

            </div>
          </div>

          <div>
            <div>
              <h1 className="text-red-500 mb-5">Page</h1>
            </div>
            <div>
              <NavLink to='/' >Home</NavLink>
            </div>
            <div>
            <NavLink to='/dress-code' >Category</NavLink>
            </div>
            <div>
            <NavLink to='/cart' >View Cart</NavLink>
            </div>
          </div>
          <div>
            <div>
              <h1 className="text-red-500 mb-5">Information</h1>
            </div>
            <div>
            <NavLink to='/about' > About Us</NavLink>
            </div>
          </div>
          <div className=" leading-7">
            <div>
              <h1 className="text-red-500 mb-5">Get in touch</h1>
            </div>
            <div>
              <h1>Bhaktahpur, Nepal</h1>
            </div>
            <div>
              <h1>anjali@gmail.com</h1>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-center p-10">Copyright&copy;2024</h1>
        </div>
      </div>
    </>
  );
}

export default Footer;