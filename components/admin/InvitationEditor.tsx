"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DEFAULT_INVITATIONS, STORAGE_KEY } from "@/lib/admin/localStore";
import { ManagedInvitation } from "@/lib/admin/types";

type InvitationEditorProps = {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
};

function loadInvitations(): ManagedInvitation[] {
  if (typeof window === "undefined") {
    return DEFAULT_INVITATIONS;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_INVITATIONS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return DEFAULT_INVITATIONS;
    }
    return parsed as ManagedInvitation[];
  } catch {
    return DEFAULT_INVITATIONS;
  }
}

export function InvitationEditor({ title, description, backHref, backLabel }: InvitationEditorProps) {
  const [all, setAll] = useState<ManagedInvitation[]>(() => loadInvitations());
  const current = useMemo(() => all[0] ?? DEFAULT_INVITATIONS[0], [all]);
  const [form, setForm] = useState<ManagedInvitation>(current);

  const updateField = <K extends keyof ManagedInvitation>(key: K, value: ManagedInvitation[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const save = () => {
    const next: ManagedInvitation[] = [
      {
        ...form,
        publicPath: "/",
        updatedAt: new Date().toISOString(),
      },
    ];

    setAll(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.alert("저장되었습니다.");
    }
  };

  const previewDate = form.weddingDate || "2026-05-17 12:30";
  const previewTitle = form.title || "샘플 청첩장";
  const previewGroom = form.groomName || "신랑 이름";
  const previewBride = form.brideName || "신부 이름";
  const previewVenue = form.venue || "예식장 위치";

  return (
    <main className="min-h-screen bg-neutral-100 p-4 md:p-8">
      <section className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="rounded-2xl bg-white p-5 shadow-sm md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>
              <p className="mt-1 text-sm text-neutral-500">{description}</p>
            </div>
            {backHref && backLabel ? (
              <Link
                href={backHref}
                className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700"
              >
                {backLabel}
              </Link>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-neutral-700">
              청첩장 제목
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
              />
            </label>

            <label className="text-sm text-neutral-700">
              신랑 이름
              <input
                value={form.groomName}
                onChange={(e) => updateField("groomName", e.target.value)}
                className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
              />
            </label>

            <label className="text-sm text-neutral-700">
              신부 이름
              <input
                value={form.brideName}
                onChange={(e) => updateField("brideName", e.target.value)}
                className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
              />
            </label>

            <label className="text-sm text-neutral-700">
              결혼식 일시
              <input
                value={form.weddingDate}
                onChange={(e) => updateField("weddingDate", e.target.value)}
                className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
              />
            </label>

            <label className="text-sm text-neutral-700">
              장소
              <input
                value={form.venue}
                onChange={(e) => updateField("venue", e.target.value)}
                className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
              />
            </label>
          </div>

          <div className="mt-6">
            <button
              onClick={save}
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
            >
              저장하기
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm lg:sticky lg:top-6 lg:h-fit">
          <p className="mb-3 text-sm font-medium text-neutral-700">모바일 실시간 미리보기 (iPhone급 비율)</p>
          <div className="mx-auto w-[393px] max-w-full rounded-[28px] border-8 border-neutral-900 bg-neutral-900 p-2">
            <div className="h-[852px] overflow-y-auto rounded-[20px] bg-white">
              <div className="h-64 bg-neutral-200" />
              <div className="space-y-8 p-6">
                <section>
                  <p className="text-xs text-neutral-500">WEDDING INVITATION</p>
                  <h2 className="mt-2 text-2xl font-semibold text-neutral-900">{previewTitle}</h2>
                  <p className="mt-3 text-base text-neutral-700">
                    {previewGroom} · {previewBride}
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="text-lg font-semibold text-neutral-900">예식 정보</h3>
                  <p className="text-sm text-neutral-700">{previewDate}</p>
                  <p className="text-sm text-neutral-700">{previewVenue}</p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-neutral-900">갤러리</h3>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-md bg-neutral-200 text-center text-xs leading-[80px] text-neutral-500"
                      >
                        image
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
