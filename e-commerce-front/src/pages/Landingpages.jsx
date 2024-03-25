import Inscription from "../components/Inscriptionfrom";
function LandingPage() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <h1>Milk is always good for health</h1>
              <p>Fresh Milk Delivery - Get the Best Milk Products Online!</p>
            
            </div>
            <Inscription/>
          </div>
        
        </div>
      </div>
    );
}
export default LandingPage;