'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Plus,
  Trash2,
  Download,
  Copy,
  Edit,
  Save,
  FileSpreadsheet,
  ClipboardList,
  CheckCircle,
  Clock,
  Send,
  X,
} from 'lucide-react';
import { useUserSettings } from '@/hooks/useFirestore';

// Types
interface SpreadsheetTemplate {
  code: string;
  name: string;
  description: string;
  columns: string[];
  defaultRows: number;
}

interface SpreadsheetRow {
  id: string;
  data: Record<string, string>;
}

interface Spreadsheet {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  columns: string[];
  rows: SpreadsheetRow[];
  status: 'draft' | 'distributed' | 'completed';
  createdAt: string;
  updatedAt: string;
}

// Templates
const templates: SpreadsheetTemplate[] = [
  {
    code: 'A',
    name: '물품/급식 조사',
    description: '학용품, 급식 선호도, 물품 구매 관련 조사',
    columns: ['학년', '반', '품목', '수량', '희망일', '비고'],
    defaultRows: 6,
  },
  {
    code: 'B',
    name: '현장체험/행사 의견',
    description: '현장체험학습, 학교 행사 의견 수렴',
    columns: ['학년', '반', '장소', '날짜', '인원', '비용', '찬반', '비고'],
    defaultRows: 6,
  },
  {
    code: 'C',
    name: '학기초 교사정보',
    description: '새 학기 교사 정보 수집',
    columns: ['이름', '학년', '반', '담당과목', '연락처', '차량번호', '비상연락처'],
    defaultRows: 10,
  },
  {
    code: 'D',
    name: '부장회의 안건',
    description: '부장 회의 안건 및 결정사항',
    columns: ['부서', '안건명', '내용요약', '결정사항', '담당자', '기한'],
    defaultRows: 5,
  },
  {
    code: 'E',
    name: '학생 성적/평가',
    description: '학생 평가 일정 및 범위',
    columns: ['학년', '반', '과목', '평가유형', '일시', '범위', '비고'],
    defaultRows: 6,
  },
  {
    code: 'F',
    name: '업무분장/동아리',
    description: '교사 업무 분장 및 동아리 배정',
    columns: ['교사명', '담당업무', '동아리명', '시간', '장소', '인원'],
    defaultRows: 10,
  },
  {
    code: 'G',
    name: '참석/동의 여부',
    description: '행사 참석, 동의서 제출 확인',
    columns: ['이름', '학년', '반', '참석여부', '사유', '비고'],
    defaultRows: 10,
  },
  {
    code: 'H',
    name: '예산/물품 신청',
    description: '예산 집행 및 물품 구매 신청',
    columns: ['품목', '규격', '수량', '단가', '금액', '용도', '비고'],
    defaultRows: 5,
  },
];

const STORAGE_KEY = 'eduflow_data_collections';

