import { useState } from "react";
import { useQuery } from "react-query";
// Componentes
import Item from "./Item/item";
import Carrinho from "./Carrinho/Carrinho";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from '@material-ui/core/Badge'
// Estilos
import { Wrapper, StyledButton } from "./App.styles";
// Tipos
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProdutos = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProdutos);

  console.log(data);

  const getTotalItens = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickItem: CartItemType) => {
    setCartItems(prev => {
      //1 - item pronto para ser adicionado no carrinho?
      const isItemInCart = prev.find(item => item.id === clickItem.id);

      if (isItemInCart) {
        return prev.map(item => (
          item.id === clickItem.id ? { ...item, amount: item.amount + 1 } : item
        ))
      }

      // Adicionando item
      return [...prev, { ...clickItem, amount: 1 }];
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item]
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Algum erro na API ocorreu.</div>

  return (
    <Wrapper>
      <h2 className="txtHigh">Simples Loja</h2>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Carrinho cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItens(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
