import CarrinhoItem from "../CarrinhoItem/CarrinhoItem";
// Estilos
import { Wrapper } from "./Carrinho.styles";
// Tipos
import { CartItemType } from "../App";

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const Carrinho: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const calcularTotal = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

    return (
        <Wrapper>
            <h2>Seu Carrinho</h2>
            {cartItems.length === 0 ? <p>Seu carrinho está vazio</p> : null}
            {cartItems.map(item => (
                <CarrinhoItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}

            <h2>Total: R${calcularTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Carrinho;