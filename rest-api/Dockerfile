# Node.js 베이스 이미지를 사용합니다.
FROM node:16-alpine

# 애플리케이션 작업 디렉토리 설정
WORKDIR /app

# 전역으로 typescript 설치
RUN npm install -g typescript

# package.json과 package-lock.json을 복사
COPY package*.json ./

# 모든 의존성 설치
RUN npm install

# 모든 소스 파일 복사
COPY . .

# TypeScript 코드를 빌드
RUN npm run build

# 애플리케이션이 사용할 포트
EXPOSE 3000

# 애플리케이션 시작 명령
CMD ["npm", "start"]
