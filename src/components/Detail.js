import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
function Detail(props) {
  let { id } = useParams();
  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
export default Detail;
