import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  AtSign,
  Building2,
  Camera,
  Mail,
  MapPin,
  UserRound,
} from "lucide-react";
import type { UserProfile } from "../../../types/user";

type UserProfileCardProps = {
  user: UserProfile;
};

function getInitials(firstName: string, lastName: string) {
  return `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
}

function InfoCard({
  icon,
  label,
  value,
  className = "",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[22px] border border-[#D9DED8]/70 bg-[#F8FBF9] p-4 transition-all duration-300 hover:shadow-sm ${className}`}
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#D9DED8]/70 text-[#39B772] shadow-sm">
          {icon}
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#545454]/50">
          {label}
        </p>
      </div>
      <p className="text-sm md:text-[15px] font-bold text-[#545454] break-words leading-relaxed">
        {value}
      </p>
    </div>
  );
}

export default function UserProfileCard({ user }: UserProfileCardProps) {
  const fullName = `${user.first_name} ${user.last_name}`.trim();
  const initials = getInitials(user.first_name, user.last_name);
  const photoInputId = `profile-photo-${user.id}`;

  return (
    <section className="w-full px-6 md:px-12 lg:px-16 pb-16 pt-10 md:pt-20 font-sans text-[#5C5C5C]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto max-w-7xl w-full rounded-[28px] border border-[#D9DED8]/70 bg-white p-4 sm:p-5 md:p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)]"
      >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#39B772]">
            User Profile
          </p>
          <h2 className="mt-1 text-lg md:text-xl font-extrabold text-[#545454]">
            Informasi Pengguna
          </h2>
          <p className="mt-1 text-xs md:text-sm font-medium text-[#545454]/60">
            Tampilan profil yang clean, modern, dan konsisten dengan dashboard.
          </p>
        </div>

        <div className="shrink-0 rounded-full border border-[#BFE3CB] bg-[#EFF8F2] px-3 py-1 text-[11px] font-bold text-[#2F8F59]">
          ID #{String(user.id).padStart(3, "0")}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)] gap-4 md:gap-5">
        {/* Kiri */}
        <div className="flex flex-col justify-center h-full rounded-[26px] border border-[#D9DED8]/70 bg-white p-5 shadow-sm">
            <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                <div className="rounded-full bg-[#39B772]/10 p-1.5 shadow-[0_10px_30px_rgba(57,183,114,0.08)]">
                    <div className="h-24 w-24 md:h-28 md:w-28 overflow-hidden rounded-full border-[3px] border-white bg-[#F3FBF6]">
                    {user.photoUrl ? (
                        <img
                        src={user.photoUrl}
                        alt={fullName}
                        className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl md:text-3xl font-extrabold text-[#39B772]">
                        {initials}
                        </div>
                    )}
                    </div>
                </div>

                <input
                    id={photoInputId}
                    type="file"
                    accept="image/*"
                    className="hidden"
                />

                <label
                    htmlFor={photoInputId}
                    className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#39B772] text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-[#2FA866]"
                >
                    <Camera size={15} />
                </label>
                </div>

                <h3 className="text-xl md:text-[22px] font-extrabold text-[#545454] leading-tight">
                {fullName}
                </h3>

                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#D9DED8]/70 bg-[#F8FBF9] px-3 py-1.5 text-xs font-bold text-[#545454] shadow-sm">
                <AtSign size={14} className="text-[#39B772]" />
                {user.username}
                </div>
            </div>
        </div>

        {/* Kanan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard
            icon={<UserRound size={18} />}
            label="Nama Depan"
            value={user.first_name}
          />

          <InfoCard
            icon={<UserRound size={18} />}
            label="Nama Belakang"
            value={user.last_name}
          />

          <InfoCard
            icon={<AtSign size={18} />}
            label="Username"
            value={`@${user.username}`}
          />

          <InfoCard
            icon={<MapPin size={18} />}
            label="Domisili"
            value={user.domicile}
          />

          <InfoCard
            icon={<Mail size={18} />}
            label="Email"
            value={user.email}
            className="sm:col-span-2"
          />

          <InfoCard
            icon={<Building2 size={18} />}
            label="Bisnis / Institusi"
            value={user.business}
            className="sm:col-span-2"
          />
        </div>
      </div>
      </motion.div>
    </section>
  );
}