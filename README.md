# MindsAI 백엔드 REST API

주어진 과제의 내용에 맞추어 TypeScript를 기반으로 REST API를 개발하였습니다.

## 목차

- [설치](#설치)
- [애플리케이션 실행](#애플리케이션-실행)
- [Docker 사용](#docker-사용)
- [프로젝트 구조](#프로젝트-구조)
- [API 엔드포인트](#api-엔드포인트)
- [테스트 실행](#테스트-실행)
- [사용된 기술](#사용된-기술)

## 설치

시작하기 전에, 시스템에 [Node.js](https://nodejs.org/)가 설치되어 있는지 확인하세요.

1. 저장소를 클론합니다:
   ```bash
   git clone https://github.com/your-repository.git
   ```

2. 프로젝트 디렉토리로 이동합니다:
   ```bash
   cd mindsai-backend
   ```

3. 의존성을 설치합니다:
   ```bash
   npm install
   ```

## 애플리케이션 실행

### 1. 환경 설정

프로젝트의 루트 디렉토리에 `.env` 파일을 생성하고, 다음과 같은 환경 변수를 추가합니다.

```env
JWT_SECRET=your_secret_key
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASS=rootpassword
DB_NAME=mydatabase
```

### 2. 프로젝트 빌드

TypeScript 코드를 JavaScript로 컴파일하려면 다음 명령어를 입력합니다.

```bash
npm run build
```

### 3. 애플리케이션 시작

개발 모드에서 애플리케이션을 시작하려면 다음 명령어를 입력합니다.

```bash
npm run start:dev
```

프로덕션 모드에서 애플리케이션을 시작하려면 다음 명령어를 입력합니다.

```bash
npm start
```

서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## Docker 사용

Docker를 사용하여 애플리케이션을 실행할 수 있습니다. Docker를 사용하면 애플리케이션과 데이터베이스를 컨테이너화하여 손쉽게 실행할 수 있습니다.

### 1. Docker Compose 설정

`docker-compose.yml` 파일이 프로젝트에 포함되어 있으며, 애플리케이션과 MySQL 데이터베이스를 설정합니다.

```yaml
version: '3.7'

services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: mydatabase
    ports:
      - "3306:3306"

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DB_HOST: db
      DB_PORT: 3306
      DB_USER: root
      DB_PASS: rootpassword
      DB_NAME: mydatabase
      JWT_SECRET: your_secret_key
    depends_on:
      - db
```

### 2. Docker 이미지 빌드 및 컨테이너 실행

아래 명령어를 사용하여 Docker 이미지를 빌드하고, 컨테이너를 실행할 수 있습니다.

```bash
docker-compose up --build
```

이 명령어는 애플리케이션과 MySQL 데이터베이스를 포함한 모든 서비스를 시작합니다.

### 3. 데이터베이스 및 테이블 자동 생성

Docker 컨테이너가 시작되면 `mydatabase` 데이터베이스와 `User` 테이블이 자동으로 생성됩니다. 이는 `synchronize: true` 설정에 의해 이루어집니다.

서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 프로젝트 구조

```plaintext
src/
│
├── auth/                      # 인증 관련 파일
│   ├── auth.controller.ts      # 인증 컨트롤러
│   └── auth.service.ts         # 인증 서비스
│
├── config/                    # 설정 파일
│   └── index.ts               # 데이터베이스 설정 등
│
├── container/                 # Inversify 컨테이너 설정
│   └── index.ts               # 의존성 주입을 위한 컨테이너 설정
│
├── users/                     # 사용자 관리 관련 파일
│   ├── entities/              # 사용자 엔티티 정의
│   │   └── user.entity.ts     # 사용자 엔티티
│   ├── user.controller.ts     # 사용자 컨트롤러
│   ├── user.service.ts        # 사용자 서비스
│   └── users.repository.ts    # 사용자 리포지토리
│
└── tests/                     # 테스트 파일
    └── users.controller.spec.ts  # 사용자 컨트롤러 테스트
```

## API 엔드포인트

- `POST /users`: 사용자 생성
- `GET /users`: 모든 사용자 조회
- `GET /users/:id`: ID로 사용자 조회
- `PUT /users/:id`: 사용자 정보 수정
- `DELETE /users/:id`: 사용자 삭제

모든 API 요청은 Post /users 사용자 생성을 제외하고 JWT 토큰을 통해 인증되어야 합니다.
 
## 테스트 실행

프로젝트의 테스트를 실행하려면 다음 명령어를 입력합니다. 

```bash
npm test
```

명령어 실행 시 모든 API에 대한 테스트 결과를 출력합니다.

## 사용된 기술

- **Node.js**: 서버 사이드 JavaScript 실행 환경
- **TypeScript**: JavaScript에 타입을 추가한 프로그래밍 언어
- **Express**: 웹 서버 프레임워크
- **TypeORM**: ORM(Object-Relational Mapping) 도구
- **InversifyJS**: 의존성 주입을 위한 라이브러리
- **Jest**: 테스트 프레임워크
