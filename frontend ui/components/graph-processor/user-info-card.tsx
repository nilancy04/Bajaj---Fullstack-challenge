"use client";

import { GlassCard } from "./glass-card";
import { User, Mail, Hash } from "lucide-react";
import type { UserInfo } from "./types";

interface UserInfoCardProps {
  userInfo: UserInfo;
}

export function UserInfoCard({ userInfo }: UserInfoCardProps) {
  return (
    <GlassCard delay={200}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-indigo-400" />
        User Information
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-white/80">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <User className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <p className="text-xs text-white/50">User ID</p>
            <p className="font-medium">{userInfo.user_id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white/80">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Mail className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-white/50">Email</p>
            <p className="font-medium">{userInfo.email_id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white/80">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <Hash className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs text-white/50">Roll Number</p>
            <p className="font-medium">{userInfo.college_roll_number}</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
