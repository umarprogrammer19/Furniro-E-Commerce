"use client";
import { useState, useEffect } from "react";
import { MenuIcon, X, LogOut } from "lucide-react"; // Import Logout Icon
import Link from "next/link";
import CartSection from "../sections/shop/CartSection";
import { RemoveScroll } from "react-remove-scroll";
import { useAtomValue } from "jotai";
import { Badge } from "../ui/badge";
import { cartAtom } from "@/lib/storage/jotai";
import Image from "next/image";
import { useSearch } from "@/context/searchContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import for handling cookies

function NavBar() {
  const [showCart, setShowCart] = useState(false);
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const cartValue = useAtomValue(cartAtom);
  const { searchQuery, setSearchQuery } = useSearch();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in (Token exists)
  useEffect(() => {
    const token = localStorage.getItem("accessToken") || Cookies.get("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // Clear localStorage & cookies
    localStorage.removeItem("accessToken");
    Cookies.remove("accessToken");

    // Redirect to login page
    router.push("/login");

    // Update auth state
    setIsAuthenticated(false);
  };

  const links = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/shop" },
    { title: "Blog", link: "/Blog" },
    { title: "Contact", link: "/contact" },
  ];

  const icons = [
    {
      iconUrl: "/images/user_icon.png",
      alt: "user icon",
      action: () => router.push("/profile"),
    },
    {
      iconUrl: "/images/heart_icon.png",
      alt: "heart icon",
      action: () => console.log("Wishlist"),
    },
    {
      iconUrl: "/images/cart_icon.png",
      alt: "cart icon",
      action: () => setShowCart(!showCart),
      badgeValue: cartValue?.length,
    },
  ];

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="relative">
      <div className="md:sticky md:top-0 md:shadow-none z-20 relative">
        {/* DESKTOP NAVBAR */}
        <div className="hidden lg:block animate-in fade-in zoom-in bg-white p-4">
          <div className="flex justify-between mx-[41px] items-center">
            <Link href="/">
              <Image src="/images/logo.png" width={150} height={60} alt="logo" />
            </Link>

            <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
              {links.map((link, index) => (
                <Link
                  href={link.link}
                  key={index}
                  className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
                >
                  <p>{link.title}</p>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-[40px] select-none">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Products"
                className="px-2 py-1 border rounded"
              />

              {icons.map((icon, index) => (
                <div key={index} className="relative">
                  <Image
                    src={icon.iconUrl}
                    onClick={icon.action}
                    alt={icon.alt}
                    width={25}
                    height={25}
                    className="cursor-pointer"
                  />
                  {icon?.badgeValue ? (
                    <Badge
                      variant="destructive"
                      className="absolute -top-3 -right-5"
                    >
                      {icon?.badgeValue}
                    </Badge>
                  ) : null}
                </div>
              ))}

              {/* Logout Button (Only if authenticated) */}
              {isAuthenticated && (
                <LogOut
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  size={24}
                  onClick={handleLogout}
                />
              )}
            </div>
          </div>
        </div>

        {/* MOBILE NAVBAR */}
        <div
          className={`block lg:hidden shadow-sm fixed top-0 w-full z-[999] bg-white py-4 animate-in fade-in zoom-in ${menu ? "!bg-[#FFF3E3] py-2" : ""}`}
        >
          <div className="flex justify-between mx-[10px]">
            <div className="flex gap-[50px] text-[16px] items-center select-none">
              <Image src="/images/logo.png" alt="logo" width={140} height={100} className="w-[7rem]" />
            </div>
            <div className="flex items-center gap-[40px]">
              {menu ? (
                <X className="cursor-pointer animate-in fade-in zoom-in text-black" onClick={toggleMenu} />
              ) : (
                <MenuIcon onClick={toggleMenu} className="cursor-pointer animate-in fade-in zoom-in" />
              )}
            </div>
          </div>
          {menu ? (
            <div className="my-8 select-none animate-in slide-in-from-right">
              <div className="flex flex-col gap-8 mt-8 mx-4">
                {links.map((link, index) => (
                  <Link key={index} href={link.link} className="text-black cursor-pointer">
                    <p>{link.title}</p>
                  </Link>
                ))}

                <div className="flex flex-col gap-[40px] select-none">
                  {icons.map((icon, index) => (
                    <Image
                      src={icon.iconUrl}
                      onClick={icon.action}
                      alt={icon.alt}
                      key={index}
                      width={30}
                      height={30}
                      className="cursor-pointer w-[28px] h-[28px] object-contain"
                    />
                  ))}

                  {/* Logout Button in Mobile Navbar */}
                  {isAuthenticated && (
                    <LogOut
                      className="cursor-pointer text-red-500 hover:text-red-700 mt-4"
                      size={24}
                      onClick={handleLogout}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {showCart && (
        <div
          className="hidden md:block absolute animate-out left-0 right-0 top-0 h-screen bg-black/20 z-[99]"
          onClick={() => setShowCart(!showCart)}
        ></div>
      )}
      <div className="hidden md:block md:absolute top-0 right-0 z-[100]">
        {showCart && (
          <RemoveScroll>
            <CartSection toggleShowCart={() => setShowCart(!showCart)} />
          </RemoveScroll>
        )}
      </div>
    </div>
  );
}

export default NavBar;
