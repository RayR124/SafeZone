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

const SearchBar = ({ onSearch }) => {
    const [address, setAddress] = useState('');
    const [getLatLong, { loading, error, }] = useMutation(GET_LAT_LONG_MUTATION);

    const handleInputChange = (event) => {
        setAddress(event.target.value);
    };

    const handleSearchClick = async () => {
        const { data } = await getLatLong({ variables: { address } });
        onSearch(data.getLatLong);
    };

      const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

    return (
        <div>
            <input type="text" value={address} onChange={handleInputChange} onKeyDown={handleInputKeyDown} placeholder="Search for an address" />
            <button className="cool-button" onClick={handleSearchClick}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default SearchBar;