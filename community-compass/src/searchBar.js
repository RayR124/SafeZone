import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';

const GET_LAT_LONG_MUTATION = gql`
  mutation GetLatLong($address: String!) {
    getLatLong(address: $address) {
      lat
      lng
      businesses {
        name
        address
        city
        zipcode
        image
      }
    }
  }
`;

const SearchBar = () => {
    const [address, setAddress] = useState('');
    const [getLatLong, { loading, error, data }] = useMutation(GET_LAT_LONG_MUTATION);

    const handleInputChange = (event) => {
        setAddress(event.target.value);
    };

    const handleSearchClick = async () => {
        await getLatLong({ variables: { address } });
    };

    return (
        <div>
            <input type="text" value={address} onChange={handleInputChange} />
            <button onClick={handleSearchClick}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (
                <div>
                    <p>Businesses:</p>
                    <ul>
                        {data.getLatLong.businesses.map((business, index) => (
                            <li key={index}>
                                <p>Name: {business.name}</p>
                                <p>Address: {business.address}</p>
                                <p>City: {business.city}</p>
                                <p>Zipcode: {business.zipcode}</p>
                                <img src={business.image} alt={business.name} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;