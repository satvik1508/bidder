import React,{useState,useEffect} from 'react'
import axios from 'axios'
import io from 'socket.io-client'


const Userdash = () => {
  const [items , setItem] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [bidAmount, setBidAmount] = useState({});
  // const [selectedItemId, setSelectedItemId] = useState(null);

  const socket = io('http://localhost:3000');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/items')
        // console.log(response.data)
        setItem(response.data)
      } catch (error) {
        console.error('Error fetching items',error)
      }
    }
    fetchItems()
  },[])

  const handleBid = async (itemId) => {
    try {
      const token = localStorage.getItem('token'); 
      // console.log('Token:', token);
      // console.log('Item ID:', itemId); 
      // console.log('Bid Amount:', bidAmount); 

      if(!token){
        throw new error('No token found')
      }

      const config = {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      };
      
      const response = await axios.post(`http://localhost:3000/api/v1/${itemId}`, { bidAmount: bidAmount[itemId] },config);
      console.log("Response data:", response.data);

      const itemData = response.data.item;
      if(itemData){
        console.log("Item data:", itemData);
      }

      const productName = itemData.productName;
      console.log('Product Name:', productName)

      const updatedItems = items.map((item) => item._id === itemId ? response.data.item : item);
      setItem(updatedItems);
      // const socket = io('http://localhost:3000');

      // const productName = itemData.productName;
      // console.log('Product Name:', productName)

      socket.emit('newBid' , {
        productName,
        bidAmount: bidAmount[itemId]
      })
      } catch (error) {
      console.error('Error placing bid', error.response ? error.response.data : error.message);
    }
  };


  const handleBidAmountChange = (itemId, amount) => {
    setBidAmount((prevBidAmounts) => ({
      ...prevBidAmounts,
      [itemId]: amount
    }))
  }

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }


  const filteredItems = items.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">Items For Bidding</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 md:w-1/3 p-2 border border-gray-300 rounded-lg"
        />

        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 float-right">
          Logout
        </button>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
          <img src={item.image} alt={item.productName} className="mb-4 w-full h-48 object-contain rounded-md " />
            <h2 className="text-xl font-bold mb-2">Product Name - {item.productName}</h2>
            <p className="text-gray-700 mb-4">Product description - {item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-semibold">Starting Price: ₹{item.startingPrice}</span>
              <span className="text-gray-900 font-semibold">Current Price: ₹{item.currentPrice}</span>
            </div>
            
          <div>
           <input 
            type='text'
            placeholder="Enter your bid amount"
            value={bidAmount[item._id] || ''}
            onChange = {(e) => handleBidAmountChange(item._id, e.target.value)}
            // onFocus = {() => setSelectedItemId(item._id)}
            className="w-full p-2 border border-gray-300 rounded-lg mt-4"
           /> 
           </div>

            <div className="flex justify-center">
            <button onClick= {() => handleBid(item._id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">
              BID
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Userdash