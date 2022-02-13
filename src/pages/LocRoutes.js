import { useParams } from "react-router-dom";
function LocRoutes() {
  const { loc } = useParams();
  console.log("This is loc param", loc)
  return (
    <div>
      <h3>This is {loc}'s LocRoute</h3>
    </div>
  );
}

export default LocRoutes;
