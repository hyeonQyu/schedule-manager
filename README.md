<img src="https://img.shields.io/badge/version-1.0.0-blueviolet.svg" align="right">

<div align="center">
  <h1>schedule-manager</h1>
</div>

## 목차
1. [**개발 동기**](#1)
1. [**주요 기능**](#2)
1. [**기술 스택**](#3)
1. [**개발자 소개**](#4)
1. [**협업 방식**](#5)

<div id="1"></div>

## 🎉 개발 동기
> A : "우리 이번 주에 언제 만날까?"  
> B : "나 이번 주 월요일은 프로젝트 전체 회의, 화요일은 세미나, 수요일은 서류 접수 있고, ··· 토요일 어때?"  
> A : "토요일만 시간이 안 되네 ㅠㅠ 다음 주는 언제가 괜찮아?"

나의 일정을 연인과 미리 공유하고, 데이트 날짜를 편하게 정할 수 있는 방법이 필요했다.  

<div id="2"></div>

## 💡 주요 기능
### 1. 일정 달력
- 달력에 날짜별로 스케줄이 간략하게 표시된다.
- 달력에서 날짜를 선택하고 우측 하단에 있는 ➕ 버튼을 누르면 일정 추가 모달이 열린다.

<img src="https://user-images.githubusercontent.com/58380158/154858424-07c6206e-1567-4657-bcf4-ca449fa2f50e.jpg" width=200> <img src="https://user-images.githubusercontent.com/58380158/154855790-c4b139df-0ad1-4526-aa63-ed712c4de69e.jpg" width=200>

### 2. 일정 추가 모달
- 일정 이름, 시작 시간, 종료 시간, 장소를 입력하고 일정 상태를 선택한다.
- 일정 내용을 작성하고 완료 버튼을 누르면 일정이 저장된다.
- 자주 사용하는 일정으로 등록하면 기존 내용을 불러와 일정을 간편하게 추가할 수 있다.

<img src="https://user-images.githubusercontent.com/58380158/154856001-17cb4c47-4ad9-4f54-bda3-d2f877ee6180.jpg" width=200> <img src="https://user-images.githubusercontent.com/58380158/154859532-04e9200e-382e-40d2-9537-986a6b9678d8.jpg" width=200> <img src="https://user-images.githubusercontent.com/58380158/154858466-276ef34c-fb83-4439-b6fb-4d922b8f3e84.jpg" width=200> <img src="https://user-images.githubusercontent.com/58380158/154856062-6db55efd-9164-48cd-b75a-122cd78c9d68.jpg" width=200>


### 3. 주간 일정
상단에 고정된 슬라이더를 통해 주 단위로 이동하면서 원하는 주의 일정을 확인할 수 있다.

<img src="https://user-images.githubusercontent.com/58380158/154855887-478245d6-a2ea-4dc1-8974-e40e3f1bad49.jpg" width=200> <img src="https://user-images.githubusercontent.com/58380158/154856936-2395cdff-06d3-4dd0-97ef-0ec06dde93ea.gif" width=200>


### 4. 주간/월간 통계
- 주간 통계 : 나와 상대방의 일정이 일주일 동안 무슨 요일에 얼마나 있었는지 확인할 수 있다.
- 월간 통계 : 데이트 한 날, 데이트 못한 날로 나눠서 한 달 동안 얼마나 만났는지 알 수 있다. 데이트 한 날짜는 원형 차트 안쪽에 나타난다.

<img src="https://user-images.githubusercontent.com/58380158/154855767-bc5503ee-bd05-443c-8628-6075049751a2.jpg" width=200> <img src="https://user-images.githubusercontent.com/58380158/154856731-f117afb7-4e64-4247-ae7f-fb3d744f0a47.gif" width=200>

<div id="3"></div>

## 🛠 기술 스택
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/MobX-FF9955?style=flat-square&logo=MobX&logoColor=white"/> <img src="https://img.shields.io/badge/Sass(SCSS)-CC6699?style=flat-square&logo=Sass&logoColor=white"/> <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white"/> <img src="https://img.shields.io/badge/Babel-F9DC3E?style=flat-square&logo=Babel&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/>

<div id="4"></div>

## 👩🏻‍❤️‍👨🏻 개발자 소개
|김현규|백지연|
|-|-|
|<img width=300 /><ul><li>구글 소셜 로그인</li><li>일정 달력</li><li>일정 추가 모달</li><li>월간 통계</li><li>파이어베이스 연동</li><li>파이어스토어 데이터베이스 쿼리</li><li>PWA(Progressive Web App) 적용</li></ul>|<img width=300 /><ul><li>주간 일정</li><li>주간 통계</li></ul>|
|<div align='center'>[@hyeonQyu](https://github.com/hyeonQyu)<div/>|<div align='center'>[@100Gyeon](https://github.com/100Gyeon)<div/>|

<div id="5"></div>

## 🤝🏼 협업 방식
### Commit message convention
- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 형식, 정렬, 주석 수정
- refactor: 코드 리팩토링
- chore: 그 외 자잘한 변경

### Git branch strategy
- **develop - feature**
- develop : 배포 및 개발된 기능(feature)을 통합하는 브랜치
- feat/[name] : 담당자별 기능 개발을 진행하는 브랜치

### etc.
- 주 1회(토요일 14시) 회의 진행
- 깃허브 칸반 보드 활용
