import styled from "styled-components";

const Info = styled.div<{vshort?:boolean,short?:boolean}>`
align-items:left;
justify-content:space-between;
width:${props => props.vshort ? '90px' :props.short ? '190px' : '250px' };
`

export default Info;