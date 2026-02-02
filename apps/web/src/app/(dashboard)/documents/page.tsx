'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
} from '@/components/ui/dialog';
import {
  FileText,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  FolderOpen,
  Clock,
  Star,
  StarOff,
  Loader2,
  FileEdit,
  Copy,
} from 'lucide-react';
import { toast } from 'sonner';

// 문서 타입 정의
interface Document {
  id: string;
  title: string;
  content: string;
  type: string;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED';
  isStarred: boolean;
  isGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

const documentTypes = ['전체', '가정통신문', '계획서', '보고서', '안내문', '공문', '동의서', '신청서', '회의록', '기타'];

// 샘플 문서 템플릿
const documentTemplates = [
  {
    id: 'tpl-1',
    title: '학부모 상담 안내문',
    type: '가정통신문',
    content: `학부모님께

안녕하십니까? 학부모님의 가정에 건강과 행복이 가득하시길 기원합니다.

본교에서는 학생들의 학교생활과 가정생활에 대한 상담을 실시하고자 합니다.
바쁘시더라도 참석하시어 자녀의 학교생활에 대해 이야기 나누는 시간이 되시길 바랍니다.

- 상담 일시: 2026년 O월 O일(O) ~ O월 O일(O)
- 상담 시간: 14:00 ~ 18:00
- 상담 장소: 각 학급 교실
- 상담 내용: 학교생활, 학습, 교우관계 등

참석 여부를 O월 O일까지 회신해 주시기 바랍니다.

감사합니다.

OO초등학교장`,
  },
  {
    id: 'tpl-2',
    title: '현장체험학습 동의서',
    type: '동의서',
    content: `현장체험학습 참가 동의서

학생 정보
- 학년/반: O학년 O반
- 이름:
- 생년월일:

체험학습 정보
- 일시: 2026년 O월 O일(O)
- 장소:
- 목적:

위 학생이 현장체험학습에 참가하는 것을 동의합니다.
또한, 안전사고 예방을 위해 인솔 교사의 지도에 따르도록 하겠습니다.

2026년  월  일

보호자:          (인)
연락처:`,
  },
  {
    id: 'tpl-3',
    title: '학급 경영 계획서',
    type: '계획서',
    content: `2026학년도 학급 경영 계획서

1. 학급 현황
- 학년/반: O학년 O반
- 학생 수: 남 O명, 여 O명, 계 O명
- 담임교사:

2. 학급 운영 목표
-

3. 학급 운영 방침
가. 기본 생활 습관 지도
나. 자기 주도적 학습 능력 신장
다. 배려와 존중의 학급 문화 조성

4. 월별 학급 행사 계획
- 3월: 학급 규칙 정하기, 1인 1역 정하기
- 4월:
- 5월:
...

5. 학부모 협력 계획
- 정기 상담: 1학기(4월), 2학기(9월)
- 학급 운영 안내: 주간 학습 안내, 학급 홈페이지

작성일: 2026년 월 일
작성자:`,
  },
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('전체');
  const [showGenerator, setShowGenerator] = useState(false);
  const [generatePrompt, setGeneratePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 로컬 스토리지에서 문서 로드
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('eduflow_documents');
    if (saved) {
      setDocuments(JSON.parse(saved));
    }
  }, []);

  // 문서 저장
  const saveDocuments = (docs: Document[]) => {
    setDocuments(docs);
    localStorage.setItem('eduflow_documents', JSON.stringify(docs));
  };

  // 새 문서 폼 상태
  const [newDocument, setNewDocument] = useState<{
    title: string;
    content: string;
    type: string;
    status: 'DRAFT' | 'REVIEW' | 'APPROVED';
    isStarred: boolean;
    isGenerated: boolean;
  }>({
    title: '',
    content: '',
    type: '가정통신문',
    status: 'DRAFT',
    isStarred: false,
    isGenerated: false,
  });

