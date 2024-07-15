import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

const StepComponent = ({step1, step2, step3, step4}) => {
    return (
     <Nav className="justify-content-center mb-4">
        {
            step1 ? <LinkContainer to='/login'>
               <Nav.Link >
                signIn
               </Nav.Link>
            </LinkContainer> : <Nav.Link disabled>
                sign In
            </Nav.Link>
        }
        {
            step2 ? <LinkContainer to='/shipping'>
               <Nav.Link >
                shipping
               </Nav.Link>
            </LinkContainer> : <Nav.Link disabled>
                shipping
            </Nav.Link>
        }
         {
            step3 ? <LinkContainer to='/payment'>
               <Nav.Link >
                payment
               </Nav.Link>
            </LinkContainer> : <Nav.Link disabled>
                payment
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