import React, { useState } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 360px;
  border: 1px solid rgba(20, 20, 20, 0.8);
  border-radius: 10px;
  overflow: hidden;
  max-width: 960px;
  min-width: 640px;
  @media screen and (max-width: 1170px) {
    flex-direction: column;
    width: 360px;
    height: 560px;
  }
  @media screen and (max-width: 880px) {
    width: 640px;
    min-width: 0px;
  }

  @media screen and (max-width: 375px) {
    width: 320px;
    height: 360px;
    min-width: 0px;
  }
`;

const ContainerTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(235, 235, 235, 0.24);
`;

const Title = styled.div<{ actived: boolean }>`
  padding: 10px;
  width: 100%;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 1px solid rgba(20, 20, 20, 0.8);
  background-color: ${(props) =>
    props.actived ? "rgba(20, 20, 20, 0.8)" : "transparent"};
`;

const TitleContainer = styled.div`
  border-left: 1px solid rgba(20, 20, 20, 0.8);
  overflow-y: auto;
  width: 100%;

  /* SCROLL */

  /* 스크롤바의 width */
  ::-webkit-scrollbar {
    width: 20px;
    height: 12px;
  }

  /* 스크롤바의 전체 배경색 */
  ::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  /* 스크롤바 색 */
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }

  /* 위 아래 버튼 (버튼 없애기를 함) */
  ::-webkit-scrollbar-button {
    display: none;
  }
`;

const Video = styled(YouTube)`
  width: 640px;
  height: 360px;

  @media screen and (max-width: 375px) {
    width: 330px;
    height: 180px;
  }
`;

interface IProps {
  videos: any[];
}

const opts = {
  height: "100%",
  width: "100%",
};

const Videos: React.FC<IProps> = ({ videos }) => {
  const [videoId, setVideoId] = useState("");

  if (
    videos.length > 0 &&
    videos.find((video) => video.key === videoId) === undefined
  ) {
    setVideoId(videos[0].key);
  }
  return (
    <>
      <ContainerTitle>트레일러</ContainerTitle>
      {videos.length > 0 ? (
        <Container>
          <Video videoId={videoId} opts={opts} />
          <TitleContainer>
            {videos.length > 0 &&
              videos.map((video) => (
                <Title
                  title={video.name}
                  key={video.id}
                  onClick={() => setVideoId(video.key)}
                  actived={video.key === videoId}
                >
                  {video.name}
                </Title>
              ))}
          </TitleContainer>
        </Container>
      ) : (
        "트레일러 없음"
      )}
    </>
  );
};

export default Videos;
