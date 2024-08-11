// src/types/express.d.ts
import { User } from '../users/entities/user.entity'; // 필요시 User 엔티티를 가져옴

declare module 'express' {
  export interface Request {
    user?: User; // 또는 적절한 사용자 정보 타입
  }
}
