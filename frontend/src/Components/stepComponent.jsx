import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

const StepComponent = ({step1, step2, step3, step4}) => {
    return (
     <Nav className="justify-content-center mb-4">
        {
            step1 ? <LinkContainer to='/login'>
               <Nav.Link >
                Sign In
               </Nav.Link>
            </LinkContainer> : <Nav.Link disabled>
                Sign In
            </Nav.Link>
        }
        {
            step2 ? <LinkContainer to='/shipping'>
               <Nav.Link >
                Shipping
               </Nav.Link>
            </LinkContainer> : <Nav.Link disabled>
                Shipping
            </Nav.Link>
        }
         {
            step3 ? <LinkContainer to='/payment'>
               <Nav.Link >
                Payment
               </Nav.Link>
            </LinkContainer> : <Nav.Link disabled>
                Payment
            </Nav.Link>
        }
         {
            step4 ? <LinkContainer to='/placeorder'>
               <Nav.Link >
                Place order
               </Nav.Link>
            </LinkContainer> : <Nav.Link disabled>
                Place Order
            </Nav.Link>
        }

     </Nav>
    )
}

export default StepComponent