import styled from "styled-components";

import { StyledFunction } from "styled-components"

interface MyProps {
  small: boolean
}
//@ts-ignore
const Button: StyledFunction<MyProps & React.HTMLProps<HTMLInputElement>> = styled.button`
//@ts-ignore
font-size:${props => props.small ? '.9rem' : '1.2rem'};
//@ts-ignore
border-radius:${props => props.small ? '10%' : '20%'};
box-shadow:none;
background-color:#0000001a;
outline:none;
border:none;
margin:.3rem;
//@ts-ignore
height: ${props => props.small ? '25px' : '50px'};
//@ts-ignore
width:${props => props.small ? '100px' : '120px'};
&:hover{
cursor:pointer;
background-color:#0000002a;
}
`






export default Button