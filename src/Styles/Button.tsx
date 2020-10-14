import styled from "styled-components";

const Button = styled.button<{small?:boolean}>`
font-size:${props => props.small ? '.9rem' : '1.2rem'};
border-radius:${props => props.small ? '10%' : '20%'};
box-shadow:none;
background-color:#0000001a;
outline:none;
border:none;
margin:.3rem;
height: ${props => props.small ? '25px' : '50px'};
width:${props => props.small ? '100px' : '120px'};
&:hover{
cursor:pointer;
background-color:#0000002a;
}
`

export default Button