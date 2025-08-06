# 🌸 LovelyDream Frontend

AI 기반 데이트 코스 추천 플랫폼 **러블리 드림**의 프론트엔드 레포지토리입니다.  
날씨, 위치, 취향에 따라 맞춤형 데이트 코스를 추천하며, 사용자 간 공유와 기록 기능을 제공합니다.

> 현재 퍼블리싱 작업은 약 70~80% 완료된 상태이며, 모든 기능 구현 후 디테일한 퍼블리싱 작업이 추가로 진행될 예정입니다.

---

## 📌 기술 스택

- React + Vite  
- TypeScript  
- Tailwind CSS  
- Shadcn UI  
- Lucide React Icons  
- Zustand (전역 상태 관리 예정)  
- GitHub Actions (CI/CD)  
- CloudFront + S3 + Route53 (배포 예정)

---

## 🧩 프로젝트 구조

```
📁 src
 ┣ 📁 components        # 재사용 가능한 컴포넌트
 ┣ 📁 pages             # 페이지 단위 구성
 ┣ 📁 hooks             # 커스텀 훅
 ┣ 📁 store             # Zustand 상태 관리
 ┣ 📁 lib               # 유틸 함수 및 외부 라이브러리
 ┣ 📁 types             # 타입 정의
 ┗ 📁 assets            # 이미지 및 리소스
```

---

## 🚀 개발 서버 실행

```bash
npm install
npm run dev
```

---

## 🧪 퍼블리싱 진행 방식

- MVP 개발 목표: 빠른 기능 구현 중심으로 작업  
- 퍼블리싱은 AI 도구(Cursor, GPT 등) 활용  
- 유지보수 및 리팩토링은 MVP 이후 단계에서 본격 진행  

---

## 👤 개발자

| 이름 | 역할 |
|------|------|
| 김재섭 ([Nirsa-Dev](https://github.com/Nirsa-Dev)) | 프론트엔드 개발, 퍼블리싱, 기획 |

📧 관심 있는 분은 islandtim@naver.com 으로 연락 주세요!

---

## 📎 관련 링크

- 개발 블로그 정리글: https://nirsa.tistory.com/467
