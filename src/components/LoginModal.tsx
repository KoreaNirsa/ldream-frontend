import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import ProfileSetupModal from "./ProfileSetupModal"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (email: string, password: string) => void
  defaultTab?: "login" | "signup"
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, defaultTab = "login" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")
  const [signupName, setSignupName] = useState("")
  const [signupNickname, setSignupNickname] = useState("")
  const [signupBirthdate, setSignupBirthdate] = useState("")
  const [signupMbti, setSignupMbti] = useState("")
  const [agreements, setAgreements] = useState({
    age: false,
    service: false,
    location: false,
    marketing: false,
    dataAnalysis: false
  })
  const [showProfileSetup, setShowProfileSetup] = useState(false)

  const handleLogin = () => {
    if (loginEmail === "user" && loginPassword === "qwer1234!") {
      console.log("로그인 성공")
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("currentUser", JSON.stringify({ email: loginEmail, name: "사용자" }))
      onLogin(loginEmail, loginPassword)
      onClose()
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.")
    }
  }

  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [showEmailVerificationMessage, setShowEmailVerificationMessage] = useState(false)
  const [signupGender, setSignupGender] = useState("")
  const [signupLocation, setSignupLocation] = useState("")

  const handleEmailVerification = () => {
    if (signupEmail && signupEmail.includes("@")) {
      setIsEmailVerified(true)
      setShowEmailVerificationMessage(true)
      setTimeout(() => setShowEmailVerificationMessage(false), 3000)
    }
  }

  const handleSignup = () => {
    if (!signupName || !signupNickname || !signupBirthdate || !signupMbti || 
        !signupEmail || !signupPassword || !signupConfirmPassword || !signupGender) {
      alert("모든 필수 항목을 입력해주세요.")
      return
    }
    
    if (signupPassword !== signupConfirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }
    
    if (!agreements.age || !agreements.service || !agreements.location) {
      alert("필수 약관에 동의해주세요.")
      return
    }
    
    console.log("회원가입 성공")
    alert("회원가입이 완료되었습니다!")
    setShowProfileSetup(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[95vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-center">LovelyDream</CardTitle>
          <CardDescription className="text-center">
            특별한 데이트를 계획해보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">로그인</TabsTrigger>
              <TabsTrigger value="signup">회원가입</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="login-email">이메일</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">비밀번호</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleLogin}>
                  로그인
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">또는</span>
                  </div>
                </div>
                
                {/* 소셜 로그인 버튼들 */}
                <div className="space-y-3">
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium" onClick={() => alert("카카오 로그인")}>
                    카카오로 로그인
                  </Button>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium" onClick={() => alert("네이버 로그인")}>
                    네이버로 로그인
                  </Button>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium" onClick={() => alert("구글로 로그인")}>
                    구글로 로그인
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-4">
                {/* 이메일과 비밀번호를 가장 위로 */}
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-900">이메일 <span className="text-red-600">*</span></Label>
                  <div className="flex gap-2">
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="이메일을 입력하세요"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleEmailVerification}
                      disabled={!signupEmail || !signupEmail.includes("@")}
                    >
                      인증
                    </Button>
                  </div>
                  {showEmailVerificationMessage && (
                    <p className="text-sm text-green-600">이메일 인증이 완료되었습니다</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-900">비밀번호 <span className="text-red-600">*</span></Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password" className="text-gray-900">비밀번호 확인 <span className="text-red-600">*</span></Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-gray-900">이름 <span className="text-red-600">*</span></Label>
                    <Input
                      id="signup-name"
                      placeholder="이름을 입력하세요"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-nickname" className="text-gray-900">애칭 <span className="text-red-600">*</span></Label>
                    <Input
                      id="signup-nickname"
                      placeholder="애칭을 입력하세요"
                      value={signupNickname}
                      onChange={(e) => setSignupNickname(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-birthdate" className="text-gray-900">생년월일 <span className="text-red-600">*</span></Label>
                    <Input
                      id="signup-birthdate"
                      type="date"
                      value={signupBirthdate}
                      onChange={(e) => setSignupBirthdate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-gender" className="text-gray-900">성별 <span className="text-red-600">*</span></Label>
                    <Select value={signupGender} onValueChange={setSignupGender}>
                      <SelectTrigger>
                        <SelectValue placeholder="성별을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="남성">남성</SelectItem>
                        <SelectItem value="여성">여성</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-mbti" className="text-gray-900">MBTI <span className="text-red-600">*</span></Label>
                    <Select value={signupMbti} onValueChange={setSignupMbti}>
                      <SelectTrigger>
                        <SelectValue placeholder="MBTI를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INTJ">INTJ</SelectItem>
                        <SelectItem value="INTP">INTP</SelectItem>
                        <SelectItem value="ENTJ">ENTJ</SelectItem>
                        <SelectItem value="ENTP">ENTP</SelectItem>
                        <SelectItem value="INFJ">INFJ</SelectItem>
                        <SelectItem value="INFP">INFP</SelectItem>
                        <SelectItem value="ENFJ">ENFJ</SelectItem>
                        <SelectItem value="ENFP">ENFP</SelectItem>
                        <SelectItem value="ISTJ">ISTJ</SelectItem>
                        <SelectItem value="ISFJ">ISFJ</SelectItem>
                        <SelectItem value="ESTJ">ESTJ</SelectItem>
                        <SelectItem value="ESFJ">ESFJ</SelectItem>
                        <SelectItem value="ISTP">ISTP</SelectItem>
                        <SelectItem value="ISFP">ISFP</SelectItem>
                        <SelectItem value="ESTP">ESTP</SelectItem>
                        <SelectItem value="ESFP">ESFP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-location" className="text-gray-900">사는 지역 <span className="text-red-600">*</span></Label>
                    <Select value={signupLocation} onValueChange={setSignupLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="지역을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="서울">서울</SelectItem>
                        <SelectItem value="부산">부산</SelectItem>
                        <SelectItem value="대구">대구</SelectItem>
                        <SelectItem value="인천">인천</SelectItem>
                        <SelectItem value="광주">광주</SelectItem>
                        <SelectItem value="대전">대전</SelectItem>
                        <SelectItem value="울산">울산</SelectItem>
                        <SelectItem value="세종">세종</SelectItem>
                        <SelectItem value="경기">경기</SelectItem>
                        <SelectItem value="강원">강원</SelectItem>
                        <SelectItem value="충북">충북</SelectItem>
                        <SelectItem value="충남">충남</SelectItem>
                        <SelectItem value="전북">전북</SelectItem>
                        <SelectItem value="전남">전남</SelectItem>
                        <SelectItem value="경북">경북</SelectItem>
                        <SelectItem value="경남">경남</SelectItem>
                        <SelectItem value="제주">제주</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">약관 동의</h3>
                  
                  <div className="flex items-start space-x-2 mb-4">
                    <Checkbox 
                      id="all-agree" 
                      checked={agreements.age && agreements.service && agreements.location && agreements.marketing && agreements.dataAnalysis}
                      onCheckedChange={(checked) => {
                        setAgreements({
                          age: checked as boolean,
                          service: checked as boolean,
                          location: checked as boolean,
                          marketing: checked as boolean,
                          dataAnalysis: checked as boolean
                        })
                      }}
                      className="mt-1"
                    />
                    <Label htmlFor="all-agree" className="text-sm leading-relaxed font-medium" style={{ color: '#6C63FF' }}>
                      전체 동의
                    </Label>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="age-agree" 
                        checked={agreements.age}
                        onCheckedChange={(checked) => setAgreements({...agreements, age: checked as boolean})}
                        className="mt-1"
                      />
                      <Label htmlFor="age-agree" className="text-sm leading-relaxed" style={{ color: '#FF4D6D' }}>
                        만 14세 이상 확인 (필수)
                      </Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="service-agree" 
                        checked={agreements.service}
                        onCheckedChange={(checked) => setAgreements({...agreements, service: checked as boolean})}
                        className="mt-1"
                      />
                      <Label htmlFor="service-agree" className="text-sm leading-relaxed" style={{ color: '#FF4D6D' }}>
                        서비스 이용약관 동의 (필수)
                      </Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="location-agree" 
                        checked={agreements.location}
                        onCheckedChange={(checked) => setAgreements({...agreements, location: checked as boolean})}
                        className="mt-1"
                      />
                      <Label htmlFor="location-agree" className="text-sm leading-relaxed" style={{ color: '#FF4D6D' }}>
                        위치기반서비스 이용약관 동의 (필수)
                      </Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="marketing-agree" 
                        checked={agreements.marketing}
                        onCheckedChange={(checked) => setAgreements({...agreements, marketing: checked as boolean})}
                        className="mt-1"
                      />
                      <Label htmlFor="marketing-agree" className="text-sm leading-relaxed" style={{ color: '#4C9AFF' }}>
                        마케팅 정보 수신 동의 (선택)
                      </Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="data-agree" 
                        checked={agreements.dataAnalysis}
                        onCheckedChange={(checked) => setAgreements({...agreements, dataAnalysis: checked as boolean})}
                        className="mt-1"
                      />
                      <Label htmlFor="data-agree" className="text-sm leading-relaxed" style={{ color: '#4C9AFF' }}>
                        데이터 분석/맞춤 추천을 위한 활용 동의 (선택)
                      </Label>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" onClick={handleSignup}>
                  회원가입
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Profile Setup Modal */}
      <ProfileSetupModal
        isOpen={showProfileSetup}
        onClose={() => setShowProfileSetup(false)}
        onComplete={() => {
          setShowProfileSetup(false)
          onClose()
        }}
      />
    </div>
  )
}

export default LoginModal 