export default function DataCollectionPage() {
  const { settings: userSettings } = useUserSettings();
  const [spreadsheets, setSpreadsheets] = useState<Spreadsheet[]>([]);
  const [currentSpreadsheet, setCurrentSpreadsheet] = useState<Spreadsheet | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [newTitle, setNewTitle] = useState('');
  const [editingCell, setEditingCell] = useState<{ rowId: string; column: string } | null>(null);
  const [editValue, setEditValue] = useState('');

  // Load spreadsheets from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSpreadsheets(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load spreadsheets:', error);
      }
    }
  }, []);

  // Save spreadsheets to localStorage
  const saveToStorage = (data: Spreadsheet[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSpreadsheets(data);
  };

  // Create new spreadsheet
  const handleCreateSpreadsheet = () => {
    if (!selectedTemplate || !newTitle.trim()) return;

    const template = templates.find(t => t.code === selectedTemplate);
    if (!template) return;

    const newSpreadsheet: Spreadsheet = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      category: template.code,
      categoryName: template.name,
      columns: [...template.columns],
      rows: Array.from({ length: template.defaultRows }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        data: template.columns.reduce((acc, col) => {
          if (col === '학년' && template.defaultRows === 6) {
            acc[col] = `${i + 1}학년`;
          } else {
            acc[col] = '';
          }
          return acc;
        }, {} as Record<string, string>),
      })),
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...spreadsheets, newSpreadsheet];
    saveToStorage(updated);
    setCurrentSpreadsheet(newSpreadsheet);
    setIsCreating(false);
    setNewTitle('');
    setSelectedTemplate('');
  };

  // Update spreadsheet
  const updateSpreadsheet = (updated: Spreadsheet) => {
    const newSpreadsheets = spreadsheets.map(s =>
      s.id === updated.id ? { ...updated, updatedAt: new Date().toISOString() } : s
    );
    saveToStorage(newSpreadsheets);
    setCurrentSpreadsheet(updated);
  };

  // Add row
  const handleAddRow = () => {
    if (!currentSpreadsheet) return;

    const newRow: SpreadsheetRow = {
      id: `${Date.now()}`,
      data: currentSpreadsheet.columns.reduce((acc, col) => {
        acc[col] = '';
        return acc;
      }, {} as Record<string, string>),
    };

    updateSpreadsheet({
      ...currentSpreadsheet,
      rows: [...currentSpreadsheet.rows, newRow],
    });
  };

  // Delete row
  const handleDeleteRow = (rowId: string) => {
    if (!currentSpreadsheet) return;

    updateSpreadsheet({
      ...currentSpreadsheet,
      rows: currentSpreadsheet.rows.filter(r => r.id !== rowId),
    });
  };

  // Start editing cell
  const handleStartEdit = (rowId: string, column: string, value: string) => {
    setEditingCell({ rowId, column });
    setEditValue(value);
  };

  // Save cell edit
  const handleSaveEdit = () => {
    if (!currentSpreadsheet || !editingCell) return;

    const updatedRows = currentSpreadsheet.rows.map(row => {
      if (row.id === editingCell.rowId) {
        return {
          ...row,
          data: { ...row.data, [editingCell.column]: editValue },
        };
      }
      return row;
    });

    updateSpreadsheet({
      ...currentSpreadsheet,
      rows: updatedRows,
    });

    setEditingCell(null);
    setEditValue('');
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  // Copy to clipboard
  const handleCopyToClipboard = () => {
    if (!currentSpreadsheet) return;

    const header = currentSpreadsheet.columns.join('\t');
    const rows = currentSpreadsheet.rows
      .map(row => currentSpreadsheet.columns.map(col => row.data[col] || '').join('\t'))
      .join('\n');

    const text = `${currentSpreadsheet.title}\n${header}\n${rows}`;

    navigator.clipboard.writeText(text).then(() => {
      alert('클립보드에 복사되었습니다! Excel이나 Google Sheets에 붙여넣으세요.');
    });
  };

  // Download CSV
  const handleDownloadCSV = () => {
    if (!currentSpreadsheet) return;

    const header = currentSpreadsheet.columns.join(',');
    const rows = currentSpreadsheet.rows
      .map(row =>
        currentSpreadsheet.columns
          .map(col => {
            const value = row.data[col] || '';
            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(',')
      )
      .join('\n');

    const csv = `${header}\n${rows}`;
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${currentSpreadsheet.title}.csv`;
    link.click();
  };

  // Update status
  const handleUpdateStatus = (status: 'draft' | 'distributed' | 'completed') => {
    if (!currentSpreadsheet) return;
    updateSpreadsheet({ ...currentSpreadsheet, status });
  };

  // Delete spreadsheet
  const handleDeleteSpreadsheet = (id: string) => {
    if (!confirm('이 자료를 삭제하시겠습니까?')) return;

    const updated = spreadsheets.filter(s => s.id !== id);
    saveToStorage(updated);

    if (currentSpreadsheet?.id === id) {
      setCurrentSpreadsheet(null);
    }
  };

  // Status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className="gap-1"><Clock className="w-3 h-3" />작성중</Badge>;
      case 'distributed':
        return <Badge variant="default" className="gap-1 bg-blue-500"><Send className="w-3 h-3" />배포중</Badge>;
      case 'completed':
        return <Badge variant="default" className="gap-1 bg-green-500"><CheckCircle className="w-3 h-3" />완료</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">정보 취합</h1>
            <p className="text-muted-foreground mt-1">
              교사 간 정보 수집을 위한 스프레드시트를 생성하고 관리합니다
            </p>
          </div>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="w-4 h-4" />
                새 조사 만들기
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>새 정보 취합 만들기</DialogTitle>
                <DialogDescription>
                  템플릿을 선택하고 제목을 입력하세요
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>템플릿 선택</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="템플릿을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map(template => (
                        <SelectItem key={template.code} value={template.code}>
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{template.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {template.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedTemplate && (
                  <div className="space-y-2">
                    <Label>미리보기 - 포함될 컬럼</Label>
                    <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-md">
                      {templates.find(t => t.code === selectedTemplate)?.columns.map(col => (
                        <Badge key={col} variant="secondary">
                          {col}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>제목</Label>
                  <Input
                    placeholder="예: 2025학년도 현장체험학습 의견 조사"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  취소
                </Button>
                <Button
                  onClick={handleCreateSpreadsheet}
                  disabled={!selectedTemplate || !newTitle.trim()}
                >
                  생성하기
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* User Roles Badge */}
        {userSettings?.roles && userSettings.roles.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>내 역할:</span>
            {userSettings.roles.map((role) => (
              <Badge key={role} variant="outline" className="text-xs">
                {role}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="current">현재 작업</TabsTrigger>
          <TabsTrigger value="list">내 조사 목록</TabsTrigger>
        </TabsList>

        {/* Current Work Tab */}
        <TabsContent value="current" className="space-y-4">
          {currentSpreadsheet ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl">{currentSpreadsheet.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge variant="outline">{currentSpreadsheet.categoryName}</Badge>
                      {getStatusBadge(currentSpreadsheet.status)}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={currentSpreadsheet.status}
                      onValueChange={(value) => handleUpdateStatus(value as any)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">작성중</SelectItem>
                        <SelectItem value="distributed">배포중</SelectItem>
                        <SelectItem value="completed">완료</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" onClick={handleCopyToClipboard}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleDownloadCSV}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentSpreadsheet(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="w-full">
                  <div className="min-w-max">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border p-2 text-left font-semibold w-12">#</th>
                          {currentSpreadsheet.columns.map((column) => (
                            <th key={column} className="border p-2 text-left font-semibold min-w-32">
                              {column}
                            </th>
                          ))}
                          <th className="border p-2 text-center font-semibold w-20">삭제</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentSpreadsheet.rows.map((row, index) => (
                          <tr key={row.id} className="hover:bg-muted/50">
                            <td className="border p-2 text-center text-sm text-muted-foreground">
                              {index + 1}
                            </td>
                            {currentSpreadsheet.columns.map((column) => {
                              const isEditing =
                                editingCell?.rowId === row.id && editingCell?.column === column;
                              const value = row.data[column] || '';

                              return (
                                <td key={column} className="border p-1">
                                  {isEditing ? (
                                    <div className="flex items-center gap-1">
                                      <Input
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') handleSaveEdit();
                                          if (e.key === 'Escape') handleCancelEdit();
                                        }}
                                        className="h-8"
                                        autoFocus
                                      />
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8"
                                        onClick={handleSaveEdit}
                                      >
                                        <Save className="w-4 h-4" />
                                      </Button>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8"
                                        onClick={handleCancelEdit}
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <div
                                      className="min-h-8 px-2 py-1 cursor-pointer hover:bg-muted/50 rounded"
                                      onClick={() => handleStartEdit(row.id, column, value)}
                                    >
                                      {value || (
                                        <span className="text-muted-foreground text-sm">
                                          클릭하여 입력
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                            <td className="border p-1 text-center">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() => handleDeleteRow(row.id)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>

                <div className="flex items-center gap-2 mt-4">
                  <Button onClick={handleAddRow} variant="outline" className="gap-2">
                    <Plus className="w-4 h-4" />
                    행 추가
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    총 {currentSpreadsheet.rows.length}개 행
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="py-12">
              <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
                <FileSpreadsheet className="w-16 h-16 text-muted-foreground" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">작업 중인 조사가 없습니다</h3>
                  <p className="text-muted-foreground">
                    새 조사를 만들거나 목록에서 선택하세요
                  </p>
                </div>
                <Button onClick={() => setIsCreating(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  새 조사 만들기
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* List Tab */}
        <TabsContent value="list" className="space-y-4">
          {spreadsheets.length === 0 ? (
            <Card className="py-12">
              <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
                <ClipboardList className="w-16 h-16 text-muted-foreground" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">생성된 조사가 없습니다</h3>
                  <p className="text-muted-foreground">
                    첫 번째 정보 취합을 만들어보세요
                  </p>
                </div>
                <Button onClick={() => setIsCreating(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  새 조사 만들기
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {spreadsheets
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .map((sheet) => (
                  <Card key={sheet.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg line-clamp-2">{sheet.title}</CardTitle>
                          {getStatusBadge(sheet.status)}
                        </div>
                        <CardDescription className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {sheet.categoryName}
                            </Badge>
                          </div>
                          <div className="text-xs">
                            {sheet.rows.length}개 행 · {sheet.columns.length}개 컬럼
                          </div>
                          <div className="text-xs">
                            수정: {new Date(sheet.updatedAt).toLocaleDateString('ko-KR')}
                          </div>
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="flex-1 gap-2"
                          onClick={() => setCurrentSpreadsheet(sheet)}
                        >
                          <Edit className="w-4 h-4" />
                          편집
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setCurrentSpreadsheet(sheet);
                            handleCopyToClipboard();
                          }}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteSpreadsheet(sheet.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Templates Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">사용 가능한 템플릿</CardTitle>
          <CardDescription>
            업무 유형에 맞는 템플릿을 선택하여 빠르게 조사를 시작하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {templates.map((template) => (
              <div
                key={template.code}
                className="border rounded-lg p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline">{template.code}</Badge>
                </div>
                <h4 className="font-semibold text-sm mb-1">{template.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                <div className="text-xs text-muted-foreground">
                  {template.columns.length}개 컬럼 · {template.defaultRows}개 기본 행
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
