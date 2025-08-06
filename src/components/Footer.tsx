import React from "react"
import { Heart, MessageCircle, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-50 to-purple-50 border-t border-pink-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* 브랜드 섹션 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <h3 className="text-xl font-bold text-slate-800">Lovely Dream</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              소중한 순간들을 기록하고 공유하는 커플 전용 플랫폼입니다. 
              여러분의 아름다운 추억을 함께 만들어가요.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* 서비스 섹션 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800">서비스</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-pink-500 transition-colors">우리만의 추억</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">모두의 추억</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">캘린더 (준비중)</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">AI 채팅</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">AI 추천</a></li>
            </ul>
          </div>

          {/* 고객지원 섹션 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800">고객지원</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-pink-500 transition-colors">공지사항</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">서비스 소개</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">1:1 문의하기</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">버그 신고</a></li>
            </ul>
          </div>

          {/* 법적 고지 섹션 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800">법적 고지</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-pink-500 transition-colors">이용약관</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">위치기반서비스 이용약관</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">전자금융거래 이용약관</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">마케팅 정보 수신 동의</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">맞춤형 추천/개인화 서비스 동의</a></li>
            </ul>
          </div>

          {/* 연락처 섹션 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800">연락처</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@lovelydream.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>1588-1234</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>서울특별시 강남구 테헤란로 123</span>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs text-gray-500">
                평일 09:00 - 18:00<br />
                주말 및 공휴일 휴무
              </p>
            </div>
          </div>
        </div>

        {/* 하단 구분선 */}
        <div className="border-t border-pink-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © 2024 Lovely Dream. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-pink-500" />
              <span>for couples</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 