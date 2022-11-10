import React from "react";
import {HeaderService} from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { accessProducts } from "../../api/api";
import { filterMenu } from "../../api/main";
import {ButtonProducts, ButtonKitchen, SelectMenu } from "../../components/Buttons/Buttons";
import ItemCar from "../../components/itemInCar/item";
// import { newImg } from "../../api/main";
import styles from "./menu.module.css";

export const Menu = () => {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState('');
  const [active, setActive] = useState(false);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    accessProducts()
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
      });
  }, []);


  const replaceImages = (products) => {
    products.map((product) => product.image = `https://raw.githubusercontent.com/kabianca/burger-queen-api-client/Images/src/pages/menu/menu-img/${product.id}.png`)
  };
  // console.log(products);
  replaceImages(products);
  
  const handleType = ((e) => {
    setType(e.target.value);
    setActive(current => !current);
  });
  const addProducts = (e) => {
    const idItem = e.currentTarget.dataset.id;
    console.log(idItem)
    setCarrinho(carrinho.concat([idItem]));
    console.log(carrinho);
  }

  let menu = filterMenu(products, type);

  return (
    <section className={styles.container}>
      <HeaderService/>
      <div className={styles.btnMenu}>
        <SelectMenu
          onClick={handleType}
          value={"breakfast"}
          style={{
            backgroundColor: active ? '#EBCE39' : '#403B3C',
            color: active ? '#000' : '#FFF',
          }}>
            Café da Manhã
        </SelectMenu>
        <SelectMenu
          onClick={handleType}
          value={"all-day"}>
            Principal
        </SelectMenu>
      </div>
      <div className={styles.menuShopping}>
        <section className={styles.menu}>
          {menu.map((product) => <ButtonProducts key={product.id} onClick={addProducts}>{product}</ButtonProducts>)}
        </section>
        <section className={styles.shoppingCar}>
          <div className={styles.headerCar}>
            <input className={styles.input} type="text" />
            <input className={styles.input}type="text" />
            <h1 className={styles.title}> Pedido:</h1>
            <hr />
            <ItemCar />
          </div>
          <div className={styles.btnKitchen}>
            <hr />
            <h1 className={styles.total}>Total: </h1>
            <ButtonKitchen />
          </div>
        </section>
      </div>
    </section>
  );
};