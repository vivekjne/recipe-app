import React from "react";
const ExampleView = ({ data, error, loading }) => {
  return (
    <>
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          data.map((d, i) => (
            <p key={d.id} color="blue">
              {d.title}
            </p>
          ))
        )}
      </div>
      {error && <h4>Couldnt fetch data</h4>}
    </>
  );
};

export default ExampleView;
