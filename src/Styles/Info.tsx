import styled from "styled-components";

const Info = styled.div`
align-items:left;
justify-content:space-between;
//@ts-ignore
width:${props => props.vshort ? '90px' :props.short ? '190px' : '250px' };
`

export default Info;