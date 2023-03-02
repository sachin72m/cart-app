import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import { firestore } from './firebase';
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }
    // this.db = firebase.firestore();
  }

  // products: [
  //   {
  //     price: 3372,
  //     title: 'Mobile',
  //     qty: 2,
  //     img: 'https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  //     id: 1
  //   },
  //   {
  //     price: 3500,
  //     title: 'Headphones',
  //     qty: 5,
  //     img: 'https://images.unsplash.com/photo-1627377948281-6b67fd9eda5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  //     id: 2
  //   },
  //   {
  //     price: 1230,
  //     title: 'Laptop',
  //     qty: 4,
  //     img: 'https://images.unsplash.com/photo-1514826786317-59744fe2a548?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHw%3D&w=1000&q=80',
  //     id: 3
  //   }
  // ]

  // this.increaseQuantity = this.increaseQuantity.bind(this);
  // this.testing();

  //todo Now we used component did mount for fetch the or getting the data from the Firebase Database.
  componentDidMount() {

    // this.db
    firestore
      .collection("products")
      .orderBy('price', 'desc')
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map(doc => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;

        });

        this.setState({ products: products, loading: false });

      })
  }


  handleIncreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;
    // this.setState({
    //   products
    // })

    const docRef = firestore.collection('products').doc(products[index].id);
    docRef
      .update({
        qty: products[index].qty + 1
      })
      .then(() => {
        console.log('Qty Increased Successfully')
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }


  handleDecreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;
    // this.setState({
    //   products
    // })
    const docRef = firestore.collection('products').doc(products[index].id);
    docRef
      .update({
        qty: products[index].qty - 1
      })
      .then(() => {
        console.log('Qty Decreased Successfully')
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }


handleDeleteProduct = (id) => {
//   const { products } = this.state;

  // const items = products.filter((item) => item.id !== id); // [{}]

  // this.setState({
  //   products: items
  // })
  const docRef = firestore.collection('products').doc(id);
  docRef
  .delete()
  .then(() => {
    console.log('Product Deleted Successfully')
  })
  .catch((err) => {
    console.log('Error', err);
  });
}

getCartCount = () => {
  const { products } = this.state;

  let count = 0;

  products.forEach((product) => {
    count += product.qty;
  })

  return count;
}


getCartTotal = () => {
  const { products } = this.state;
  let CartTotal = 0;

  products.map((product) => {
    if (product.qty > 0) {
      CartTotal = CartTotal + product.qty * product.price
    }
    return ' '
  });

  return CartTotal;
}

addProduct = () => {
  firestore
    .collection('products')
    .add({
      img: '',
      price: 6000,
      qty: 3,
      title: "washing machine"
    })
    .then((docRef) => {
      console.log('Product has been added', docRef);
    })
    .catch((err) => {
      console.log('Error :', err);
    })
}
render() {
  const { products, loading } = this.state;
  return (
    <div className="App">
      <Navbar count={this.getCartCount()} />
      <button onClick={this.addProduct} style={{ padding: 20, fontSize:15,backgroundColor:"skyblue" }}><h2>Add a product</h2></button>
      <Cart
        products={products}
        onIncreaseQuantity={this.handleIncreaseQuantity}
        onDecreaseQuantity={this.handleDecreaseQuantity}
        onDeleteProduct={this.handleDeleteProduct}
      />
      {loading && <h1>Loading Products...</h1>}
      <div style={{ padding: 10, fontSize: 20 }}>TOTAL : {this.getCartTotal()} </div>
    </div>
  );
}
}


export default App;
