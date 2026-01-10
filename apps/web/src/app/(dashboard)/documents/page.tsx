'use client';

import { useState, useMemo } from 'react';
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
  AlertCircle,
  FileEdit,
} from 'lucide-react';
import { useDocuments, useUserSettings } from '@/hooks/useFirestore';
import { Document } from '@/lib/firebase-db';
import { Timestamp } from 'firebase/firestore';
import { DocumentGenerator } from '@/components/document-generator';
import { documentCategories, popularTemplates } from '@/lib/document-templates';
import { dutyToDocumentTypeMapping, getMatchingCategories } from '@/data/departments';

const documentTypes = ['전체', '가정통신문', '계획서', '보고서', '안내문', '공문', '동의서', '신청서', '회의록', '기타'];

export default function DocumentsPage() {
  const { documents, loading, error, addDocument, editDocument, removeDocument } = useDocuments();
  const { settings } = useUserSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('전체');
  const [showGenerator, setShowGenerator] = useState(false);
  const [showTemplateGenerator, setShowTemplateGenerator] = useState(false);
  const [generatePrompt, setGeneratePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 사용자 설정에서 업무 정보 가져오기
  const extSettings = settings as unknown as { roles?: string[]; customTasks?: string[] };
  const userRoles = extSettings?.roles || [];
  const userCustomTasks = extSettings?.customTasks || [];
  const allUserDuties = [...userRoles, ...userCustomTasks];

  // 디버깅용 로그
  console.log('[Documents] 설정 로드:', { settings, userRoles, userCustomTasks, allUserDuties });

  // 사용자 업무에 맞는 문서 유형 찾기
  const matchedDocTypes = useMemo(() => {
    const result = getMatchingCategories(allUserDuties, dutyToDocumentTypeMapping);
    console.log('[Documents] 매칭된 문서 유형:', result);
    return result;
  }, [allUserDuties]);

  // 문서가 사용자 설정과 매칭되는지 확인
  const isMatchedDocument = (doc: Document) => {
    return matchedDocTypes.includes(doc.type);
  };

  // New document form state
  const [newDocument, setNewDocument] = useState({
    title: '',
    content: '',
    type: '가정통신문',
    status: 'DRAFT' as 'DRAFT' | 'REVIEW' | 'APPROVED',
    isStarred: false,
    isGenerated: false,
  });

  // 공문서 템플릿 생성 처리
  const handleTemplateGenerate = async (title: string, content: string, type: string) => {
    const docType = documentTypes.includes(type) ? type : '공문';
    await addDocument({
      title,
      content,
      type: docType,
      status: 'DRAFT',
      isStarred: false,
      isGenerated: true,
    });
  };

  // 필터링 및 정렬 (사용자 업무 우선)
  const filteredDocuments = useMemo(() => {
    let result = documents.filter((doc) => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === '전체' || doc.type === selectedType;
      return matchesSearch && matchesType;
    });

    // 사용자 업무가 있으면 매칭되는 문서 유형 우선 정렬
    if (allUserDuties.length > 0) {
      result = [...result].sort((a, b) => {
        const aMatched = isMatchedDocument(a);
        const bMatched = isMatchedDocument(b);
        if (aMatched && !bMatched) return -1;
        if (!aMatched && bMatched) return 1;
        return 0;
      });
    }

    return result;
  }, [documents, searchQuery, selectedType, allUserDuties, matchedDocTypes]);

  const starredDocuments = documents.filter((doc) => doc.isStarred);

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
              content: `다음 요청에 맞는 문서를 작성해주세요. 문서 형식에 맞게 깔끔하게 작성해주세요:\n\n${generatePrompt}`,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Create a new document with the generated content
      await addDocument({
        title: generatePrompt.slice(0, 50) + (generatePrompt.length > 50 ? '...' : ''),
        content: data.message.content,
        type: '가정통신문',
        status: 'DRAFT',
        isStarred: false,
        isGenerated: true,
      });

      setGeneratePrompt('');
      setShowGenerator(false);
    } catch (err) {
      console.error('문서 생성 실패:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddDocument = async () => {
    if (!newDocument.title.trim()) return;

    setIsSubmitting(true);
    try {
      await addDocument(newDocument);
      setNewDocument({
        title: '',
        content: '',
        type: '가정통신문',
        status: 'DRAFT',
        isStarred: false,
        isGenerated: false,
      });
      setIsAddDialogOpen(false);
    } catch (err) {
      console.error('문서 추가 실패:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditDocument = async () => {
    if (!editingDocument || !editingDocument.id) return;

    setIsSubmitting(true);
    try {
      await editDocument(editingDocument.id, {
        title: editingDocument.title,
        content: editingDocument.content,
        type: editingDocument.type,
        status: editingDocument.status,
        isStarred: editingDocument.isStarred,
      });
      setIsEditDialogOpen(false);
      setEditingDocument(null);
    } catch (err) {
      console.error('문서 수정 실패:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    if (confirm('정말로 이 문서를 삭제하시겠습니까?')) {
      await removeDocument(docId);
    }
  };

  const toggleStarred = async (doc: Document) => {
    if (!doc.id) return;
    await editDocument(doc.id, { isStarred: !doc.isStarred });
  };

  const openEditDialog = (doc: Document) => {
    setEditingDocument({ ...doc });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (doc: Document) => {
    setViewingDocument(doc);
    setIsViewDialogOpen(true);
  };

  const formatDate = (timestamp: Timestamp | undefined): string => {
    if (!timestamp) return '-';
    return timestamp.toDate().toLocaleDateString('ko-KR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">문서를 불러오는 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <p className="text-lg font-medium">{error}</p>
        <p className="text-muted-foreground">로그인이 필요하거나 네트워크 문제가 있을 수 있습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">문서 관리</h1>
          <p className="text-muted-foreground">
            공문서 양식으로 즉시 작성하거나 AI로 생성하세요
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            새 문서
          </Button>
          <Button variant="default" onClick={() => setShowTemplateGenerator(true)}>
            <FileEdit className="h-4 w-4 mr-2" />
            공문서 작성
          </Button>
          <Button variant="secondary" onClick={() => setShowGenerator(true)}>
            <Sparkles className="h-4 w-4 mr-2" />
            AI 생성
          </Button>
        </div>
      </div>

      {/* 공문서 템플릿 생성기 */}
      <DocumentGenerator
        isOpen={showTemplateGenerator}
        onClose={() => setShowTemplateGenerator(false)}
        onGenerate={handleTemplateGenerate}
      />

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
              <label className="text-sm font-medium mb-2 block">인기 템플릿 선택</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {popularTemplates.slice(0, 6).map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    className="h-auto py-3 px-4 justify-start text-left"
                    onClick={() => setGeneratePrompt(`${template.title} 작성해줘`)}
                  >
                    <div>
                      <p className="font-medium text-sm">{template.title}</p>
                      <p className="text-xs text-muted-foreground">{template.category}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">또는 직접 요청하기</label>
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

      {/* 나의 업무 문서 유형 안내 카드 */}
      {matchedDocTypes.length > 0 && (
        <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="pt-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary mb-1">추천 문서 유형</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  설정에서 선택한 업무와 관련된 문서 유형이 우선 표시됩니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  {matchedDocTypes.map((type) => (
                    <Badge
                      key={type}
                      variant="secondary"
                      className="bg-primary/20 text-primary border-primary/30 cursor-pointer hover:bg-primary/30"
                      onClick={() => setSelectedType(type)}
                    >
                      <Star className="h-3 w-3 mr-1 fill-primary" />
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
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
                  className={`whitespace-nowrap ${matchedDocTypes.includes(type) && type !== '전체' ? 'ring-1 ring-primary/50' : ''}`}
                >
                  {matchedDocTypes.includes(type) && type !== '전체' && (
                    <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                  )}
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => {
          const matched = isMatchedDocument(doc);
          return (
          <Card key={doc.id} className={`hover:shadow-md transition-shadow ${matched ? 'border-primary/30 ring-1 ring-primary/20' : ''}`}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${matched ? 'bg-primary/20' : 'bg-primary/10'}`}>
                  <FileText className={`h-6 w-6 ${matched ? 'text-primary' : 'text-primary'}`} />
                </div>
                <div className="flex items-center gap-1">
                  {matched && (
                    <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
                      <Star className="h-3 w-3 mr-1 fill-primary" />
                      추천
                    </Badge>
                  )}
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
                <Badge variant={doc.status === 'APPROVED' ? 'success' : doc.status === 'REVIEW' ? 'warning' : 'outline'} className="text-xs">
                  {doc.status === 'APPROVED' ? '승인됨' : doc.status === 'REVIEW' ? '검토중' : '초안'}
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
                  onClick={() => doc.id && handleDeleteDocument(doc.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
          );
        })}

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
            <p className="text-sm text-muted-foreground">새 문서를 만들거나 AI로 문서를 생성해보세요!</p>
          </CardContent>
        </Card>
      )}

      {/* Add Document Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>새 문서 만들기</DialogTitle>
            <DialogDescription>
              새로운 문서를 작성합니다.
            </DialogDescription>
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
                    {documentTypes.filter(t => t !== '전체').map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>상태</Label>
                <Select
                  value={newDocument.status}
                  onValueChange={(value: 'DRAFT' | 'REVIEW' | 'APPROVED') => setNewDocument({ ...newDocument, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">초안</SelectItem>
                    <SelectItem value="REVIEW">검토중</SelectItem>
                    <SelectItem value="APPROVED">승인됨</SelectItem>
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
            <DialogDescription>
              문서 정보를 수정합니다.
            </DialogDescription>
          </DialogHeader>
          {editingDocument && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">제목 *</Label>
                <Input
                  id="edit-title"
                  value={editingDocument.title}
                  onChange={(e) => setEditingDocument({ ...editingDocument, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>유형</Label>
                  <Select
                    value={editingDocument.type}
                    onValueChange={(value) => setEditingDocument({ ...editingDocument, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.filter(t => t !== '전체').map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>상태</Label>
                  <Select
                    value={editingDocument.status}
                    onValueChange={(value: 'DRAFT' | 'REVIEW' | 'APPROVED') => setEditingDocument({ ...editingDocument, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">초안</SelectItem>
                      <SelectItem value="REVIEW">검토중</SelectItem>
                      <SelectItem value="APPROVED">승인됨</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-content">내용</Label>
                <Textarea
                  id="edit-content"
                  value={editingDocument.content || ''}
                  onChange={(e) => setEditingDocument({ ...editingDocument, content: e.target.value })}
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
                <Badge variant={viewingDocument?.status === 'APPROVED' ? 'success' : viewingDocument?.status === 'REVIEW' ? 'warning' : 'outline'}>
                  {viewingDocument?.status === 'APPROVED' ? '승인됨' : viewingDocument?.status === 'REVIEW' ? '검토중' : '초안'}
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
            <div className="whitespace-pre-wrap text-sm">
              {viewingDocument?.content || '내용이 없습니다.'}
            </div>
          </ScrollArea>
          <DialogFooter>
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