  // 필터링
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === '전체' || doc.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [documents, searchQuery, selectedType]);

  const starredDocuments = documents.filter((doc) => doc.isStarred);

  // 템플릿 사용
  const useTemplate = (template: typeof documentTemplates[0]) => {
    setNewDocument({
      title: template.title,
      content: template.content,
      type: template.type,
      status: 'DRAFT',
      isStarred: false,
      isGenerated: false,
    });
    setIsAddDialogOpen(true);
    toast.success('템플릿이 적용되었습니다. 내용을 수정해주세요.');
  };

  // AI 생성
  const handleGenerate = async () => {
    if (!generatePrompt.trim()) return;
    setIsGenerating(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `다음 요청에 맞는 초등학교 공문서를 작성해주세요. 실제 사용할 수 있는 형식으로 작성해주세요:\n\n${generatePrompt}`,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const newDoc: Document = {
        id: `doc-${Date.now()}`,
        title: generatePrompt.slice(0, 30) + (generatePrompt.length > 30 ? '...' : ''),
        content: data.message?.content || '생성된 내용이 없습니다.',
        type: '가정통신문',
        status: 'DRAFT',
        isStarred: false,
        isGenerated: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      saveDocuments([newDoc, ...documents]);
      setGeneratePrompt('');
      setShowGenerator(false);
      toast.success('문서가 생성되었습니다!');
    } catch (err) {
      console.error('문서 생성 실패:', err);
      toast.error('문서 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  // 문서 추가
  const handleAddDocument = async () => {
    if (!newDocument.title.trim()) return;

    setIsSubmitting(true);
    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      ...newDocument,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveDocuments([newDoc, ...documents]);
    setNewDocument({
      title: '',
      content: '',
      type: '가정통신문',
      status: 'DRAFT',
      isStarred: false,
      isGenerated: false,
    });
    setIsAddDialogOpen(false);
    setIsSubmitting(false);
    toast.success('문서가 저장되었습니다!');
  };

  // 문서 수정
  const handleEditDocument = async () => {
    if (!editingDocument) return;

    setIsSubmitting(true);
    const updatedDocs = documents.map((doc) =>
      doc.id === editingDocument.id
        ? { ...editingDocument, updatedAt: new Date().toISOString() }
        : doc
    );
    saveDocuments(updatedDocs);
    setIsEditDialogOpen(false);
    setEditingDocument(null);
    setIsSubmitting(false);
    toast.success('문서가 수정되었습니다!');
  };

  // 문서 삭제
  const handleDeleteDocument = async (docId: string) => {
    if (confirm('정말로 이 문서를 삭제하시겠습니까?')) {
      saveDocuments(documents.filter((doc) => doc.id !== docId));
      toast.success('문서가 삭제되었습니다.');
    }
  };

  // 즐겨찾기 토글
  const toggleStarred = async (doc: Document) => {
    const updatedDocs = documents.map((d) =>
      d.id === doc.id ? { ...d, isStarred: !d.isStarred } : d
    );
    saveDocuments(updatedDocs);
  };

  const openEditDialog = (doc: Document) => {
    setEditingDocument({ ...doc });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (doc: Document) => {
    setViewingDocument(doc);
    setIsViewDialogOpen(true);
  };

  // 문서 복사
  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('클립보드에 복사되었습니다!');
  };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">문서 작성</h1>
          <p className="text-muted-foreground">
            공문서 템플릿을 사용하거나 AI로 생성하세요
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            새 문서
          </Button>
          <Button variant="secondary" onClick={() => setShowGenerator(true)}>
            <Sparkles className="h-4 w-4 mr-2" />
            AI 생성
          </Button>
        </div>
      </div>

      {/* 템플릿 섹션 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FileEdit className="h-4 w-4 text-primary" />
            문서 템플릿
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {documentTemplates.map((template) => (
              <Card
                key={template.id}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => useTemplate(template)}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{template.title}</h3>
                      <Badge variant="outline" className="text-xs mt-1">
                        {template.type}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Document Generator Modal */}
      {showGenerator && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI 문서 생성
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">어떤 문서가 필요하신가요?</Label>
              <Textarea
                placeholder="예: 3월 15일 학부모 상담 안내문을 작성해줘. 상담 시간은 14시~18시이고..."
                value={generatePrompt}
                onChange={(e) => setGeneratePrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowGenerator(false)}>
                취소
              </Button>
              <Button onClick={handleGenerate} disabled={!generatePrompt.trim() || isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    문서 생성
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Access - Starred Documents */}
      {starredDocuments.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              즐겨찾기
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {starredDocuments.map((doc) => (
                <Button
                  key={doc.id}
                  variant="outline"
                  className="flex-shrink-0 h-auto py-2 px-3"
                  onClick={() => openViewDialog(doc)}
                >
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  {doc.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="문서 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {documentTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className="whitespace-nowrap"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center gap-1">
                  {doc.isGenerated && (
                    <Badge variant="secondary" className="text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toggleStarred(doc)}
                  >
                    {doc.isStarred ? (
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ) : (
                      <StarOff className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <h3 className="font-medium mb-1 truncate">{doc.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Badge variant="outline" className="text-xs">
                  {doc.type}
                </Badge>
                <span>•</span>
                <Badge
                  variant={
                    doc.status === 'APPROVED'
                      ? 'default'
                      : doc.status === 'REVIEW'
                      ? 'secondary'
                      : 'outline'
                  }
                  className="text-xs"
                >
                  {doc.status === 'APPROVED' ? '완료' : doc.status === 'REVIEW' ? '검토중' : '초안'}
                </Badge>
              </div>

              <div className="flex items-center text-xs text-muted-foreground mb-4">
                <Clock className="h-3 w-3 mr-1" />
                수정: {formatDate(doc.updatedAt)}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openViewDialog(doc)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  보기
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openEditDialog(doc)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  수정
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteDocument(doc.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* New Document Card */}
        <Card
          className="border-dashed hover:border-primary transition-colors cursor-pointer"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <CardContent className="pt-4 h-full flex flex-col items-center justify-center min-h-[200px]">
            <div className="p-3 rounded-full bg-muted mb-3">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium text-muted-foreground">새 문서 만들기</p>
            <p className="text-sm text-muted-foreground">직접 작성하거나 AI로 생성</p>
          </CardContent>
        </Card>
      </div>

      {filteredDocuments.length === 0 && documents.length > 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FolderOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
          </CardContent>
        </Card>
      )}

      {documents.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FolderOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground mb-2">등록된 문서가 없습니다.</p>
            <p className="text-sm text-muted-foreground mb-4">
              위의 템플릿을 사용하거나 새 문서를 만들어보세요!
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              새 문서 만들기
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Document Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>새 문서 만들기</DialogTitle>
            <DialogDescription>새로운 문서를 작성합니다.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">제목 *</Label>
              <Input
                id="title"
                value={newDocument.title}
                onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                placeholder="문서 제목을 입력하세요"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>유형</Label>
                <Select
                  value={newDocument.type}
                  onValueChange={(value) => setNewDocument({ ...newDocument, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes
                      .filter((t) => t !== '전체')
                      .map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>상태</Label>
                <Select
                  value={newDocument.status}
                  onValueChange={(value: 'DRAFT' | 'REVIEW' | 'APPROVED') =>
                    setNewDocument({ ...newDocument, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">초안</SelectItem>
                    <SelectItem value="REVIEW">검토중</SelectItem>
                    <SelectItem value="APPROVED">완료</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                value={newDocument.content}
                onChange={(e) => setNewDocument({ ...newDocument, content: e.target.value })}
                placeholder="문서 내용을 입력하세요"
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleAddDocument} disabled={isSubmitting || !newDocument.title.trim()}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  저장 중...
                </>
              ) : (
                '저장'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Document Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>문서 수정</DialogTitle>
            <DialogDescription>문서 정보를 수정합니다.</DialogDescription>
          </DialogHeader>
          {editingDocument && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">제목 *</Label>
                <Input
                  id="edit-title"
                  value={editingDocument.title}
                  onChange={(e) =>
                    setEditingDocument({ ...editingDocument, title: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>유형</Label>
                  <Select
                    value={editingDocument.type}
                    onValueChange={(value) =>
                      setEditingDocument({ ...editingDocument, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes
                        .filter((t) => t !== '전체')
                        .map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>상태</Label>
                  <Select
                    value={editingDocument.status}
                    onValueChange={(value: 'DRAFT' | 'REVIEW' | 'APPROVED') =>
                      setEditingDocument({ ...editingDocument, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">초안</SelectItem>
                      <SelectItem value="REVIEW">검토중</SelectItem>
                      <SelectItem value="APPROVED">완료</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-content">내용</Label>
                <Textarea
                  id="edit-content"
                  value={editingDocument.content || ''}
                  onChange={(e) =>
                    setEditingDocument({ ...editingDocument, content: e.target.value })
                  }
                  className="min-h-[200px]"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleEditDocument} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  저장 중...
                </>
              ) : (
                '저장'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Document Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {viewingDocument?.title}
            </DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{viewingDocument?.type}</Badge>
                <span>•</span>
                <Badge
                  variant={
                    viewingDocument?.status === 'APPROVED'
                      ? 'default'
                      : viewingDocument?.status === 'REVIEW'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {viewingDocument?.status === 'APPROVED'
                    ? '완료'
                    : viewingDocument?.status === 'REVIEW'
                    ? '검토중'
                    : '초안'}
                </Badge>
                {viewingDocument?.isGenerated && (
                  <Badge variant="secondary">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI 생성
                  </Badge>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[50vh] mt-4">
            <div className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
              {viewingDocument?.content || '내용이 없습니다.'}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => viewingDocument && copyToClipboard(viewingDocument.content)}
            >
              <Copy className="h-4 w-4 mr-2" />
              복사
            </Button>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              닫기
            </Button>
            <Button
              onClick={() => {
                setIsViewDialogOpen(false);
                if (viewingDocument) openEditDialog(viewingDocument);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              수정
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
