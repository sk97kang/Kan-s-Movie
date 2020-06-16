# Kan's Movie

React + Typescript + Rest API를 이용한 Simple Movie Web

## Screens

- [x] Header : 뒤로가기, Movie, TV, Search 화면 전환
- [x] Home : Show Movies
- [x] TV : Show TV Shows
- [x] Search : Movie or TV Show Search
- [x] Detail : Movie or TV Show Detail
- [x] More : More Movies

## API Verbs

- [x] Now playing (Movie)
- [x] Upcoming (Movie)
- [x] Popular (Movie, TV)
- [x] Top Rated (TV)
- [x] Airing Today (TV)
- [x] TV Show Detail
- [x] Movie Detail
- [x] Search (Movie, TV)

## 기능

- [x] Header 내 뒤로가기 버튼을 이용한 뒤로가기
- [x] Scrollbar를 이용한 Movie, TV Show List
- [x] Grid Layout을 이용한 Movie, TV Show List
- [x] More Movies Page(Noy Playing, Upcoming Playing, Popular Playing)에서 더 많은 Movie 표시
- [x] Movie or TV Show Search 기능

- 2020-06-16
- [x] Javascript -> Typescript 전환
- [x] 예고편 미리보기
- [x] useContext를 이용한 Translate(한국어->English, English->한국어)

## 개발 예정

- [ ] Movie recommendation
- [ ] Movie Category

## Use Library

- React Router Dom
  - React에서 Router 기능을 제공

```
yarn add react-router-dom
yarn add --dev @types/react-router-dom
```

- Styled Components
  - JS Code내에서 Style Code를 쓸 수 있다.

```
yarn add styled-components
yarn add --dev @types/styled-components
```

- Styled Reset
  - SC를 이용해서 css를 초기화

```
yarn add styled-reset
```

- Axios
  - API에 request하여 정보는 받아옴

```
yarn add axios
yarn add --dev @types/axios
```

- React Helmet
  - WebSite의 Title을 쉽게 바꿀 수 있음

```
yarn add react-helmet
yarn add --dev @types/react-helmet
```

# Version

- v1.0.0 : 최조 Release
- v1.1.0 : Movie Detail 예고편 추가
- v1.2.0 : 한국어, English 간 Translation 지원

# 스터디 정리

## Container Presenter Pattern

- Container(Logic)과 Presenter(UI)를 분리
