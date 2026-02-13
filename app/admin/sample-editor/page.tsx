import { InvitationEditor } from "@/components/admin/InvitationEditor";

export default function SampleEditorPage() {
  return (
    <InvitationEditor
      title="샘플청첩장 수정"
      description="슈퍼관리자에서 선택한 청첩장 샘플 수정"
      backHref="/admin"
      backLabel="슈퍼관리자 돌아가기"
    />
  );
}
