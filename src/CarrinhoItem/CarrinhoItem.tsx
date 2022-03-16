import Button from '@material-ui/core/Button';
//Tipos
import { CartItemType } from '../App';
// Estilos
import { Wrapper } from './CarrinhoItem.styles';

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const CarrinhoItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
    <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <div className='infoBox'>
                <p>Preço: R${item.price}</p>
                <p>Total: R${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button size="small" disableElevation variant='contained' onClick={() => removeFromCart(item.id)}>
                    -
                </Button>

                <p>{item.amount}</p>

                <Button size="small" disableElevation variant='contained' onClick={() => addToCart(item)}>
                    +
                </Button>
            </div>
        </div>
        <img src={item.image} alt={item.title} />
    </Wrapper>
)

export default CarrinhoItem;