import DashboardHeader from "@/components/shared/dashboard-header";
import BackupPanel from "@/features/dashboard/superadmin/backup/backup-panel";
import { requireRole } from "@/lib/dashboard-access";

export const metadata = { title: "Backup & Restore | Bazar-e-Pak" };

// Backup & restore is available to the Super Admin only (also enforced by the API routes).
const BackupPage = async () => {
  await requireRole("super_admin");

  return (
    <div>
      <DashboardHeader
        eyebrow="Super Admin"
        title="Backup & Restore"
        description="Create verified database backups and restore them safely. Only the Super Admin can use this feature."
      />
      <BackupPanel />
    </div>
  );
};

export default BackupPage;
