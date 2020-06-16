import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
  width: 120px;
  margin: 10px 10px 10px 0px;
`;

const Image = styled.div<{ bgUrl: string }>`
  background-image: url(${(props) => props.bgUrl});
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
`;

const Rating = styled.span`
  position: absolute;
  bottom: 5px;
  right: 5px;
  opacity: 0;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.div`
  margin-bottom: 3px;
  white-space: nowrap;
  overflow-x: hidden;
  height: 15px;
  text-overflow: ellipsis;
`;

const Year = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

interface IProps {
  id: number;
  imageUrl: string;
  title: string;
  rating: number;
  year: string;
  isMovie?: boolean;
}

const Poster: React.FC<IProps> = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  isMovie = false,
}) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container title={title}>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require("../assets/noPosterSmall.png")
          }
        />
        <Rating>
          <span role="img" aria-label="rating">
            ☆
          </span>
          {rating}/10
        </Rating>
      </ImageContainer>
      <Title>{title}</Title>
      <Year>{year}</Year>
    </Container>
  </Link>
);

export default Poster;
