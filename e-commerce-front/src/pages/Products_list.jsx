function Products_list() {
     const products = [
    {
      id: 1,
      
      title: 'Cow Milk',
      description: 'No sugar ingredients, Natural elements',
      price: 60,
    },
    {
      id: 2,
      
      title: 'Malaysian Lacto Milk',
      description: 'Rich and creamy taste',
      price: 75,
    },
    {
      id: 3,
      
      title: 'Organic Milk',
      description: 'Made with organic ingredients',
      price: 45,
    },
  ];
    return (
      <div className="card">
        {products.map((product) => (
          <div>
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <span className="price">${product.price}</span>
          </div>
        ))}
      </div>
    );


}
export default Products_list;