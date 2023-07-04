export const ItemDetail = ({ prod }) => {
  return (
    <>
      <h2>{prod.name}</h2>
      <p>{prod.details}</p>
      <div>{prod.price}</div>
      <div>{prod.category}</div>
      <img src={prod.img} alt="nft" />
      {/*  NO CARGAN LAS IMAGENES */}
    </>
  );
};
