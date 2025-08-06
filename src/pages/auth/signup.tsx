import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, User, Heart, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useAppStore } from '@/types/store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

// 폼 스키마 정의
const signupSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  name: z.string().min(1, '이름을 입력해주세요').regex(/^[가-힣]+$/, '이름은 한글만 입력 가능합니다'),
  nickname: z.string().min(1, '별명을 입력해주세요').regex(/^[a-zA-Z0-9가-힣]+$/, '별명은 영어, 한글, 숫자만 입력 가능합니다'),
  birthDate: z.string().min(1, '생년월일을 선택해주세요'),
  gender: z.string().min(1, '성별을 선택해주세요'),
  password: z.string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, '비밀번호는 특수문자, 대/소문자 영어, 숫자를 포함해야 합니다'),
  confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요')
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);
  const [agreeToLocation, setAgreeToLocation] = useState(false);
  const [agreeToPayment, setAgreeToPayment] = useState(false);
  const [agreeToMarketing, setAgreeToMarketing] = useState(false);
  const [agreeToPersonalization, setAgreeToPersonalization] = useState(false);
  const [agreeToAll, setAgreeToAll] = useState(false);
  
  // 이메일 인증 관련 상태
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState(0);
  const [verificationError, setVerificationError] = useState('');
  
  // API 요청 상태
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  
  // Zustand store에서 상태와 액션 가져오기
  const {
    signupEmail,
    signupPassword,
    signupConfirmPassword,
    signupNickname,
    setSignupEmail,
    setSignupPassword,
    setSignupConfirmPassword,
    setSignupNickname,
  } = useAppStore();

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger // 실시간 검증을 위한 trigger 추가
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange", // 실시간 검증 활성화
    defaultValues: {
      email: signupEmail,
      name: '',
      nickname: signupNickname,
      birthDate: '',
      gender: '',
      password: signupPassword,
      confirmPassword: signupConfirmPassword
    }
  });

  // 이메일 인증 코드 전송
  const handleSendVerificationCode = async () => {
    const email = watch('email');
    
    if (!email || errors.email) {
      setVerificationError('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    setIsSendingCode(true);
    setVerificationError('');

    try {
      // 이메일 인증 코드 전송 API 호출
      const response = await axios.post('http://localhost:8080/api/auth/email', {
        email: email
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Email verification code sent:', response.data);
      
      setShowVerificationInput(true);
      setVerificationTimer(300); // 5분 = 300초
      setVerificationError('');
      
    } catch (error: any) {
      console.error('Email verification error:', error);
      
      if (error.response) {
        setVerificationError(error.response.data.message || '인증 코드 전송에 실패했습니다.');
      } else if (error.request) {
        setVerificationError('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      } else {
        setVerificationError('인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSendingCode(false);
    }
  };

  // 이메일 인증 코드 확인
  const handleVerifyCode = async () => {
    if (!emailVerificationCode.trim()) {
      setVerificationError('인증 코드를 입력해주세요.');
      return;
    }

    setIsVerifyingCode(true);
    setVerificationError('');

    try {
      const email = watch('email');
      
      // 이메일 인증 코드 확인 API 호출
      const response = await axios.post('http://localhost:8080/api/auth/email/verify', {
        email: email,
        code: emailVerificationCode
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Email verification success:', response.data);
      
      // 성공 시 인증 완료 처리
      if (response.data.code === 'SUCCESS') {
        setIsEmailVerified(true);
        setVerificationTimer(0);
        setVerificationError('');
        setShowVerificationInput(false);
      }
      
    } catch (error: any) {
      console.error('Email verification error:', error);
      
      if (error.response) {
        const errorCode = error.response.data.code;
        const errorMessage = error.response.data.message;
        
        // 서버 응답 코드에 따른 처리
        if (errorCode === 'A001') {
          // 인증 코드 만료
          setVerificationError(errorMessage);
        } else if (errorCode === 'A002') {
          // 인증 코드 불일치
          setVerificationError(errorMessage);
        } else {
          // 기타 에러
          setVerificationError(errorMessage || '인증 코드 확인에 실패했습니다.');
        }
      } else if (error.request) {
        setVerificationError('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      } else {
        setVerificationError('인증 코드 확인에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsVerifyingCode(false);
    }
  };

  // 타이머 효과
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (verificationTimer > 0 && !isEmailVerified) {
      interval = setInterval(() => {
        setVerificationTimer(prev => {
          if (prev <= 1) {
            setEmailVerificationCode('');
            setVerificationError('유효시간이 끝났습니다. 다시 인증 버튼을 눌러 인증 코드를 전송해주세요.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [verificationTimer, isEmailVerified]);

  // 타이머 포맷팅
  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 폼 제출 핸들러
  const onSubmit = async (data: SignupFormData) => {
    if (!isEmailVerified) {
      setApiError('이메일 인증을 완료해주세요.');
      return;
    }

    setIsLoading(true);
    setApiError('');
    
    try {
      // Zustand store 업데이트
      setSignupEmail(data.email);
      setSignupPassword(data.password);
      setSignupConfirmPassword(data.confirmPassword);
      setSignupNickname(data.nickname);
      
             // API 요청 데이터 준비 - member와 terms 객체로 분리
       const signupData = {
         member: {
           email: data.email,
           name: data.name,
           nickname: data.nickname,
           birthDate: data.birthDate,
           gender: data.gender === 'male' ? 'M' : 'F', // 성별을 M/F로 변환
           password: data.password,
           emailVerified: isEmailVerified ? 'Y' : 'N' // 이메일 인증 완료 여부 추가 (Y/N)
         },
         terms: {
           agreeTerms: agreeToTerms,
           agreePrivacy: agreeToPrivacy,
           agreeLocation: agreeToLocation,
           agreePaymentPolicy: agreeToPayment,
           agreeMarketing: agreeToMarketing,
           agreePersonalized: agreeToPersonalization
         }
       };
      
      // API 요청
      const response = await axios.post('http://localhost:8080/api/auth/signup', signupData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Signup success:', response.data);
      
      // 성공 시 프로필 설정 페이지로 이동
      navigate('/profile-setup');
      
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // 에러 메시지 설정
      if (error.response) {
        // 서버에서 응답이 온 경우
        setApiError(error.response.data.message || '회원가입 중 오류가 발생했습니다.');
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        setApiError('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      } else {
        // 요청 자체에 문제가 있는 경우
        setApiError('회원가입 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 폼 값 변경 시 Zustand store 업데이트
  const handleFormChange = (field: keyof SignupFormData, value: string) => {
    setValue(field, value);
    
    // Zustand store 업데이트
    switch (field) {
      case 'email':
        setSignupEmail(value);
        break;
      case 'password':
        setSignupPassword(value);
        break;
      case 'confirmPassword':
        setSignupConfirmPassword(value);
        break;
      case 'nickname':
        setSignupNickname(value);
        break;
    }
  };

  const handleAgreeToAll = (checked: boolean) => {
    setAgreeToAll(checked);
    setAgreeToTerms(checked);
    setAgreeToPrivacy(checked);
    setAgreeToLocation(checked);
    setAgreeToPayment(checked);
    setAgreeToMarketing(checked);
    setAgreeToPersonalization(checked);
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`${provider} 회원가입 시도`);
    // 소셜 회원가입 로직 구현
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-pink-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">LovelyDate</h1>
          <p className="text-gray-600">특별한 데이트를 위한 특별한 서비스</p>
        </div>

        {/* 회원가입 폼 */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">회원가입</CardTitle>
            <p className="text-gray-600">새로운 계정을 만드세요</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="이메일을 입력하세요"
                      {...register('email')}
                      onChange={(e) => {
                        handleFormChange('email', e.target.value);
                        // 실시간 검증을 위해 trigger 호출
                        setTimeout(() => trigger('email'), 0);
                      }}
                      className="pl-10"
                      required
                      disabled={isEmailVerified}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleSendVerificationCode}
                    disabled={isSendingCode || isEmailVerified || !!errors.email}
                    className="px-4 whitespace-nowrap"
                  >
                    {isSendingCode ? '전송 중...' : isEmailVerified ? '인증 완료' : '인증'}
                  </Button>
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                
                {/* 이메일 인증 완료 표시 */}
                {isEmailVerified && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>인증이 완료되었습니다</span>
                  </div>
                )}
              </div>

                             {/* 이메일 인증 코드 입력 */}
               {showVerificationInput && (
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">인증 코드</Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                                             <Input
                         id="verificationCode"
                         type="text"
                         placeholder="인증 코드를 입력하세요"
                         value={emailVerificationCode}
                         onChange={(e) => setEmailVerificationCode(e.target.value)}
                         maxLength={6}
                         disabled={isVerifyingCode}
                       />
                    </div>
                                         <Button
                       type="button"
                       onClick={handleVerifyCode}
                       disabled={isVerifyingCode || verificationTimer === 0 || !emailVerificationCode.trim()}
                       className="px-4 whitespace-nowrap"
                     >
                       {isVerifyingCode ? '확인 중...' : '확인'}
                     </Button>
                  </div>
                  
                                     {/* 타이머 표시 */}
                   {verificationTimer > 0 && (
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                       <Clock className="h-4 w-4" />
                       <span>남은 시간: {formatTimer(verificationTimer)}</span>
                     </div>
                   )}
                   
                                       {/* 유효시간 만료 메시지 */}
                    {verificationTimer === 0 && showVerificationInput && !isEmailVerified && (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <Clock className="h-4 w-4" />
                        <span>유효시간이 끝났습니다. 다시 인증 버튼을 눌러 인증 코드를 전송해주세요.</span>
                      </div>
                    )}
                  
                  {/* 인증 에러 메시지 */}
                  {verificationError && (
                    <p className="text-red-500 text-sm">{verificationError}</p>
                  )}
                  
                  
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="이름을 입력하세요"
                    {...register('name')}
                    onChange={(e) => {
                      handleFormChange('name', e.target.value);
                      setTimeout(() => trigger('name'), 0);
                    }}
                    className="pl-10"
                    required
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nickname">별명</Label>
                <Input
                  id="nickname"
                  type="text"
                  placeholder="상대방이 부를 별명을 입력하세요"
                  {...register('nickname')}
                  onChange={(e) => {
                    handleFormChange('nickname', e.target.value);
                    setTimeout(() => trigger('nickname'), 0);
                  }}
                  required
                />
                {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">생년월일</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="birthDate"
                      type="date"
                      {...register('birthDate')}
                      onChange={(e) => {
                        handleFormChange('birthDate', e.target.value);
                        setTimeout(() => trigger('birthDate'), 0);
                      }}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">성별</Label>
                  <select
                    id="gender"
                    {...register('gender')}
                    onChange={(e) => {
                      handleFormChange('gender', e.target.value);
                      setTimeout(() => trigger('gender'), 0);
                    }}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">선택하세요</option>
                    <option value="female">여성</option>
                    <option value="male">남성</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력하세요 (8자 이상)"
                    {...register('password')}
                    onChange={(e) => {
                      handleFormChange('password', e.target.value);
                      setTimeout(() => trigger('password'), 0);
                    }}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="비밀번호를 다시 입력하세요"
                    {...register('confirmPassword')}
                    onChange={(e) => {
                      handleFormChange('confirmPassword', e.target.value);
                      setTimeout(() => trigger('confirmPassword'), 0);
                    }}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToAll"
                    checked={agreeToAll}
                    onCheckedChange={(checked) => handleAgreeToAll(checked as boolean)}
                  />
                  <Label htmlFor="agreeToAll" className="text-sm font-semibold">
                    약관 전체동의
                  </Label>
                </div>

                <Separator />

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm">
                    <span className="text-red-500">[필수]</span>{' '}
                    <Link to="/terms" className="text-gray-900 hover:text-pink-700">
                      서비스 이용약관
                    </Link> 동의
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={agreeToPrivacy}
                    onCheckedChange={(checked) => setAgreeToPrivacy(checked as boolean)}
                    required
                  />
                  <Label htmlFor="privacy" className="text-sm">
                    <span className="text-red-500">[필수]</span>{' '}
                    <Link to="/privacy" className="text-gray-900 hover:text-pink-700">
                      개인정보 수집 및 이용
                    </Link> 동의
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="location"
                    checked={agreeToLocation}
                    onCheckedChange={(checked) => setAgreeToLocation(checked as boolean)}
                    required
                  />
                  <Label htmlFor="location" className="text-sm">
                    <span className="text-red-500">[필수]</span>{' '}
                    <Link to="/location" className="text-gray-900 hover:text-pink-700">
                      위치정보 수집 및 이용
                    </Link> 동의
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="payment"
                    checked={agreeToPayment}
                    onCheckedChange={(checked) => setAgreeToPayment(checked as boolean)}
                    required
                  />
                  <Label htmlFor="payment" className="text-sm">
                    <span className="text-red-500">[필수]</span>{' '}
                    <Link to="/payment" className="text-gray-900 hover:text-pink-700">
                      결제/환불 정책
                    </Link> 동의 (구독 서비스)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketing"
                    checked={agreeToMarketing}
                    onCheckedChange={(checked) => setAgreeToMarketing(checked as boolean)}
                  />
                  <Label htmlFor="marketing" className="text-sm">
                    <span className="text-blue-500">[선택]</span>{' '}
                    마케팅 정보 수신 동의
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="personalization"
                    checked={agreeToPersonalization}
                    onCheckedChange={(checked) => setAgreeToPersonalization(checked as boolean)}
                  />
                  <Label htmlFor="personalization" className="text-sm">
                    <span className="text-blue-500">[선택]</span>{' '}
                    맞춤형 추천/개인화 서비스 동의
                  </Label>
                </div>
              </div>

              {/* API 에러 메시지 */}
              {apiError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{apiError}</p>
                </div>
              )}

                             <Button 
                 type="submit" 
                 className="w-full bg-pink-600 hover:bg-pink-700"
                 disabled={!agreeToTerms || !agreeToPrivacy || !agreeToLocation || !agreeToPayment || !isEmailVerified || isLoading}
               >
                 {isLoading ? '회원가입 중...' : !isEmailVerified ? '이메일 인증 필요' : '회원가입'}
               </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">또는</span>
              </div>
            </div>

            {/* 소셜 회원가입 */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialSignup('google')}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google로 회원가입
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialSignup('kakao')}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.48 3 2 6.48 2 12c0 4.41 2.87 8.14 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.82.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
                카카오로 회원가입
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialSignup('naver')}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
                </svg>
                네이버로 회원가입
              </Button>
            </div>

            <div className="text-center">
              <p className="text-gray-600">
                이미 계정이 있으신가요?{' '}
                <Link to="/login" className="text-pink-600 hover:text-pink-700 font-medium">
                  로그인
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage; 