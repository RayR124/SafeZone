import React, { useState } from "react";

function LandingPage() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`$/search?q=${search}`);
      if (!response.ok) {
        throw new Error("Oops! Something that wasn't supposed to happen happened!");
      }
      //const results = await response.json();
      setSearchResult(response.url);
      console.log(response);
      setSearched(true);
      setSearch("");
    } catch (error) {
      setError(error.message);
    } return [search];
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <header>
        <p style={{ position: "fixed", left: 0, maxWidth: 250, marginLeft: 25, marginTop: 100 }}>
          <li >SafeZone can tell you everything you might want to know about your perspective new home and it's neighborhood.</li><li>SafeZone provides information and reviews about neighborhood crime rates, tells you data on schools in the area, including the public reviews of those schools, and other things like local attractions or places of interest like nearby parks, museums, recreational areas, etc.</li><li>SafeZone is used by millions of people daily, as someone somewhere is always looking to buy or rent a new home.</li><li>Simply type in an address and then we give you the information in a clean and simple to understand layout. With SafeZone any new home buyer or renter will have a more informed idea of the area in which they're planning to live.</li></p>
      </header>
      <main className="main">
        <div className="search">
          <input type="text" value={search} onChange={handleInputChange} onKeyDown={handleInputKeyDown} placeholder="Search for an address" />
          <button className="cool-button" onClick={handleSearch}>Search</button>
        </div>
        <div className="search-result" style={{ justifyContent: 'center', alignItems: 'center' }}>
          {!searched && (
            <img src="https://source.unsplash.com/1600x900/?neighborhood" alt="Search result" style={{ zIndex: 1, maxWidth: "100%", maxHeight: "100%", borderRadius: "50px", bottom: 0, left: 0, width: 1400, height: 750, marginLeft: 300 }}
            />
          )}
        </div>
        {searched && (
          <div className="result-window" style={{ zIndex: 1, maxWidth: "100%", maxHeight: "100%", borderRadius: "50px", bottom: 0, left: 0, width: 1400, height: 750, marginLeft: 300, backgroundImage: `url(${searchResult})`, backgroundSize: 'cover' }}>
            <div className="title" style={{ borderRadius: "25px", width: "400px", height: "100px", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" }} >
              <p style={{ color: "#fff", fontSize: 35 }}>{search}</p>
            </div>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </main>
      {searched && (
        <div className="crimeGrade" style={{ marginTop: 300, borderRadius: "25px", width: "400px", height: "100px", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" }} >
          <p style={{ color: "#fff", fontSize: 35 }}>{"Crime Grade C-"/*crime grade API call results*/}</p>
        </div>
      )}
      {searched && (
        <div className="schoolGrade" style={{ marginTop: 450, borderRadius: "25px", width: "400px", height: "100px", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" }} >
          <p style={{ color: "#fff", fontSize: 35 }}>{"School Zone ****"/*school grade API call*/}</p>
        </div>
      )}
      {searched && (
        <div className="amenities" style={{ marginTop: 600, borderRadius: "25px", width: "400px", height: "100px", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" }} >
          <p style={{ color: "#fff", fontSize: 35 }}>{"LOCKED"/*amenities API call*/}</p>
        </div>
      )}
      {searched && (
        <div className="recreation" style={{ marginTop: 750, borderRadius: "25px", width: "400px", height: "100px", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" }} >
          <p style={{ color: "#fff", fontSize: 35 }}>{"LOCKED"/*rec areas API call*/}</p>
        </div>
      )}
    </div>
  );
}

export default LandingPage;