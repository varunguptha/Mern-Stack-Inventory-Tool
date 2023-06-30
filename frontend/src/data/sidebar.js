import { FaTh } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

import { RiProfileLine } from "react-icons/ri"




const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Account",
    icon: <MdAccountCircle />,
    childrens: [
      {
        title: "Profile",
        icon: <RiProfileLine />,
        path: "/profile",
      },
      {
        title: "Edit Profile",
        icon: <MdOutlineModeEditOutline />,
        path: "/edit-profile",
      },
    ],
  },

];

export default menu;