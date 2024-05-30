import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";

export const Sidebar = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Add Firm',
  //   path: '/add-firm',
  //   cName: 'nav-text'
  // },
  {
    title: 'Add Product',
    path: '/add-product',
    cName: 'nav-text'
  },
  {
    title: 'All Products',
    path: '/all-products',
    cName: 'nav-text'
  },
  {
    title: 'User Details',
    path: '/user-details',
    cName: 'nav-text'
  }
];


