import styles from "./ButtonProducts.module.css";

const ButtonProducts = ( {children} ) => {
    return (
        <section className={styles.card}>
            <div>
                <img src={children.image} alt="Icone do menu" className={styles.image}></img>
            </div>
            <h1 className={styles.name}>{children.name}</h1>
            <p className={styles.price}>R$ {children.price}</p>
        </section>
    )
}

export default ButtonProducts;