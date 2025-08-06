import React, { useState } from 'react';
import CalendarView from '@/components/calendar/CalendarView';
import { Button } from '@/components/ui/button';

const CalendarPage = () => {
  const [showDateAddForm, setShowDateAddForm] = useState(false);

  return (
    <div className="space-y-6">
      {showDateAddForm ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">새로운 데이트 추가</h3>
            <Button variant="outline" onClick={() => setShowDateAddForm(false)}>
              취소
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">데이트 제목</label>
              <input className="w-full p-2 border rounded" placeholder="데이트 제목을 입력하세요" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">날짜</label>
              <input type="date" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">장소</label>
              <input className="w-full p-2 border rounded" placeholder="장소를 입력하세요" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">메모</label>
              <textarea className="w-full p-2 border rounded" rows={3} placeholder="메모를 입력하세요" />
            </div>
            <Button className="w-full" onClick={() => setShowDateAddForm(false)}>
              데이트 추가
            </Button>
          </div>
        </div>
      ) : (
        <CalendarView onAddDate={() => setShowDateAddForm(true)} />
      )}
    </div>
  );
};

export default CalendarPage; 