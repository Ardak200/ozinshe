import styled from "styled-components";

export const FileUploadContainer = styled.section`
  position: relative;
  border: 2px dashed rgba(143, 146, 161, 0.2);
  padding:40px 0 ;
  border-radius: 16px;
  display: flex;
  cursor:pointer;
  flex-direction: column;
  align-items: center;
  background: rgba(143, 146, 161, 0.05);
  margin-bottom:16px
`;

export const FormField = styled.input`
  font-size: 18px;
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;

  &:focus {
    outline: none;
  }
`;

export const InputLabel = styled.label`
  top: -21px;
  font-size: 13px;
  color: black;
  left: 0;
  position: absolute;
`;

export const DragDropText = styled.p`
  font-weight: bold;
  letter-spacing: 2.2px;
  margin-top: 0;
  text-align: center;
`;

export const DragDropImgIcon = styled.img`
   margin: auto;
   cursor:pointer;
`;

export const UploadFileBtn = styled.button`
  box-sizing: border-box;
  margin-top:16px;
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 0;
  text-align: center;
  font-weight: 500;
  color: #8F92A1;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;
  font-family: "Roboto";
  font-size:14px;
  display: flex;
  align-items: center;
  padding-right: 0;
  justify-content: center;
  
  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    background: #3498db;
    z-index: -1;
    transition: width 250ms ease-in-out;
  }
  
  span b {
    color: #0052CC;
  }
  i {
    font-size: 22px;
    margin-right: 5px;
    border-right: 2px solid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width: 500px) {
    width: 70%;
  }

  @media only screen and (max-width: 350px) {
    width: 100%;
  }

  &:disabled {
    opacity: 0.4;
    filter: grayscale(100%);
    pointer-events: none;
  }
`;

export const FilePreviewContainer = styled.article`

  span {
    font-size: 14px;
  }
`;

export const PreviewList = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-bottom:16px;
    
  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const FileMetaData = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right:5px;
  top:0;
  padding: 10px;
  border-radius: 4px;
  color: white;
  font-weight: bold;

  aside {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
`;

export const RemoveFileIcon = styled.img`
  cursor: pointer;
`;

export const PreviewContainer = styled.section`
  padding: 0.25rem;
  width: ${(props) => (props.multiple === false ? "150px" : "20%")};
  height: ${(props) => (props.multiple === false ? "220px" : "140px")};
  border-radius: 4px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.85;
    -webkit-box-shadow: 2px 8px 11px -9px rgba(34, 60, 80, 0.04);
-moz-box-shadow: 2px 8px 11px -9px rgba(34, 60, 80, 0.04);
box-shadow: 2px 8px 11px -9px rgba(34, 60, 80, 0.04);
    
    ${FileMetaData} {
      display: flex;
    }
  }

  & > div:first-of-type {
    height: 100%;
    position: relative;
  }

  @media only screen and (max-width: 750px) {
    width: 25%;
  }

  @media only screen and (max-width: 500px) {
    width: 50%;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
    padding: 0 0 0.4em;
  }
`;

export const ImagePreview = styled.img`
  border-radius: 4px;
  width: 100%;
  height: 100%;
`;