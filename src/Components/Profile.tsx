import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
  width: 80px;
  margin: 10px 10px 5px;
`;

const Name = styled.div`
  margin-bottom: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  height: 15px;
`;

const Part = styled.div`
  color: rgba(235, 235, 235, 0.8);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  height: 15px;
`;

const Image = styled.div<{ bgUrl: string }>`
  background-image: url(${(props) => props.bgUrl});
  width: 80px;
  height: 120px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
`;

interface IProps {
  id: string;
  imageUrl: string;
  name: string;
  part: string;
}

const Profile: React.FC<IProps> = ({ id, imageUrl, name, part }) => {
  return (
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require("../assets/noPosterSmall.png")
          }
        ></Image>
      </ImageContainer>
      <Name>{name}</Name>
      <Part>{part}</Part>
    </Container>
  );
};

export default Profile;
