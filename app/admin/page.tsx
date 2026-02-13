"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AUTH_KEY,
  DEFAULT_INVITATIONS,
  STORAGE_KEY,
  SUPER_ADMIN_ID,
  SUPER_ADMIN_PIN,
  parseInvitations,
} from "@/lib/admin/localStore";
import { ManagedInvitation } from "@/lib/admin/types";

function formatDate(value: string) {
  return new Date(value).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toAbsoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (typeof window === "undefined") {
    return path;
  }

  return `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function SuperAdminPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [id, setId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [invites, setInvites] = useState<ManagedInvitation[]>(DEFAULT_INVITATIONS);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const auth = window.sessionStorage.getItem(AUTH_KEY) === "ok";
    const saved = parseInvitations(window.localStorage.getItem(STORAGE_KEY));

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    setInvites(saved);
    setAuthed(auth);
    setReady(true);
  }, []);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) {
      return invites;
    }

    return invites.filter((invitation) => {
      const targets = [
        invitation.id,
        invitation.ownerName,
        invitation.ownerEmail,
        invitation.title,
        invitation.groomName,
        invitation.brideName,
        invitation.publicPath,
      ];

      return targets.some((value) => value.toLowerCase().includes(keyword));
    });
  }, [invites, query]);

  const updateInvites = (next: ManagedInvitation[]) => {
    setInvites(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id !== SUPER_ADMIN_ID || pin !== SUPER_ADMIN_PIN) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    setError("");
    setAuthed(true);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(AUTH_KEY, "ok");
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    setId("");
    setPin("");
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(AUTH_KEY);
    }
  };

  const handleToggleStatus = (idValue: string) => {
    const next = invites.map((item) => {
      if (item.id !== idValue) {
        return item;
      }

      const expired = item.status === "active";
      return {
        ...item,
        status: expired ? "expired" : "active",
        updatedAt: new Date().toISOString(),
        expiredAt: expired ? new Date().toISOString() : null,
      };
    });

    updateInvites(next);
  };

  if (!ready) {
    return <main className="min-h-screen bg-neutral-100" />;
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm"
        >
          <h1 className="text-xl font-semibold text-neutral-900">슈퍼 관리자 로그인</h1>
          <p className="mt-2 text-sm text-neutral-500">아이디 `admin` / 6자리 숫자 비밀번호</p>

          <label className="mt-6 block text-sm font-medium text-neutral-700">아이디</label>
          <input
            value={id}
            onChange={(event) => setId(event.target.value)}
            className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
            placeholder="admin"
          />

          <label className="mt-4 block text-sm font-medium text-neutral-700">비밀번호</label>
          <input
            value={pin}
            onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))}
            className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
            inputMode="numeric"
            placeholder="123456"
          />

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white"
          >
            로그인
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-100 p-4 md:p-8">
      <section className="mx-auto max-w-7xl rounded-2xl bg-white p-5 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">로컬 슈퍼 관리자</h1>
            <p className="mt-1 text-sm text-neutral-500">
              생성된 청첩장 링크 조회/접속/수정/만료 관리
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/sample-editor"
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
            >
              샘플청첩장 수정하기
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700"
            >
              로그아웃
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900 md:w-80"
            placeholder="ID/유저명/이메일/링크 검색"
          />
          <button
            onClick={() => updateInvites(DEFAULT_INVITATIONS)}
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-700"
          >
            샘플 데이터 복원
          </button>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="min-w-[980px] w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr>
                <th className="px-4 py-3 font-medium">상태</th>
                <th className="px-4 py-3 font-medium">링크 ID</th>
                <th className="px-4 py-3 font-medium">유저</th>
                <th className="px-4 py-3 font-medium">청첩장 제목</th>
                <th className="px-4 py-3 font-medium">링크</th>
                <th className="px-4 py-3 font-medium">수정일</th>
                <th className="px-4 py-3 font-medium">관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((invitation) => {
                const isExpired = invitation.status === "expired";
                return (
                  <tr key={invitation.id} className="border-t border-neutral-100">
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          isExpired
                            ? "bg-red-100 text-red-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {isExpired ? "만료" : "활성"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-neutral-800">{invitation.id}</td>
                    <td className="px-4 py-3 text-neutral-700">
                      <p>{invitation.ownerName}</p>
                      <p className="text-xs text-neutral-500">{invitation.ownerEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-neutral-700">{invitation.title}</td>
                    <td className="px-4 py-3 text-neutral-700">{invitation.publicPath}</td>
                    <td className="px-4 py-3 text-neutral-700">{formatDate(invitation.updatedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => window.open(toAbsoluteUrl(invitation.publicPath), "_blank")}
                          className="rounded-lg border border-neutral-300 px-2.5 py-1.5 text-xs font-medium text-neutral-700"
                        >
                          접속
                        </button>
                        <Link
                          href={`/admin/sample-editor?id=${encodeURIComponent(invitation.id)}`}
                          className="rounded-lg border border-neutral-300 px-2.5 py-1.5 text-xs font-medium text-neutral-700"
                        >
                          수정
                        </Link>
                        <button
                          onClick={() => handleToggleStatus(invitation.id)}
                          className="rounded-lg bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-white"
                        >
                          {isExpired ? "복구" : "만료"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
