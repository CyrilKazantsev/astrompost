import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Footer } from "./components/Footer";
import { postData } from "../posts.js";
import { PostsList } from "./components/PostsList";
import { Pagination } from 'antd';
import { Header } from "./components/Header";
import { PaginationScroll } from "./components/Pagination";


export const App = () => {
  const [cards, setCards] = useState(postData);
  // Потом будет UseEffect который вызывает setCards
    return (
      <>
        <Header />
        <main className="content container">
          <div className="content__cards">
            <PostsList postsData={cards}/>
          </div>
            <PaginationScroll data={cards}/>
            {/* <Pagination simple defaultCurrent={2} total={50} /> Потом разберусь */}
        </main>
        <Footer/>
      </>
    );
  };