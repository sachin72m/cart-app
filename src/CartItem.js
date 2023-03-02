import React from "react";
const CartItem = (props) => {

    // this.increaseQuantity = this.increaseQuantity.bind(this);


    //TODO: This is for IncreaseQuantity...
    // increaseQuantity = () => {
    // this.state.qty +=1;
    // console.log('this.state', this.state);

    //todo: setState form 1 , why we used setState here becoz we have to increase quantity as we increase.
    // this.setState({
    //     qty: this.state.qty +1
    // price: this.state.price *2 //todo: If we want price as same as we increase our product quantity.
    // });

    //? setState form 2 , This are two state Forms 1 and 2, with help of we can change our quntity .

    //     this.setState((prevState) => {
    //         return {
    // qty: prevState.qty + 1
    //         }
    //     }, () => {
    //         console.log('this.state', this.state);
    //     });
    // }

    //TODO: This for DecreaseQuantity...

    // decreaseQuantity = () => {
    //     const { qty } = this.state;

    // if (qty === 0) { //TODO: Why we used this if condition here becoz we don't want our quntity go up (-1,-2,-3....etc.)
    //TODO: it will stay only till 0 .
    // return;
    // }

    //     this.setState((prevState) => {
    //         return {
    // qty: prevState.qty - 1
    //         }
    //     });
    // }

    const { price, title, qty } = props.product;
    const {
        product,
        onIncreaseQuantity,
        onDecreaseQuantity,
        onDeleteProduct
    } = props;
    return (
        <div className="cart-item">
            <div className="left-block">
                <img alt="img" style={styles.image} src={product.img}/>
            </div>
            <div className="right-block">
                <div style={{ fontSize: 25 }}>{title}</div>
                <div style={{ color: '#777' }}>Rs {price} </div>
                <div style={{ color: '#777' }}>Qty: {qty} </div>
                <div className="cart-item-actions">
                    {/* Buttons */}
                    <img
                        alt="increase"
                        className="action-icons"
                        src="https://cdn-icons-png.flaticon.com/512/9604/9604309.png"
                        onClick={() => onIncreaseQuantity(product)}
                    />
                    <img
                        alt="decrease"
                        className="action-icons"
                        src="https://cdn-icons-png.flaticon.com/512/1665/1665714.png"
                        onClick={() => onDecreaseQuantity(product)}
                    />
                    <img
                        alt="delete"
                        className="action-icons"
                        src="https://cdn-icons-png.flaticon.com/512/3178/3178290.png"
                        onClick={() => onDeleteProduct(product.id)}
                    />
                </div>
            </div>
        </div>
    );
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;

